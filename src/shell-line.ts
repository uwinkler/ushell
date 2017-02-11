import executables from './executables';
export default function isShellLine(line:string) {
    const execs = executables();
    line = line.trim();
    const firstCmd = line.split(' ')[0];
    if (firstCmd) {
        const cmdExists = execs.find((exec) => firstCmd === exec.file || firstCmd === exec.full);
        console.log(cmdExists);
        return cmdExists !== undefined;
    } else {
        return false;
    }
}
