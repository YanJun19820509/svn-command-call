import { execSync } from "child_process";

const args = process.argv.slice(2);
const dir = args[0];//svn目录
const msg = args[1];//log message

function commit() {
    const out: string = execSync(`svn status ${dir}`, { encoding: "utf-8" });
    let statusInfo: string[] = out.split('\r\n');
    console.log(out, statusInfo);
    statusInfo.forEach(aa => {
        check(aa);
    });
    execSync(`svn commit ${dir} -m ${msg}`, { encoding: "utf-8" });
}

function check(a: string) {
    if (a == '') return;
    const state = a.substring(0, 8);
    const file = a.substring(8);
    // console.log([state, file]);
    switch (state) {
        case '?       '://add
            console.log('add', file);
            execSync(`svn add ${file}`, { encoding: "utf-8" });
            break;
        case '!       '://del
            console.log('del', file);
            execSync(`svn delete --force ${file}`, { encoding: "utf-8" });
            break;
    }
}

commit();