/**
 * The Level of Class Logger
 * Priority: ERROR > WARN > INFO > DEBUG
 * 
 * @category Logger
 */
export enum Level {
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
}

const levelStrMapper = {
  [`${Level.ERROR}`]: 'error',
  [`${Level.WARN}`]: 'warn',
  [`${Level.INFO}`]: 'info',
  [`${Level.DEBUG}`]: 'debug',
};

/**
 * The options type of Class Logger
 * 
 * @category Logger
 */
export interface Options {
  prefix?: string | undefined;
  onLog?: ((level: Level, args: Array<any>) => any) | undefined;
}

/**
 * Class Logger
 * 
 * **Quick Usage:**
 * ```typescript
 * const logger = new Logger({ prefix: 'glacierjs' });
 * logger.info('hello');  // print: glacierjs [info] hello
 * logger.debug('hello');  // print: glacierjs [debug] hello
 * logger.warn('hello');  // print: glacierjs [warn] hello
 * logger.error('hello');  // print: glacierjs [error] hello
 * ```
 * 
 * @category Logger
 */
export class Logger {
  public static level: Level = Level.INFO

  private static methodToColorMap: { [methodName: string]: string | null } = {
    [Level.DEBUG]: '#7f8c8d', // Gray
    [Level.INFO]: '#2ecc71', // Green
    [Level.WARN]: '#f39c12', // Yellow
    [Level.ERROR]: '#c0392b', // Red
  }

  private prefix: Options['prefix']

  private onLog: Options['onLog']

  constructor(options: Options = {}) {
    const { prefix, onLog } = options;
    if (prefix) this.prefix = prefix;
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

  public extends({ prefix }: { prefix: Options['prefix'] }): Logger {
    return new Logger({
      prefix: `${this.prefix}-${prefix}`,
      onLog: this.onLog,
    });
  }

  private log(runtimeLevel: Level, args) {
    if (runtimeLevel <= Logger.level) {
      if (this.onLog) this.onLog(runtimeLevel, args);
      const title = `[${levelStrMapper[runtimeLevel]}]`;
      const styles = this.getStyle(runtimeLevel);
      console[levelStrMapper[runtimeLevel]](...styles, title, ...args);
    }
  }

  private getStyle(runtimeLevel: Level): String[] {
    const styles = [
      `background: ${Logger.methodToColorMap[runtimeLevel]!}`,
      'border-radius: 0.5em',
      'color: white',
      'font-weight: bold',
      'padding: 2px 0.5em',
    ];

    return [`%c${this.prefix}`, styles.join(';')];
  }
}

/**
 * The instance of Class Logger in GlacierJS
 * 
 * @category Logger
 */
export const logger = new Logger({ prefix: 'glacier' });
