import executables from './executables';
import inlineBash from './inline-bash';
import repl = require('repl');
import vm = require('vm');
import { ReplOptions } from 'repl';
import isShellLine from './shell-line';

const opts:ReplOptions = {
    prompt: '> ',
    terminal: true,
    eval: uShellEvalFunction,
    useColors: true,
    ignoreUndefined: true,
};

repl.start(opts);


executables();

function uShellEvalFunction(cmd:string, context:any, _filename:string, callback:Function) {
    if (isShellLine(cmd)) {
        cmd = '#{' + cmd + '};';
    }
    cmd = inlineBash(cmd);
    const script = new vm.Script(cmd);
    script.runInContext(context);
    callback(null);
}


