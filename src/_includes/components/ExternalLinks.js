/**
 * Singleton custom element that updates external links in the DOM with
 * attributes that open each link in a new tab/window. The attributes are
 * removed when this custom element is disconnected or if it has a 'disabled'
 * attribute.
 * 
 * Setting/removing a 'disabled' attribute on the element will remove its
 * updates to all external links. The element also removes its updates when
 * removed from the DOM.
 * 
 * @example
 * <external-links></external-links>
 */
customElements.define('external-links', class ExternalLinks extends HTMLElement {
  disabled;  /** @type {boolean} */
  links;     /** @type {HTMLAnchorElement[]} */
  note;      /** @type {string} */

  constructor() {
    super();

    if (!ExternalLinks.instance) {
      ExternalLinks.instance = this;
    }
    return ExternalLinks.instance;
  }
  
  static observedAttributes = ['disabled'];
  
  connectedCallback() {
    this.disabled = this.hasAttribute('disabled');
    this.note = ' (opens in new window)';
    this.links = [...document.querySelectorAll('a')];

    if (!this.disabled) {
      this.updateLinks();
    }
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      if (newValue === '') {
        this.restoreLinks();
      }

      if (oldValue === '') {
        this.disabled = true;
        this.updateLinks();
      }
    }
  }
  
  disconnectedCallback() {
    this.restoreLinks();
  }
  
  /**
   * Updates links with attributes for opening in new window/tab.
   * Email, phone, and text message links are never updated.
   */
  updateLinks() {
    const url = new URL(window.location);

    for (const link of this.links) {
      if (['mailto:', 'sms:', 'tel:'].includes(link.protocol)) return;

      if (link.hostname !== url.hostname) {
        link.target = '_blank';
        link.rel = 'noopener';
        link.classList.add('external');
        link.title += this.note;
      }
    }
  }
  
  /**
   * Removes attributes from links that were previously updated by this
   * custom element.
   */
  restoreLinks() {
    if (!this.links) return;

    for (const link of this.links) {
      if (link.classList.contains('external')) {
        const title = link.title.replace(this.note, '');
        link.title = title;
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.classList.remove('external');
      }
    }
  }
});
