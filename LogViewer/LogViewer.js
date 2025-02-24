// Release: 1.0.3 - Updated version
// Date Created: 2025-02-21
// Author: JWP
// Company: CieloVistaSoftware

class LogViewer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Fetch the template content
        fetch('template.html')
            .then(response => response.text())
            .then(templateHtml => {
                const template = document.createElement('template');
                template.innerHTML = templateHtml;
                const templateContent = template.content.cloneNode(true);
                this.shadowRoot.appendChild(templateContent);
                this.logContainer = this.shadowRoot.querySelector('.log-container');
                this.addLogButton = this.shadowRoot.querySelector('#add-log-button');

                // Add event listener for the add log button
                if (this.addLogButton) {
                    this.addLogButton.addEventListener('click', () => this.log('Lorem Ipsum'));
                }
            })
            .catch(error => console.error('Error loading template:', error));
    }

    connectedCallback() {
        if (!this.logContainer) {
            console.error('Log container not found');
        }
    }

    log(message) {
        if (this.logContainer) {
            const logEntry = document.createElement('div');
            logEntry.textContent = message;
            this.logContainer.prepend(logEntry); // Add new log entries at the top
        }
    }
}

customElements.define('log-viewer', LogViewer);
