const path = require("path")
const fs = require("fs")
const search = require("@inquirer/prompts").search


const packageJsonPath = path.join(__dirname, "./package.json")
const packageJson = require(packageJsonPath)
const directoryPath = path.join(__dirname, "./config/project")
const files = fs.readdirSync(directoryPath)



function write(res) {
  const content = fs.readFileSync(
    path.join(__dirname, `./config/project/${res}.json`),
    "utf-8"
  )
  const value = {...JSON.parse(content)}
  const copyPackageJson= packageJson
  copyPackageJson.name = value.name
  copyPackageJson.version = value.version

  fs.writeFileSync(packageJsonPath, JSON.stringify(copyPackageJson, null,2))
  fs.writeFileSync(path.join("./.project", "build.json"), content, "utf-8")
}
let fileArr = []
files.forEach((file) => {
  fileArr.push({
    name: file.split(".")[0],
    value: file.split(".")[0]
  })
})

const answer = search({
  message: "Select a package ",
  source: (input) => {
    if (!input) {
      return fileArr
    }

    return fileArr.filter((item) => {
      return item.name.includes(input)
    })
  }
})

answer.then((res) => {
  write(res)
})