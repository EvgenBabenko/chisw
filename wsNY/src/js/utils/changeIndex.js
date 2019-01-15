/* eslint-disable no-confusing-arrow */
export const nextIndex = (index, length) => index >= length - 1 ? 0 : index + 1;

export const prevIndex = (index, length) => index === 0 ? length - 1 : index - 1;
