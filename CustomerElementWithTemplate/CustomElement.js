class CustomElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.setStyleAndLink();
    this.loadTemplate();
  }

  setStyleAndLink() {
    // const linkElem = document.createElement('link');
    // linkElem.setAttribute('rel', 'stylesheet');
    // linkElem.setAttribute('href', 'styles.css');

    const styleElem = document.createElement('style');
    styleElem.textContent = `
      .container {
        padding: 20px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
      }
      .header {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .lorem-ipsum {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ddd;
        background-color: #fff;
      }
      button {
        margin-right: 10px;
        padding: 10px 20px;
        font-size: 16px;
      }
    `;

    // this.shadowRoot.appendChild(linkElem);
    this.shadowRoot.appendChild(styleElem);
  }

  async loadTemplate() {
    try {
      const response = await fetch('customElement.template.html');
      const template = await response.text();
      const container = document.createElement('div');
      container.innerHTML = template;
      this.shadowRoot.appendChild(container);

      this.connectedCallback();
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }

  connectedCallback() {
    debugger;
    var btn1 = this.shadowRoot.getElementById('button1');
    btn1.addEventListener('click', () => { 
      debugger;
      alert('Button 1 clicked');
    });
    var btn2 = this.shadowRoot.getElementById('button2');
    btn2.addEventListener('click', () => { 
      debugger;
      alert('Button 2 clicked');
    });
  }

  disconnectedCallback() {
    this.shadowRoot.getElementById('button1').removeEventListener('click', () => alert('Button 1 clicked'));
    this.shadowRoot.getElementById('button2').removeEventListener('click', () => alert('Button 2 clicked'));
  }
}

customElements.define('custom-element', CustomElement);