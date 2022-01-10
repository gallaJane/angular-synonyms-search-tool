import { PartOfSpeech } from './partOfSpeech';
import { Definition } from './definition';

export interface Meaning {
    definitions: Definition[];
    partOfSpeech: PartOfSpeech;
  }