// Release: 1.0.3 - Updated version
// Date Created: 2025-02-21
// Author: JWP
// Company: CieloVistaSoftware

class MyIonicComponent extends HTMLElement {
  constructor() {
    super();
    // Attach a shadow DOM if desired
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    try {
      const response = await fetch('template.html');
      const templateHtml = await response.text();
      this.shadowRoot.innerHTML = templateHtml;
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }
}

// Define the custom element
customElements.define('my-ionic-component', MyIonicComponent);