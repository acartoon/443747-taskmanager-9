export const filterTemplate = (filters) =>
  `<section class="main__filter filter container">
  ${filters.map((filter) => `<input
      type="radio"
      id="filter__${filter.title}"
      class="filter__input visually-hidden"
      name="filter" ${filter.count == 0 ?  'disabled' : ``}
    />
  <label for="filter__${filter.title}" class="filter__label">
    ${filter.title}<span class="filter__all-count"> ${filter.count}</span></label
  >`).join(``)}
    </section>`.trim();
