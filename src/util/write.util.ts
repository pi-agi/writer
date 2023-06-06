import { FileUtil } from '@pi-agi/core';

export class WriteUtil {
  private bookData: any;
  private fileUtil: FileUtil;

  constructor(private taskDir: string) {
    this.bookData = {
      chapters: [],
      title: '',
    };

    this.fileUtil = new FileUtil();
  }

  setTitle = (title: string) => {
    this.bookData.title = title;
  };

  async addChapter(index: number, chapter: string): Promise<string> {
    this.bookData.chapters.splice(index, 0, chapter);
    await this.saveChapter(index, chapter);
    return `Wrote chapter: ${chapter}`;
  }

  readChapter(index: number): string {
    return this.bookData.chapters[index];
  }

  async updateChapter(index: number, chapter: string): Promise<string> {
    this.bookData.chapters[index] = chapter;
    await this.saveChapter(index, chapter);
    return `Updated chapter: ${chapter}`;
  }

  async saveChapter(index: number, chapter: string): Promise<string> {
    const bookContent = chapter;
    const filePath = `${this.taskDir}/chapters/${index.toString()}.txt`;

    try {
      await this.fileUtil.writeFile(filePath, bookContent);
      return `Saved chapter and written to file: ${filePath}`;
    } catch (e: any) {
      return `Error while saving chapter: ${e.message}`;
    }
  }

  async finalizeBook(): Promise<string> {
    const bookContent = this.bookData.chapters.join('\n\n');
    const filePath = `${this.taskDir}/${this.bookData.title}.txt`;

    try {
      await this.fileUtil.writeFile(filePath, bookContent);
      return `Book finalized and written to file: ${filePath}`;
    } catch (e: any) {
      return `Error while finalizing book: ${e.message}`;
    }
  }
}
