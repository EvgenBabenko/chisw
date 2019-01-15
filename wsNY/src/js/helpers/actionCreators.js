import { nextIndex } from '../utils/changeIndex';
import config from '../../config';

const { LEVERS_LENGTH } = config;

export const checkActionCreator = (stateId, pulled) => ({
  action: 'check',
  lever1: pulled,
  lever2: nextIndex(pulled, LEVERS_LENGTH),
  stateId,
});

export const powerOffActionCreator = stateId => ({
  action: 'powerOff',
  stateId,
});
