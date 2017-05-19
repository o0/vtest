'use strict';

(() => {
  /** @constant {HTMLArticleElement} */
  const TEMPLATE = document.querySelector(`template`)
    .content
    .querySelector(`article`);

  /** @constant {HTMLElement} */
  const FEATURE_TEMPLATE = TEMPLATE.querySelector(`.list-item-feature`);


  const citiesContainer = document.querySelector(`.cities-all`);
  const selectedContainer = document.querySelector(`.cities-selected`);


  /**
   * @param {Object} data
   * @return {Element}
   */
  const renderFeature = (data) => {
    const el = FEATURE_TEMPLATE.cloneNode(true);
    el.textContent = data;
    return el;
  };


  /**
   * @param {Object} data
   * @return {Element}
   */
  const renderCity = (data) => {
    const el = TEMPLATE.cloneNode(true);
    el.querySelector(`.list-item-name`).textContent = data.name;
    el.querySelector(`.list-item-weather`).textContent = data.weather;
    renderList(data.features, el.querySelector(`.list-item-features`), renderFeature);
    return el;
  };


  /**
   * Функция создает временный контейнер, добавляет в него набор элементов
   * сгенерированных функцией отрисовки и возвращает заполненный элементами
   * контейнер.
   * @param {Object} els
   * @param {Element} container
   * @param {Function} renderFn
   * @return {Element}
   */
  const renderList = (els, container, renderFn) => {
    return els.reduce((container, item) => {
      const el = renderFn(item);
      container.appendChild(el);
      return container;
    }, document.createDocumentFragment()));
  };


  /** @param {Array.<Object>} data */
  const drawElements = (data) => {
    renderList(data.slice(0, 85), citiesContainer, renderCity);
    renderList(data.slice(85), selectedContainer, renderCity);
  };


  /** @param {string} url */
  const load = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then(drawElements)
      .catch(console.error);
  };


  load(`/data/data.json`);
})();
