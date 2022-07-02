import winston, { createLogger, format, transports, config } from 'winston';

const { combine, timestamp, simple } = format;
const colors: { [key: string]: string } = {
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red',
};

const logger: winston.Logger = createLogger({
	levels: config.syslog.levels,
	defaultMeta: { component: 'nunian-api-gateway' },
	exitOnError: false,
	level: 'info',
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.colorize({ colors }),
		simple(),
	),
	transports: [new transports.Console(), new transports.File({ filename: 'app.log' })],
});

export default logger;
