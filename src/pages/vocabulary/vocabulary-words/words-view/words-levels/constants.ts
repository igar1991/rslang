import { LEVELS } from '../../constants';

export type Colors = 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'elementary'
  | 'preintermediate'
  | 'intermediate'
  | 'upperintermediate'
  | 'advanced'
  | 'proficiency';

export const ColorsByGroupMap = new Map([
  [LEVELS.ELEMENTARY, 'elementary'],
  [LEVELS.PREINTERMEDIATE, 'preintermediate'],
  [LEVELS.INTERMEDIATE, 'intermediate'],
  [LEVELS.UPPERNTERMEDIATE, 'upperintermediate'],
  [LEVELS.ADVANCED, 'advanced'],
  [LEVELS.PROFICIENCY, 'proficiency']
]) as Map<LEVELS, Colors>;
