import {menuTemplate} from './components/site-menu.js';
import {searchTemplate} from './components/search.js';
import {filterTemplate} from './components/filter.js';
import {render, Position, counter, countArchiveTasks} from './utils';
import {Task} from './components/task.js';
import {TaskEdit} from './components/task-edit.js';
import {btnLoadMoreTemplate} from './components/load-more-button.js';
import {boardFilterTemplate} from './components/sorting.js';
import {tasks, filters} from './data';

const mainContainer = document.body.querySelector(`.main`);

function renderElement(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

const boardContainer = document.createElement(`section`);
boardContainer.classList.add(`board`, `container`);


renderElement(mainContainer.querySelector(`.main__control`), menuTemplate());
renderElement(mainContainer, searchTemplate());
renderElement(mainContainer, filterTemplate(filters));
renderElement(mainContainer, boardContainer.outerHTML);

if((tasks.length == 0) || (tasks.length == counter(countArchiveTasks, tasks))){
  const boardNoTasks = document.createElement(`p`);
  boardNoTasks.classList.add(`board__no-tasks`);
  boardNoTasks.innerHTML = 'Congratulations, all tasks were completed! To create a new click on «add new task» button.'
  renderElement(mainContainer.querySelector(`.board`), boardNoTasks.outerHTML);
} else {
  renderElement(mainContainer.querySelector(`.board.container`), boardFilterTemplate());
  const boardTasksContainer = document.createElement(`div`);
  boardTasksContainer.classList.add(`board__tasks`);
  
  renderElement(mainContainer.querySelector(`.board.container`), boardTasksContainer.outerHTML);
  
  renderElement(mainContainer.querySelector(`.board.container`), btnLoadMoreTemplate());
  
  const renderTask = (taskMock) => {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);
  
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
  
    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });
  
    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
  
    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
  
    taskEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
  
    render(tasksContainer, task.getElement(), Position.BEFOREEND);
  };
  
  const tasksContainer = document.querySelector(`.board__tasks`);
  
  tasks.forEach((task) => renderTask(task));

}

