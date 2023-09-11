import 'colors';

type LogLevel = 'log' | 'warn' | 'debug' | 'error' | 'success' | 'logMagenta' | 'info';

export interface LoggerOptions {
  enabledLevels: LogLevel[];
  hideLogs: LogLevel[];

  emoji: boolean;
  date: boolean;
  level: boolean;
  color: boolean;
}

export type ILogger = {
  [key in LogLevel]: (message: any, ...optionalParams: any[]) => string;
}

const levelColor: { [key in LogLevel]: keyof string } = {
  debug: 'cyan',
  log: 'white',
  warn: 'yellow',
  error: 'red',
  success: 'green',
  logMagenta: 'magenta',
  info: 'blue',
};

const levelText: { [key in LogLevel]: string } = {
  debug: ' DEBUG ',
  log: '  LOG  ',
  logMagenta: '  LOG  ',
  warn: 'WARNING',
  error: ' ERROR ',
  success: 'SUCCESS',
  info: ' INFO  ',
};

const levelEmoji: { [key in LogLevel]: string } = {
  debug: '☢️ ',
  log: '⚪',
  logMagenta: '⚪',
  warn: '⚠️ ',
  error: '❌',
  success: '✅',
  info: '❕',
};

export class Logger implements ILogger {

  constructor(
    private options: LoggerOptions,
  ) { }

  _getLog(level: LogLevel, ...args: any[]) {
    if (this.options.hideLogs.includes(level)) { return; }
    const emojiLog = ConsoleWrapper.options.emoji ? levelEmoji[level] : null;
    const dateLog = ConsoleWrapper.options.date
      ? this.options.color ? `${new Date().toLocaleString()} |`.gray : `${new Date().toLocaleString()} |`
      : null;
    const levelLog = ConsoleWrapper.options.level
      ? this.options.color
        ? `${levelText[level][levelColor[level] as any]} ${'|'.gray}`
        : `${levelText[level]} ${'|'}`
      : null;

    const prefixes = [
      emojiLog,
      dateLog,
      levelLog,
    ].filter(Boolean);

    return [
      ...prefixes,
      ...args.map(
        (a) => this.options.color && typeof a === 'string'
          ? a[levelColor[level] as any]
          : a
      )
    ].map((part) => JSON.stringify(part))
      .join(' ');
  }

  log(...messages: any[]): string {
    return this._getLog('log', ...messages);
  }

  warn(...messages: any[]): string {
    return this._getLog('warn', ...messages);
  }

  debug(...messages: any[]): string {
    return this._getLog('debug', ...messages);
  }

  error(...messages: any[]): string {
    return this._getLog('error', ...messages);
  }

  success(...messages: any[]): string {
    return this._getLog('success', ...messages);
  }

  logMagenta(...messages: any[]): string {
    return this._getLog('logMagenta', ...messages);
  }

  info(...messages: any[]): string {
    return this._getLog('info', ...messages);
  }
}

export class ConsoleWrapper {
  static options: LoggerOptions = {
    enabledLevels: ['log', 'warn', 'debug', 'error', 'success'],
    hideLogs: [],
    date: true,
    level: true,
    emoji: true,
    color: true,
  };

  private static injectLevel(level: LogLevel) {
    const logFunc = console.log;
    console[level] = function (...args: Parameters<Console['log']>) {
      logFunc.apply(this, args);
    };
  }

  private static wrap(level: LogLevel) {
    console.clear();
    const old = console[level];

    console[level] = function (...args: Parameters<any>) {
      if (ConsoleWrapper.options.hideLogs.includes(level)) { return; }
      const emojiLog = ConsoleWrapper.options.emoji ? levelEmoji[level] : null;
      const dateLog = ConsoleWrapper.options.date ? `${new Date().toLocaleString()} |`.gray : null;
      const levelLog = ConsoleWrapper.options.level
        ? `${levelText[level][levelColor[level] as any]} ${'|'.gray}`
        : null;

      const prefixes = [
        emojiLog,
        dateLog,
        levelLog,
      ].filter(Boolean);

      const sufixes = [

      ].filter(Boolean);

      old.apply(this, [
        ...prefixes,
        ...args.map((a) => {
          return ConsoleWrapper.options.color && typeof a === 'string'
            ? a[levelColor[level] as any]
            : a;
        }),
        ...sufixes,
      ]);
    };
  }

  static inject() {
    this.injectLevel('success');
    this.injectLevel('logMagenta');

    this.options.enabledLevels.forEach(this.wrap.bind(this));
  }
}

