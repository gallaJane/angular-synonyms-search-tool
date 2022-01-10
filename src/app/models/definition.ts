import { PartOfSpeech } from './partOfSpeech';
import { Synonym } from './synonym';

export interface Definition {
    active: boolean;
    definition: string;
    synonyms: Synonym[];
  }