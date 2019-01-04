/* eslint-disable no-param-reassign */
import { colorMap } from '../constants';

const updateScroll = (element) => {
  element.scrollTop = element.scrollHeight;
};

export const printMessage = (element, value, idAttr) => {
  const li = document.createElement('li');

  if (idAttr) {
    li.id = idAttr;
  }

  li.innerHTML = value;
  element.appendChild(li);
  updateScroll(element);
};

export const setStatus = (element, value = 'default') => {
  element.innerHTML = value;
  element.style.color = colorMap[value];
};
