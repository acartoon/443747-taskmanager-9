import {AbstractComponent} from './abstract-component.js';

export class NoTasks extends AbstractComponent {
  getTemplate() {
    return `<section class="board container">
    <p class="board__no-tasks">
      Click ADD NEW TASK in menu to create your first task
    </p>
  </section>`;
  }
}
