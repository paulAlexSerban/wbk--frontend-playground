import { src, dest } from 'gulp';
import { paths } from '../config/paths';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import { onError } from '../utils/onError';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [new transports.Console(), new transports.File({ filename: 'logs.log' })],
});

export const processAudio = () => {
    logger.info('Starting audio processing');

    return new Promise((resolve, reject) => {
        return src(paths.src.assets.audio)
            .pipe(
                plumber({
                    errorHandler: onError,
                })
            )
            .pipe(
                size({
                    title: 'processAudio : ',
                    showFiles: true,
                    showTotal: true,
                })
            )
            .pipe(dest(`${paths.dist.dir}/audio`))
            .on('error', (err) => {
                logger.error(`Error processing audio: ${err}`);
                reject(err);
            })
            .on('end', () => {
                logger.info('Finished audio processing');
                resolve();
            });
    });
};
