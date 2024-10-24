const path = require("path")
const fs = require("fs")
const { exec } = require("child_process")
const { performance } = require("perf_hooks")

const directoryPath = path.join(__dirname,"./config/project")

const files = fs.readdirSync(directoryPath);
const plugAllName = files.map(i=>i.split(".json")[0]);
const isDev = process.argv[2].includes(".env")?false:true;
const errListPluginNames = []
function build(index){
    if(index>=files.length){
      const end = performance.now()
      const timeTaken = end - start
      console.log(`所有插件打包完成,打包时间: ${timeTaken.toFixed(3)} 毫秒`)
      console.log(
        "\x1b[31m%s\x1b[0m",
        "配置文件数量：" +
          files.length +
          "个         " +
          "打包失败的个数" +
          errListPluginNames.length +
          "个          " +
          "打包成功的个数" +
          "" +
          (files.length - errListPluginNames.length) +
          "个"
      )
      errListPluginNames.length > 0 &&
        console.log("\x1b[34m", "打包失败的插件", errListPluginNames)
      const filePath = path.resolve(__dirname, "../build/chrome-mv3-prod")
      fs.rm(filePath, { recursive: true, force: true }, (err) => void 0);
        return
    }else{
        const plugin = plugAllName[index];
        exec(
            `node start.js --target=${plugin} && plasmo build --env=${!isDev?".env":".env.production"}  --zip && node rw.js --target=${plugin}`,
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


// 开始打包第一个插件
const start = performance.now()
build(0)
