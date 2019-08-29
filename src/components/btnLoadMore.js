import {AbstractComponent} from './abstract-component.js';

export class BtnLoadMore extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
