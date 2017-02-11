import child_process = require('child_process');
import logger from './logger';
const log = logger(__filename);

export default function inlineBash(cmd:string):string {
    const newCmd = scan(cmd);
    if (newCmd === cmd) {
        return newCmd;
    } else {
        return inlineBash(newCmd);
    }
}

const wrappedShellFunction = (shellcmd:string) => {
    const ret = child_process.execSync(`${shellcmd}`, {stdio: 'inherit'});
    return {
        code: 0,
        out: ret,
    };
};

function scan(cmd:string):string {
    cmd = cmd.replace(/\n/g, '');
    const idx = cmd.indexOf('#{');
    if (idx === -1) {
        return cmd;
    }

    let open = 1;
    for (let i = idx + 2; i < cmd.length; i++) {
        if (cmd[i] === '{') {
            open++;
        }
        if (cmd[i] === '}') {
            open--;
        }
        if (open === 0) {
            const before = cmd.substring(0, idx);
            const after = cmd.substring(i + 1) || '';
            const extractedShellCmd = cmd.substring(idx + 2, i);
            const newCmd = before + ` (${wrappedShellFunction.toString()})('${extractedShellCmd}')` + after;
            log.debug(newCmd);
            return newCmd;
        }
    }
    throw Error('Not closed');
}
