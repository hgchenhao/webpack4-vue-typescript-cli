const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { vueTemplate } = require('./template.js');

class Generate {
  static parseChunkToString(chunk) {
    return String(chunk).trim().toString();
  }

  constructor(process) {
    this.process = process;
    this.basePath = '';
  }

  init() {
    this.initBasePath();
    this.log(`请输入要生成的页面组件名称、会生成在 ${this.basePath}/目录下`);
    this.initEvent();
  }

  initEvent() {
    this.process.stdin.on('data', (chunk) => { this.onStdinData(chunk) });
    this.process.stdin.on('end', () => { this.onStdinEnd() });
  }

  async onStdinData(chunk) {
    const inputName = Generate.parseChunkToString(chunk);
    const componentVueName = this.getVueFilePath(inputName);
    const componentDirectory = path.dirname(componentVueName);

    if (fs.existsSync(componentDirectory)) {
      this.log(`${inputName}页面组件已存在，请重新输入`, 'error');

      return;
    }

    try {
      this.log(`正在生成 component 目录 ${componentDirectory}`);
      await this.dotExistDirectoryCreate(componentDirectory);
      this.log('生成目录成功');


      this.log(`正在生成 vue 文件 ${componentVueName}`);
      await this.generateFile(componentVueName, vueTemplate(this.getComponentName(inputName)));
      this.log('生成文件成功');

    } catch (e) {
      this.log(e.message, 'error')
    }

    this.process.stdin.emit('end')
  }

  onStdinEnd() {
    this.log('exit');
    this.process.exit();
  }

  initBasePath(path = 'src/containers') {
    const baseDir = process.argv.splice(2);

    if (!baseDir.length) {
      this.basePath = path;

      return;
    }

    const firstParams = baseDir[0];

    if (typeof firstParams.split === 'function') {
      const tempArr = firstParams.split(':');

      if (tempArr[0] === 'path') {
        this.basePath = tempArr[1];
        return;
      }
    }

    this.log('参数有误', 'error');
  }

  getVueFilePath(inputName) {
    let componentVueName = this.resolveFile(`../../${this.basePath}`, inputName);

    return componentVueName.endsWith('.vue') ? componentVueName : `${componentVueName}.vue`;
  }

  getComponentName(inputName) {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/');

      return inputArr[inputArr.length - 1];
    }

    return inputName
  }

  generateFile(path, data) {
    if (fs.existsSync(path)) {
      this.log(`${path}文件已存在`);

      return;
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, 'utf8', (err) => {
        if (err) {
          this.log(err.message, 'error');
          reject(err);

          return;
        }

        resolve(true)
      })
    })
  }

  dotExistDirectoryCreate(director) {
    return new Promise((resolve) => {
      this.mkdirs(director, () => {
        resolve(true)
      })
    })
  }

  mkdirs(director, callback) {
    if (fs.existsSync(director)) {

      callback && callback();
      return;
    }

    this.mkdirs(path.dirname(director), this.mkdirSync(director, callback))
  }

  mkdirSync(director, callback) {
    return () => {
      fs.mkdirSync(director)
      callback && callback()
    }
  }

  log(message, type = 'normal') {
    const chalkType = this.getChalkType(type);

    if (!chalkType) {
      console.log(chalk['error'](`${message}`));

      return;
    }

    console.log(chalk[chalkType](`${message}`))
  }

  getLogType() {
    return [
      { type: 'normal', value: 'green' },
      { type: 'success', value: 'blue' },
      { type: 'error', value: 'red' },
    ]
  }

  getChalkType(type) {

    if (!type) {
      return;
    }

    const typeMap = Object.create(null);
    const logTypes = this.getLogType();

    logTypes.forEach((item, index) => {
      Reflect.set(typeMap, item.type, item.value);
    })

    return Reflect.get(typeMap, type) || null;
  }

  resolveFile(...file) {
    return path.resolve(__dirname, ...file);
  }
}

module.exports = Generate;
