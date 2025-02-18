const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')

module.exports = async function (name, options) {
  // 判断项目是否存在
  const cwd = process.cwd() //当前命令行所在的路径
  const targetAir = path.join(cwd, name)
  // 目录是否存在
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
      // 如果用户拒绝覆盖则停止生于操作
      if (!action) {
        return
      } else if (action === 'overwrite') {
        await fs.remove(targetAir)
      }
    }
  }

  // 新建模板
  const generator = new Generator(name, targetAir)
  generator.create()
}