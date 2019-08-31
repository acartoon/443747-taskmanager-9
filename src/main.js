import {menuTemplate} from './components/site-menu.js';
import {searchTemplate} from './components/search.js';
import {filterTemplate} from './components/filter.js';
import {tasks, filters} from './data';
import BoardController from './components/controllers/board';

const mainContainer = document.body.querySelector(`.main`);

function renderElement(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

renderElement(mainContainer.querySelector(`.main__control`), menuTemplate());
renderElement(mainContainer, searchTemplate());
renderElement(mainContainer, filterTemplate(filters));

const boardController = new BoardController(mainContainer, tasks);
boardController.init();
