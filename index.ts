import * as core from "@actions/core"
import { exec } from "@actions/exec"
import * as toolCache from "@actions/tool-cache"
import * as path from "path"
import * as fs from "fs"

const urlForLinux = "http://gosspublic.alicdn.com/ossutil/1.6.7/ossutil64";
const urlForMac = "http://gosspublic.alicdn.com/ossutil/1.6.7/ossutilmac64";

async function main() {
    const ENDPOINT = core.getInput("endpoint");
    const ACCESS_KEY_ID = core.getInput("access-key-id");
    const ACCESS_KEY_SECRET = core.getInput("access-key-secret");
    const OSS_ARGS = core.getInput("oss-args");

    let ossUtilsBinName = 'ossutil64';
    let ossUtilsUrlPath = urlForLinux;

    const bin = path.join(__dirname, ".bin");

    if (!fs.existsSync(bin)) {
        fs.mkdirSync(bin, { recursive: true });
    }

    if (process.platform === "darwin") {
        ossUtilsBinName = 'ossutilmac64';
        ossUtilsUrlPath = urlForMac;
    }

    let toolPath = toolCache.find(ossUtilsBinName, "1.6.7");

    if (!toolPath) {
        core.info(`downloading from ${ossUtilsUrlPath}`);
        toolPath = await toolCache.downloadTool(ossUtilsUrlPath);
        core.info(`downloaded to ${toolPath}`);
    }

    fs.copyFileSync(toolPath, path.join(bin, ossUtilsBinName));
    fs.chmodSync(path.join(bin, ossUtilsBinName), 0o755);

    core.addPath(bin);

    await exec(ossUtilsBinName, [
        "config",
        "-e",
        ENDPOINT,
        "-i",
        ACCESS_KEY_ID,
        "-k",
        ACCESS_KEY_SECRET,
        "-L",
        "CH"
    ]);

    await exec(`${ossUtilsBinName} ${OSS_ARGS}`);
}

main().catch(error => {
    core.setFailed(error.message);
});
