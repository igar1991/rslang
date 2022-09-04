interface WordDetails {
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

interface WordId {
  id: string;
}

interface AggregatedWordId {
  _id: string;
}

export type Word = WordId & WordDetails;
export type AggregatedWord = AggregatedWordId & WordDetails;

export interface WordsRequestParams {
  page: number;
  group: number;
}

export interface NewWordRequestParams {
  difficulty: string;
  optional: Record<string, unknown>;
}

interface TotalCount {
  count: number
}

export interface AggregatedWords {
  paginatedResults: AggregatedWord[];
  totalCount: TotalCount[];
}

export interface UserWordData {
  difficulty: string;
  optional: {
    learned: boolean;
    date?: string;
    games?: {firstDate: string, answers: boolean[]};
  };
  id: string;
  wordId: string;
}

export interface User {
  email: string;
  password: string;
}

export interface Statistics {
  learnedWords: number;
  optional: {
    achievements: {
      achievement1?: Achievement;
      achievement2?: Achievement;
      achievement3?: Achievement;
      achievement4?: Achievement;
      achievement5?: Achievement;
      achievement6?: Achievement;
    };
    newWordsCounter?: number;
  }
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  img: string;
  achieved: boolean;
  shown: boolean;
}

export enum Device {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

export enum VocabularyTab {
  VOCABULARY,
  HARD_WORDS,
}
