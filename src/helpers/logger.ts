import {createLogger, format, transports} from "winston";
import appRoot from "app-root-path"

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
}

const Logger = (service: string) => {
    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({stack: true}),
            format.splat(),
            format.json()
        ),
        defaultMeta: {service: service},
        transports: [
            new transports.File(options.file),
            new transports.Console(options.console),
        ],
        exitOnError: false,
    });
}

export default Logger("[INSERT_PROJECT_NAME_HERE]");