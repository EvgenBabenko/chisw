/* eslint-disable no-confusing-arrow */
import { constants } from '../constants';

const { LEVERS_LENGTH } = constants;

export const nextIndex = index => index >= LEVERS_LENGTH - 1 ? 0 : index + 1;

export const prevIndex = index => index === 0 ? LEVERS_LENGTH - 1 : index - 1;
