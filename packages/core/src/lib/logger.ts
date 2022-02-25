export enum Level {
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

export const levelMapper = {
  [`${Level.ERROR}`]: 'error',
  [`${Level.WARN}`]: 'warn',
  [`${Level.INFO}`]: 'info',
  [`${Level.DEBUG}`]: 'debug',
};

export class Logger {
  public level: Level = Level.INFO;
  public methodToColorMap: { [methodName: string]: string | null } = {
    [Level.DEBUG]: '#7f8c8d', // Gray
    [Level.INFO]: '#2ecc71', // Green
    [Level.WARN]: '#f39c12', // Yellow
    [Level.ERROR]: '#c0392b', // Red
  };

  private prefix: string | undefined;
  private onLog: ((level: Level, args: Array<any>) => any) | undefined;

  constructor({
    prefix,
    level,
    titleTemplate,
    onLog,
  }: {
    prefix?: typeof Logger.prototype.prefix;
    level?: typeof Logger.prototype.level;
    titleTemplate?: typeof Logger.prototype.titleTemplate;
    onLog?: typeof Logger.prototype.onLog;
  } = {}) {
    if (prefix) this.prefix = prefix;
    if (level) this.level = level;
    if (titleTemplate) this.titleTemplate = titleTemplate;
    if (onLog) this.onLog = onLog;
  }

  public error(...args) {
    this.log(Level.ERROR, args);
  }

  public warn(...args) {
    this.log(Level.WARN, args);
  }

  public info(...args) {
    this.log(Level.INFO, args);
  }

  public debug(...args) {
    this.log(Level.DEBUG, args);
  }

  private log(runtimeLevel: Level, args) {
    if (runtimeLevel <= this.level) {
      const title = this.titleTemplate({
        prefix: this.prefix,
        level: runtimeLevel,
      });

      if (this.onLog) this.onLog(runtimeLevel, args);

      const styles = this.getStyle(runtimeLevel);
      console[levelMapper[runtimeLevel]](...styles, title, ...args);
    }
  }

  private getStyle(runtimeLevel: Level): String[] {
    const styles = [
      `background: ${this.methodToColorMap[runtimeLevel]!}`,
      'border-radius: 0.5em',
      'color: white',
      'font-weight: bold',
      'padding: 2px 0.5em',
    ];

    return [`%c${this.prefix}`, styles.join(';')];
  }

  private titleTemplate({
    level,
  }: {
    prefix: typeof Logger.prototype.prefix;
    level: typeof Logger.prototype.level;
  }) {
    return `[${levelMapper[level]}]`;
  }
}

export const logger = new Logger({ prefix: 'glacier' });
