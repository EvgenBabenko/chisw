/* eslint-disable no-param-reassign */
import { statusColorMap } from '../constants';

const updateScroll = (node) => {
  node.scrollTop = node.scrollHeight;
};

export const printMessage = (node, value, idAttr) => {
  const li = document.createElement('li');

  if (idAttr) {
    li.id = idAttr;
  }

  li.innerHTML = value;
  node.appendChild(li);
  updateScroll(node);
};

export const setStatus = (node, value = 'default') => {
  node.innerHTML = value;
  node.style.color = statusColorMap[value];
};
