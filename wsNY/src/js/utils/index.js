/* eslint-disable no-confusing-arrow */
import { constants } from '../constants';

export const nextIndex = index => index >= constants.LEVERS_LENGTH - 1 ? 0 : index + 1;

export const prevIndex = index => index === 0 ? constants.LEVERS_LENGTH - 1 : index - 1;
