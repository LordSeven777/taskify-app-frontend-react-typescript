import type { Timestamps } from './timestamps';

export interface LabelAttributes extends Timestamps {
  _id: string;
  name: string;
  color: string;
  user: string;
}
