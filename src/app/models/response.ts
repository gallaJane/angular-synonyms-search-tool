import { Meaning } from "./meaning";
import { Phonetic } from './phonetic';

export interface Response {
    word: string;
    meanings: Meaning[]; 
    phonetics: Phonetic [];
  }