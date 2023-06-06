import { ActionType } from '@pi-agi/core';

export enum WriteActionType {
  ADD_CHAPTER = 'addChapter',
  UPDATE_CHAPTER = 'updateChapter',
  READ_CHAPTER = 'readChapter',
  SET_TITLE = 'setTitle',
  FINALIZE_BOOK = 'finalizeBook',
}

export type MergedActionType = ActionType & WriteActionType;
