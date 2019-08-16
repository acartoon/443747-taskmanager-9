import {menuTemplate} from './components/site-menu.js';
import {searchTemplate} from './components/search.js';
import {filterTemplate} from './components/filter.js';
import {cardTemplate} from './components/task.js';
import {cardEditTemplate} from './components/task-edit.js';
import {btnLoadMoreTemplate} from './components/load-more-button.js';
import {boardFilterTemplate} from './components/sorting.js';
import {tasks, filters} from './data';

const mainContainer = document.body.querySelector(`.main`);

function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

const boardContainer = document.createElement(`section`);
boardContainer.classList.add(`board`, `container`);

render(mainContainer.querySelector(`.main__control`), menuTemplate());
render(mainContainer, searchTemplate());
render(mainContainer, filterTemplate(filters));
render(mainContainer, boardContainer.outerHTML);
render(mainContainer.querySelector(`.board.container`), boardFilterTemplate());

const boardTasksContainer = document.createElement(`div`);
boardTasksContainer.classList.add(`board__tasks`);

render(mainContainer.querySelector(`.board.container`), boardTasksContainer.outerHTML);

render(mainContainer.querySelector(`.board.container`), btnLoadMoreTemplate());

const renderTasks = (container, start, end) => {
  container.insertAdjacentHTML(`beforeend`, tasks.slice(start, end)
  .map(cardTemplate)
  .join(``));
};

const renderTasksEdit = (container, start, end) => {
  container.insertAdjacentHTML(`beforeend`, tasks.slice(start, end).map(cardEditTemplate).join(``));
};

renderTasksEdit(mainContainer.querySelector(`.board__tasks`), 0, 1);
renderTasks(mainContainer.querySelector(`.board__tasks`), 1, 8);

// добавление задач
const loadMoreBtn = mainContainer.querySelector(`.load-more`);
loadMoreBtn.addEventListener(`click`, (e) => {
  e.preventDefault();
  renderTasks(mainContainer.querySelector(`.board__tasks`), 8);
  loadMoreBtn.style.display = `none`;
});
