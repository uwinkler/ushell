import fs = require('fs');
import path = require('path');

// import logger from './logger';
// const log = logger(__filename);

export interface Executable {
    dir:string;
    file:string;
    full:string;
}

function findExecutableFilesInDirectory(dir:string):Executable[] {
    try {
        const files = fs.readdirSync(dir);
        return files.filter(file => {
            const stats = fs.statSync(path.join(dir, file));
            // log.debug('    size: ' + stats['size']);
            // log.debug('    file: ' + dir + '/' + file);
            // log.debug('    mode: ' + stats['mode']);
            // log.debug('    others eXecute: ' + (stats.mode & 1 ? 'x' : '-')); // tslint:disable-line
            // log.debug('    others Write:   ' + (stats.mode & 2 ? 'w' : '-')); // tslint:disable-line
            // log.debug('    others Read:    ' + (stats.mode & 4 ? 'r' : '-')); // tslint:disable-line
            // log.debug('    group eXecute:  ' + (stats.mode & 8 ? 'x' : '-')); // tslint:disable-line
            // log.debug('    group Write:    ' + (stats.mode & 16 ? 'w' : '-')); // tslint:disable-line
            // log.debug('    group Read:     ' + (stats.mode & 32 ? 'r' : '-')); // tslint:disable-line
            // log.debug('    owner eXecute:  ' + (stats.mode & 64 ? 'x' : '-')); // tslint:disable-line
            // log.debug('    owner Write:    ' + (stats.mode & 128 ? 'w' : '-')); // tslint:disable-line
            // log.debug('    owner Read:     ' + (stats.mode & 256 ? 'r' : '-')); // tslint:disable-line
            // log.debug('    file:           ' + (stats.mode & 0o100000 ? 'f' : '-')); // tslint:disable-line
            // log.debug('    directory:      ' + (stats.mode & 0o040000 ? 'd' : '-')); // tslint:disable-line
            return (stats.mode & 1 || stats.mode & 8 || stats.mode & 64 ); // tslint:disable-line
        }).map(executableFile => ({
            dir,
            file: executableFile,
            full: path.join(dir, executableFile),
        }));
    } catch (e) {
        return [];
    }
}

export default function executables():Executable[] {
    const pathEnvVariable = process.env.PATH || '';
    const paths = pathEnvVariable.split(':');
    return paths.reduce((acc:Executable[], dir:string) => {
        return acc.concat(findExecutableFilesInDirectory(dir));
    }, []);
}
