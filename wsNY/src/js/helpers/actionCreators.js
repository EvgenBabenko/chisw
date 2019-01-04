import { nextIndex } from '../utils/index';

export const checkActionCreator = (stateId, pulled) => ({
  action: 'check',
  lever1: pulled,
  lever2: nextIndex(pulled),
  stateId,
});

export const powerOffActionCreator = stateId => ({
  action: 'powerOff',
  stateId,
});
