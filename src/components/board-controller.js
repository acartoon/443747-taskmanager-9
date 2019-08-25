import {
  Task
} from './task';
import {
  Board
} from './board';
import {
  Sort
} from './sort';
import {
  TaskList
} from './task-list';
import {
  TaskEdit
} from './task-edit';
import {
  BtnLoadMore
} from './btnLoadMore';
import {
  render,
  Position,
  Key
} from '../utils';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._btnLoadMore = new BtnLoadMore();
    this._sort = new Sort();
    this._MAX_TASKS_TO_RENDER = 8;
    this._tasksRenderedCount = ``;
    this._tasksToRenderedCount = ``;
    this._tasksToRender = [];
  }

  _countToRender() {
    this._tasksRenderedCount = this._tasks.length < this._MAX_TASKS_TO_RENDER ? this._tasks.length : this._MAX_TASKS_TO_RENDER;
    this._tasksToRender = this._tasks.slice(0, this._tasksRenderedCount);
    this._tasksToRenderedCount = this._tasks.length - this._tasksRenderedCount;
    if (this._tasksToRenderedCount <= 0) {
      document.querySelector(`.load-more`).classList.add(`visually-hidden`);
    }
  }

  init() {
    this._countToRender();
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._btnLoadMore.getElement(), Position.BEFOREEND);

    this._tasksToRender.forEach((taskMock) => this._renderTask(taskMock));

    this._btnLoadMore.getElement()
      .addEventListener(`click`, (evt) => this._onBtnClick(evt));

    this._sort.getElement()
      .addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditComponent.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    this._tasksRenderedCount += this._MAX_TASKS_TO_RENDER;
    this._tasksToRender = this._tasks.slice(0, this._tasksRenderedCount);

    this._taskList.getElement().innerHTML = ``;

    this._tasksToRender.forEach((taskMock) => this._renderTask(taskMock));

    this._tasksToRenderedCount = this._tasks.length - this._tasksRenderedCount;

    if (this._tasksToRenderedCount <= 0) {
      document.querySelector(`.load-more`).classList.add(`visually-hidden`);
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasksToRender.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasksToRender.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
      case `default`:
        this._tasksToRender.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
}
