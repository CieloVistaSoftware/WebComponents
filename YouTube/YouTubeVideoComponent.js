class YouTubeVideoComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentlyPlaying = null;
    }

    connectedCallback() {
        this.loadTemplate();
        this.loadVideos();
        window.addEventListener('message', this.handleMessage.bind(this));
        document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    }

    async loadTemplate() {
        const response = await fetch('template.html');
        const templateText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(templateText, 'text/html');
        const templateContent = doc.body.innerHTML;
        const template = document.createElement('template');
        template.innerHTML = templateContent;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async loadVideos() {
        const response = await fetch('videos.json');
        this.data = await response.json();
        this.renderVideos();
    }

    handleFullscreenChange(event) {
        const iframe = event.target;
        if (document.fullscreenElement === iframe) {
            iframe.classList.add('fullscreen');
        } else {
            iframe.classList.remove('fullscreen');
        }
    }

    renderVideos() {
        const container = this.shadowRoot.querySelector('#video-container');
        if (!container) {
            console.error('Video container not found');
            return;
        }
        container.innerHTML = '';
        this.data.videos.forEach(video => {
            const iframe = document.createElement('iframe');
            iframe.width = this.data.global.width;
            iframe.height = this.data.global.height;
            iframe.src = `${this.data.global.baseUrl}${video.id}`;
            iframe.title = video.title;
            iframe.allowFullscreen = true;
            container.appendChild(iframe);
        });
    }

    handleMessage(event) {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange' && data.info === 1) { // 1 is the code for playing
            const iframes = this.shadowRoot.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                if (iframe !== event.source.frameElement) {
                    iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
                }
            });
            this.currentlyPlaying = event.source.frameElement;
            const video = this.data.videos.find(video => `${this.data.global.baseUrl}${video.id}` === this.currentlyPlaying.src);
            if (video) {
                this.updateCurrentVideoTitle(video.title);
            }
        }
    }

    updateCurrentVideoTitle(title) {
        const currentVideoElement = this.shadowRoot.querySelector('#current-video');
        if (currentVideoElement) {
            currentVideoElement.textContent = title;
        }
    }
}

customElements.define('youtube-video-component', YouTubeVideoComponent);