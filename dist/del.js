"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
const dir = args[0]; //svn目录
function del() {
    const out = (0, child_process_1.execSync)(`svn status ${dir}`, { encoding: "utf-8" });
    let statusInfo = out.split('\r\n');
    console.log(out, statusInfo);
    statusInfo.forEach(aa => {
        check(aa);
    });
}
function check(a) {
    if (a == '')
        return;
    const state = a.substring(0, 8);
    const file = a.substring(8);
    switch (state) {
        case '!       ': //del
            console.log('del', file);
            (0, child_process_1.execSync)(`svn delete --force ${file}`, { encoding: "utf-8" });
            break;
    }
}
