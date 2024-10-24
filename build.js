const path = require("path")
const fs = require("fs")
const { exec } = require("child_process")

const directoryPath = path.join(__dirname,"./config/project")

const files = fs.readdirSync(directoryPath);
const plugAllName = files.map(i=>i.split(".json")[0])
const isDev = process.argv[2].includes(".env")?false:true
function build(index){
    if(index>=files.length){
        return
    }else{
        const plugin = plugAllName[index];
        exec(
            `node start.js --target=${plugin} && plasmo build --env=${!isDev?".env":".env.production"}  --zip --target=${plugin}`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`打包 ${plugin} 失败: ${error.message}`)
                return
              }
              if (stderr) {
                console.log(`打包 ${plugin} 成功: ${stdout}`)
                // 继续下一个插件
                build(index + 1)
                return
              }
              if(stdout){
                console.log(`打包 ${plugin} 成功: ${stdout}`)
                build(index + 1)
              }
            }
          )
    }
}


build(0)
