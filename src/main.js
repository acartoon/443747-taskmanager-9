import {menuTemplate} from './components/site-menu.js';
import {searchTemplate} from './components/search.js';
import {filterTemplate} from './components/filter.js';
import {cardTemplate} from './components/task.js';
import {cardEditTemplate} from './components/task-edit.js';
import {btnLoadMoreTemplate} from './components/load-more-button.js';
import {boardFilterTemplate} from './components/sorting.js';

const CARDS_LENGTH = 3;
const mainContainer = document.body.querySelector(`.main`);

function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

const boardContainer = document.createElement(`section`);
boardContainer.classList.add(`board`, `container`);

render(mainContainer.querySelector(`.main__control`), menuTemplate());
render(mainContainer, searchTemplate());
render(mainContainer, filterTemplate());
render(mainContainer, boardContainer.outerHTML);
render(mainContainer.querySelector(`.board.container`), boardFilterTemplate());

const boardTasksContainer = document.createElement(`div`);
boardTasksContainer.classList.add(`board__tasks`);

render(mainContainer.querySelector(`.board.container`), boardTasksContainer.outerHTML);

for (let i = 0; i < CARDS_LENGTH; i++) {
  render(mainContainer.querySelector(`.board__tasks`), cardTemplate());
}

render(mainContainer.querySelector(`.board__tasks`), cardEditTemplate(), `afterBegin`);
render(mainContainer.querySelector(`.board.container`), btnLoadMoreTemplate());
