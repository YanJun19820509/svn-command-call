"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
const dir = args[0]; //svn目录
const msg = args[1]; //log message
// console.log(dir, msg);
function commit() {
    const out = (0, child_process_1.execSync)(`svn status ${dir}`, { encoding: "utf-8" });
    let statusInfo = out.split('\r\n');
    // console.log(out, statusInfo);
    statusInfo.forEach(aa => {
        check(aa);
    });
    (0, child_process_1.execSync)(`svn commit ${dir} -m ${msg}`, { encoding: "utf-8" });
    console.log('提交完成！');
}
function check(a) {
    if (a == '')
        return;
    const state = a.substring(0, 8);
    const file = a.substring(8);
    // console.log([state, file]);
    switch (state) {
        case '?       ': //add
            console.log('add', file);
            (0, child_process_1.execSync)(`svn add ${file}`, { encoding: "utf-8" });
            break;
        case '!       ': //del
            console.log('del', file);
            (0, child_process_1.execSync)(`svn delete --force ${file}`, { encoding: "utf-8" });
            break;
    }
}
commit();
