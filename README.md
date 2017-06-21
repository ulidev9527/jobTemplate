# jobTemplate V2

V1版本移步: [jobTemplate_v1](https://github.com/zoeDylan/jobTemplate_v1)

# 项目说明

集成一个基础的自动化模版，方便后期开发。

项目使用`gulp`+`webpack`进行自动化管理，可以直接开发模块了，方便代码管理。

# 开始

> 1. 你得先有一个`node`并且大于`>v8.0`版本

> 2. 安装`gulp`全局包 `npm i -g yarn gulp`

> 3. 安装项目包 `npm i gulp gulp-debug gulp-watch gulp-plumber gulp-babel gulp-minifier gulp-autoprefixer gulp-concat gulp-less colors-cli babel-preset-es2015 gulp-webpack gulp-sourcemaps`

> 4. 运行命令：`gulp`

# 文件和文件夹说明

> `./help`

>> 帮助文档，如果有什么疑问可以去这里面看

> `./plugin`

>> 用于存放一些项目使用插件，不进行自动化处理。

> **`./source`**

>> 主要目录，`js`、`css`、`image`这三个文件夹的源文件目录,不可删除

> `./static`

>> 自动化处理后的目录，可删除，但是尽量不要存放其它东西

> **`./gulpfile.js`**

>> 不做描述，这个删了这个项目基本就费了

> **`./index.html`**

>> 一个空`html`页面，里面包含了基本的`meta`。

> **`./source/*/module`是模块文件，会监听里面文件的，如果有变动同步更新`../module`中的所有文件。**

# 日志

日志按时间倒序，重要更新加粗

> #### 2017-06-21

>> 1. 首推`V2`版本