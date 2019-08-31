import TaskController from './task.js';
import {Board} from '../board';
import {NoTasks} from '../no-tasks';
import {Sort} from '../sort';
import {TaskList} from '../task-list';
import {BtnLoadMore} from '../btnLoadMore';
import {render, Position} from '../../utils';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._btnLoadMore = new BtnLoadMore();
    this._sort = new Sort();
    this._noTasks = new NoTasks();
    this._STEP_TO_RENDER = 8;
    this._TASKS_TO_RENDER = ``;
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._subscriptions = [];
  }

  init() {
    this._TASKS_TO_RENDER = this._STEP_TO_RENDER;
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

    if (this._STEP_TO_RENDER < this._tasks.length) {
      render(this._board.getElement(), this._btnLoadMore.getElement(), Position.BEFOREEND);
    }

    if (this._tasks.length === 0) {
      render(this._container, this._noTasks.getElement(), Position.BEFOREEND);
    } else {
      render(this._container, this._board.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), this._btnLoadMore.getElement(), Position.BEFOREEND);

      this._tasks.slice(0, this._STEP_TO_RENDER).forEach((taskMock) => this._renderTask(this._taskList.getElement(), taskMock));

      this._btnLoadMore.getElement().addEventListener(`click`, (evt) => this._onBtnClick(evt));
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._tasks);
  }

  _renderBoard(data) {
    this._taskList.getElement().innerHTML = ``;
    data.slice(0, this._TASKS_TO_RENDER).forEach((taskMock) => this._renderTask(this._taskList.getElement(), taskMock));
  }

  _renderTask(container, tasks) {
    const taskController = new TaskController(container, tasks, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    const countTasks = this._taskList.getElement().childElementCount;
    this._TASKS_TO_RENDER = countTasks + this._STEP_TO_RENDER;
    this._taskList.getElement().innerHTML = ``;
    this._tasks.slice(0, this._TASKS_TO_RENDER).forEach((item) => this._renderTask(this._taskList.getElement(), item));

    if (this._TASKS_TO_RENDER >= this._tasks.length) {
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
        const sortedByDateUpTasks = this._tasks.slice(0, this._TASKS_TO_RENDER).slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((item) => this._renderTask(this._taskList.getElement(), item));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice(0, this._TASKS_TO_RENDER).slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((item) => this._renderTask(this._taskList.getElement(), item));
        break;
      case `default`:
        this._tasks.slice(0, this._TASKS_TO_RENDER).forEach((item) => this._renderTask(this._taskList.getElement(), item));
        break;
    }
  }
}
