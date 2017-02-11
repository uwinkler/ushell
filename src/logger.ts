import * as path from 'path';
import * as winston from 'winston';

/**
 * https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport
 */
const consoleLoggerOptions = (file:string) => ({
    console: {
        timestamp: true,
        colorize: true,
        prettyPrint: true,
        humanReadableUnhandledException: true,
        label: path.basename(file),
        stderrLevels: ['error'],
    },
});

function logger(file:string):winston.LoggerInstance {
    const loggerOpts = consoleLoggerOptions(file);
    const loggerInstance = winston.loggers.add(file, loggerOpts);
    loggerInstance.level = 'debug';
    return loggerInstance;
}

export default logger;
