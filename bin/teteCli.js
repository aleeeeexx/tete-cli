#! /usr/bin/env node

const program = require('commander')
program
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印执行结果
    console.log('项目名称', name)
    require('../lib/create')(name, options)
  })

// 解析用户执行命令传入参数
program.parse(process.argv)
