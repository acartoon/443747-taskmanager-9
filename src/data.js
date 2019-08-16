const description = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
]);

const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

export const task = () => ({
  description: description[Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: tags,
  color: colors[Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const tasks = new Array(10).fill(``).map(task);

const countAllTasks = (item) => !item.isArchive ? true : false;
const countOverdueTasks = (item) => item.dueDate < Date.now() ? true : false;
const countTodayTasks = (item) => item.dueDate === Date.now() ? true : false;
const countFavoriteTasks = (item) => item.repeatingDays;
const countTagsTasks = (item) => item.tags ? true : false;
const countArchiveTasks = (item) => item.isArchive ? true : false;
const countRepeatingTasks = (item) => Object.keys(item.repeatingDays).some(day => item.repeatingDays[day] ? true : false);

const counter = (func) => {
  return tasks.reduce((total, x) => (func(x) ? total + 1 : total), 0);
};

export const filters = [
  {
    title: `All`,
    count: counter(countAllTasks),
  },
  {
    title: `Overdue`,
    count: counter(countOverdueTasks),
  },
  {
    title: `Today`,
    count: counter(countTodayTasks),
  },
  {
    title: `Favorites`,
    count: counter(countFavoriteTasks),
  },
  {
    title: `Repeating`,
    count: counter(countRepeatingTasks),
  },
  {
    title: `Tags`,
    count: counter(countTagsTasks),
  },
  {
    title: `Archive`,
    count: counter(countArchiveTasks),
  },
];
