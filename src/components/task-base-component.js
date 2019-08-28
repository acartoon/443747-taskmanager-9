import {AbstractComponent} from './abstract-component.js';

export class TaskBaseComponent extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color, isArchive, isFavorite}) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._isArchive = isArchive;
    this._isFavorite = isFavorite;
  }
}