/* eslint-disable no-param-reassign */
import { statusColorMap } from '../constants';

export const setStatus = (node, value = 'default') => {
  node.innerHTML = value;
  node.style.color = statusColorMap[value];
};
