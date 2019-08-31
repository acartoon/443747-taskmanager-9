import {render, renderElem, Position, Key} from '../../utils';
import Task from '../task.js';
import TaskEdit from '../task-edit.js';

export default class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._data = data;
    this._container = container;
    this._taskComponent = new Task(data);
    this._taskEditComponent = new TaskEdit(data);
    this._onDataChange = onDataChange;
    this._isDate = false;
    this._isRepeated = false;
    this._onChangeView = onChangeView;

    this._create();
    this._repeatDay();
    this._changeStatus(`.card__btn--archive`);
    this._changeStatus(`.card__btn--favorites`);
    this._onSavedCard();
    this._showOrHideDate();
  }

  _create() {
    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._container.replaceChild(this._taskEditComponent.getElement(), this._taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._taskEditComponent.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEditComponent.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEditComponent.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.closest(`.card__hashtag-delete`)) {
        evt.target.closest(`.card__hashtag-inner`).remove();
      } else if (evt.target.closest(`.card__color-input`)) {
        const allColorClassCards = [`card--black`, `card--yellow`, `card--blue`, `card--green`, `card--pink`];
        allColorClassCards.forEach((it) => this._taskEditComponent.getElement().classList.remove(it));
        this._taskEditComponent.getElement().classList.add(`card--${evt.target.getAttribute(`value`)}`);
      }
    });

    this._toAddHashtag();
    render(this._container, this._taskComponent.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.contains(this._taskEditComponent.getElement())) {
      this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
    }
  }

  _repeatDay() {
    this._taskEditComponent.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, () => {
      const repeatStatus = this._taskEditComponent.getElement().querySelector(`.card__repeat-status`);
      const fieldRepeat = this._taskEditComponent.getElement().querySelector(`.card__repeat-days`);

      if (repeatStatus.textContent === `yes`) {
        repeatStatus.textContent = `no`;
        fieldRepeat.querySelectorAll(`.card__repeat-day-input`).forEach((input) => input.removeAttribute(`checked`));
        fieldRepeat.classList.add(`visually-hidden`);
        this._taskEditComponent.getElement().classList.remove(`card--repeat`);
      } else {
        repeatStatus.textContent = `yes`;
        fieldRepeat.classList.remove(`visually-hidden`);
        this._taskEditComponent.getElement().classList.add(`card--repeat`);
      }
    });
  }

  _showOrHideDate() {
    this._taskEditComponent.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, () => {
      const repeatStatus = this._taskEditComponent.getElement().querySelector(`.card__date-status`);
      const fieldDate = this._taskEditComponent.getElement().querySelector(`.card__date-deadline`);
      const cardDate = this._taskEditComponent.getElement().querySelector(`.card__date`);

      if (repeatStatus.textContent === `yes`) {
        repeatStatus.textContent = `no`;
        fieldDate.classList.add(`visually-hidden`);
        cardDate.value = ``;
      } else {
        repeatStatus.textContent = `yes`;
        fieldDate.classList.remove(`visually-hidden`);
      }
    });
  }

  _onSavedCard() {
    this._taskEditComponent.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement());
      this._onDataTaskChange();
    });
  }

  _changeStatus(selector) {
    this._taskEditComponent.getElement()
      .querySelector(selector)
        .addEventListener(`click`, (evt) => {
          evt.target.classList.toggle(`card__btn--disabled`);
        });
  }

  _toAddHashtag() {
    const template = (val) =>
      `<span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${val}"
          class="card__hashtag-hidden-input"
        />
        <p class="card__hashtag-name">
          #${val}
        </p>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>`;

    const hashtagList = this._taskEditComponent.getElement().querySelector(`.card__hashtag-list`);
    this._taskEditComponent.getElement().querySelector(`.card__hashtag-input`).addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        if (evt.target.value.length > 0) {
          renderElem(hashtagList, template(evt.target.value));
        }
        evt.target.value = ``;
      }
    });
  }

  _onDataTaskChange() {
    const formData = new FormData(this._taskEditComponent.getElement().querySelector(`.card__form`));
    const entry = {
      description: formData.get(`text`),
      dueDate: new Date(formData.get(`date`)),
      tags: new Set(formData.getAll(`hashtag`)),
      color: formData.get(`color`),
      repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
        acc[it] = true;
        return acc;
      }, {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }),
      isFavorite: !this._taskEditComponent.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
      isArchive: !this._taskEditComponent.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)
    };
    this._onDataChange(entry, this._data);
  }
}
