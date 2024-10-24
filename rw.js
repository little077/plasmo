const fs = require('fs');
const path = require('path');
const args = process.argv?.slice(2)?.[0]?.split("target=")[1];

const directoryPath = path.join(__dirname, './build');
const oldName = 'chrome-mv3-prod.zip';
const newName = args+".zip"; // 替换为你想要的新名称

const oldPath = path.join(directoryPath, oldName);
const newPath = path.join(directoryPath, newName);

if (path.extname(oldName) === '.zip') {
    try {
        fs.renameSync(oldPath, newPath);
        console.log(`成功将 ${oldName} 重命名为 ${newName}`);
    } catch (err) {
        console.error('重命名时出错:', err);
    }
} else {
    console.log(`${oldName} 不是一个 ZIP 文件`);
}
