import { Action, Actionable } from '@pi-agi/core';
import {
  WriteActionType,
  MergedActionType,
} from '../enum/write-action-type.enum';
import { WriteUtil } from './write.util';

export class WriteActionUtil implements Actionable<MergedActionType> {
  private writeUtil: WriteUtil;

  constructor(taskDir: string) {
    this.writeUtil = new WriteUtil(taskDir);
  }

  async takeAction(action: Action<MergedActionType>): Promise<any> {
    try {
      switch (action.type) {
        case WriteActionType.ADD_CHAPTER:
          return await this.writeUtil.addChapter(
            action.input.index,
            action.input.content
          );
        case WriteActionType.UPDATE_CHAPTER:
          return await this.writeUtil.updateChapter(
            action.input.index,
            action.input.content
          );
        case WriteActionType.READ_CHAPTER:
          return this.writeUtil.readChapter(action.input.index);
        case WriteActionType.SET_TITLE:
          return this.writeUtil.setTitle(action.input.title);
        case WriteActionType.FINALIZE_BOOK:
          return await this.writeUtil.finalizeBook();
        default:
          throw new Error('Invalid action type');
      }
    } catch (e) {
      return e;
    }
  }
}
