import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { MainAGI, OpenAIAzureProvider } from '@pi-agi/core';
import { MergedActionType } from '../enum/write-action-type.enum';
import { WriteActionUtil } from '../util/write-action.util';

/**
 * A class representing a Writer AGI.
 */
export class WriterAGI extends MainAGI<MergedActionType> {
  constructor(
    openAIProvider: OpenAIAzureProvider,
    maxRetryCount: number,
    maxRetryInterval: number
  ) {
    super(openAIProvider, maxRetryCount, maxRetryInterval);
  }

  /**
   * Initializes the AGI.
   */
  async init() {
    this.consolidationId = uuidv4();
    super.consolidationId = this.consolidationId;

    super.initialize(__dirname, this.consolidationId);

    this.mainPrompt = await this.fileUtil.readFileContent(
      path.join(
        __dirname,
        '..',
        'asset',
        'agi',
        'writing',
        'writer-main.agi.md'
      )
    );

    this.nextPrompt = await this.fileUtil.readFileContent(
      path.join(
        __dirname,
        '..',
        'asset',
        'agi',
        'writing',
        'writer-next.agi.md'
      )
    );

    this.actionUtil = new WriteActionUtil(this.taskDir);
  }
}
