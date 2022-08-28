export interface Word {
  id: string;
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

export interface WordsRequestParams {
  page: number;
  group: number;
}

export interface NewWordRequestParams {
  difficulty: string,
  optional: Record<string, unknown>,
}

export interface UserWordData {
  difficulty: string,
  id: string,
  wordId: string,
}

export interface User {
  email: string;
  password: string;
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
