class ShowAllElements extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.setStyleAndLink();
    this.loadTemplate();
  }

  setStyleAndLink() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'styles.css');

    const styleElem = document.createElement('style');
    styleElem.textContent = `
      .gridautorows {
        display: grid;
        grid-template-rows: auto;
      }
      .dark-mode {
        background-color: #333;
        color: #fff;
      }
      .target-element {
        display: grid;
        grid-template-columns: auto;
        padding: 10px;
        border: 1px solid #ccc;
        height: .8rem;
        font-size: .6rem;
        gap: 1rem;
      }
      .flex-container {
        display: flex;
        flex-direction: column;
      }
      .flex-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .flex-item {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
      }
      .header {
        font-weight: bold;
        background-color: #444;
        color: #fff;
      }
    `;

    this.shadowRoot.appendChild(linkElem);
    this.shadowRoot.appendChild(styleElem);
  }

  async loadTemplate() {
    try {
      // const response = await fetch('ShowAllElements.template.html');
      // const template = await response.text();
      const container = document.createElement('div');
      container.innerHTML = template;
      this.shadowRoot.appendChild(container);

      this.toggleDarkMode = this.toggleDarkMode.bind(this);
      this.connectedCallback();
    } catch (error) {
      console.error('Error loading template:', error);
    }
  }

  connectedCallback() {
    if (!this.shadowRoot.querySelector('.flex-container')) return;
    this.renderElements();
    this.shadowRoot.getElementById('toggle-dark-mode').addEventListener('click', this.toggleDarkMode);
    this.shadowRoot.getElementById('test-button').addEventListener('click', this.testData);
    this.shadowRoot.getElementById('reset-button').addEventListener('click', this.resetData);
  }

  disconnectedCallback() {
    this.shadowRoot.getElementById('toggle-dark-mode').removeEventListener('click', this.toggleDarkMode);
    this.shadowRoot.getElementById('test-button').removeEventListener('click', this.testData);
    this.shadowRoot.getElementById('reset-button').removeEventListener('click', this.resetData);
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  renderElements() {
    const flexContainer = this.shadowRoot.querySelector('.flex-container');
    const elements = document.body.querySelectorAll('*');

    elements.forEach((element) => {
      const row = document.createElement('div');
      row.classList.add('flex-row');

      const rowContent = this.createRowContent(element);
      rowContent.forEach(item => row.appendChild(item));

      flexContainer.appendChild(row);
    });

    this.shadowRoot.querySelectorAll('.dropdown').forEach((dropdown) => {
      dropdown.addEventListener('click', () => {
        dropdown.classList.toggle('open');
      });
    });
  }

  createRowContent(element) {
    const tag = this.createSpan(element.tagName.toLowerCase());
    const id = this.createSpan(element.id);
    const name = this.createSpan(element.name || '');
    const order = this.createSpan(element.style.order || '');
    const classList = this.createSpan([...element.classList].join(', '));
    const style = this.createSpan(element.getAttribute('style') || '');
    const placeholder = this.createSpan(element.getAttribute('placeholder') || '');
    const context = this.createSpan(element.textContent.trim());

    return [tag, id, name, order, classList, style, placeholder, context].map(content => {
      const div = document.createElement('div');
      div.classList.add('flex-item');
      div.appendChild(content);
      return div;
    });
  }

  createSpan(content) {
    const span = document.createElement('span');
    span.textContent = content;
    return span;
  }

  testData() {
    const jsonData = [
      { Tag: "div", ID: "3", Name: "Element 3", Order: "3", Classlist: "class3", Style: "style3", Placeholder: "placeholder3", Context: "context3" },
      { Tag: "span", ID: "4", Name: "Element 4", Order: "4", Classlist: "class4", Style: "style4", Placeholder: "placeholder4", Context: "context4" }
    ];

    const mainContainer = this.shadowRoot.getElementById("main");
    jsonData.forEach((data) => {
      const row = document.createElement("div");
      row.classList.add("flex-row");

      for (const key in data) {
        const item = document.createElement("div");
        item.classList.add("flex-item");
        item.textContent = data[key];
        row.appendChild(item);
      }

      mainContainer.appendChild(row);
    });
  }

  resetData() {
    const mainContainer = this.shadowRoot.getElementById("main");
    mainContainer.innerHTML = ``;
  }
}

customElements.define('show-all-elements', ShowAllElements);