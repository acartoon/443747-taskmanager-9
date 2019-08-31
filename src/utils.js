export const counter = (func, tasks) => {
  return tasks.reduce((total, x) => (func(x) ? total + 1 : total), 0);
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
};

export function renderElem(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

export const countAllTasks = (item) => !item.isArchive ? true : false;
export const countOverdueTasks = (item) => (item.dueDate < Date.now()) && !item.isArchive ? true : false;
export const countTodayTasks = (item) => (item.dueDate && !item.isArchive) === Date.now() ? true : false;
export const countFavoriteTasks = (item) => item.isFavorite && !item.isArchive;
export const countTagsTasks = (item) => (item.tags && !item.isArchive) ? true : false;
export const countArchiveTasks = (item) => item.isArchive ? true : false;
export const countRepeatingTasks = (item) => Object.keys(item.repeatingDays).some((day) => item.repeatingDays[day] && !item.isArchive ? true : false);
