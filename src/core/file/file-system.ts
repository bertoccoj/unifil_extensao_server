import { Injectable } from '@nestjs/common';
import fs, { Stats } from 'fs';
import path from 'path';

@Injectable()
export class FSystem {
  get path() {
    return {
      join: path.join,
      resolve: path.resolve,
      relativeToCurrentFile(...args: string[]) {
        return path.join(__dirname, '../../', ...args);
      },
    };
  }

  exists(dir: string) {
    return fs.existsSync(dir);
  }

  fileInfo(dir: string): Stats {
    if (!this.exists(dir)) { throw new Error('file not found'); }

    return fs.statSync(dir);
  }

  createFolder(dir: string) {
    fs.mkdirSync(dir, { recursive: true });
  }

  removeFile(dir: string) {
    fs.unlinkSync(dir);
  }

  private validateDestination({ destination, replace }: { destination: string, replace: boolean }) {
    const fileName = destination.split(/\/|\\/).reverse()[0];
    const folder = destination.replace(fileName, '');
    if (!this.exists(folder)) {
      this.createFolder(folder);
    }
    if (replace && this.exists(destination)) {
      this.removeFile(destination);
    }
  }

  writeStreamToFile({
    data,
    destination,
    replace,
    start,
    append = false,
  }: {
    data: NodeJS.ReadableStream,
    destination: string,
    replace: boolean,
    start?: number,
    append?: boolean,
  }) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.validateDestination({ destination, replace });

        const _start = append && this.exists(destination)
          ? this.fileInfo(destination).size
          : start || 0;

        const fileStream = data.pipe(fs.createWriteStream(destination, {
          start: _start,
          flags: _start ? 'r+' : 'w'
        }));
        fileStream.on('finish', () => resolve());
        data.on('error', (err) => {
          fileStream.close();
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  async readFromJson<T>(dir: string, filename?: string): Promise<T> {
    return JSON.parse(await this.readAsText(filename ? this.path.join(dir, filename) : dir));
  }

  readAsText(dir: string, encoding: BufferEncoding = 'utf8'): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(dir, encoding, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

}
