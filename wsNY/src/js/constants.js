export const constants = {
  LEVERS_LENGTH: 4,
  CONECTED: 'CONECTED',
  DISCONECTED: 'DISCONECTED',
  POWERED_ON: 'poweredOn',
  POWERED_OFF: 'poweredOff',
};

export const statusColorMap = {
  [constants.CONECTED]: '#0F0',
  [constants.DISCONECTED]: 'red',
  default: 'white',
};
