import {counter,
  countAllTasks,
  countOverdueTasks,
  countTodayTasks,
  countFavoriteTasks,
  countTagsTasks,
  countArchiveTasks,
  countRepeatingTasks
} from './utils';

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
  tags,
  color: colors[Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const tasks = new Array(10).fill(``).map(task);  

export const filters = [
  {
    title: `All`,
    count: counter(countAllTasks, tasks),
    name: `all`,
  },
  {
    title: `Overdue`,
    count: counter(countOverdueTasks, tasks),
    name: `overdue`,
  },
  {
    title: `Today`,
    count: counter(countTodayTasks, tasks),
    name: `today`,
  },
  {
    title: `Favorites`,
    count: counter(countFavoriteTasks, tasks),
    name: `favorites`,
  },
  {
    title: `Repeating`,
    count: counter(countRepeatingTasks, tasks),
    name: `repeating`,
  },
  {
    title: `Tags`,
    count: counter(countTagsTasks, tasks),
    name: `tags`,
  },
  {
    title: `Archive`,
    count: counter(countArchiveTasks, tasks),
    name: `archive`,
  },
];
