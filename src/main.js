import {menuTemplate} from './components/site-menu.js';
import {searchTemplate} from './components/search.js';
import {filterTemplate} from './components/filter.js';
import {counter, countArchiveTasks} from './utils';
import {noTasks} from './components/no-tasks.js';
import {tasks, filters} from './data';
import {BoardController} from './components/board-controller';

const mainContainer = document.body.querySelector(`.main`);

function renderElement(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

renderElement(mainContainer.querySelector(`.main__control`), menuTemplate());
renderElement(mainContainer, searchTemplate());
renderElement(mainContainer, filterTemplate(filters));

if ((tasks.length === 0) || (tasks.length === counter(countArchiveTasks, tasks))) {
  renderElement(mainContainer, noTasks());
} else {
  const boardController = new BoardController(mainContainer, tasks);
  boardController.init();
}
