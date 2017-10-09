# jobTemplate V2

V1版本移步: [jobTemplate_v1](https://github.com/zoeDylan/jobTemplate_v1)

# 项目说明

集成一个基础的自动化模版，方便后期开发。

**这个项目只是一个模版，更大的作用是方便新手学习`gulp`、`webpack`、`自动化`等前端方面的技术**

项目使用`gulp`+`webpack`进行自动化处理，可以直接开发模块，方便代码管理。

如果你在使用中遇到问题，请在[issuse](https://github.com/zoeDylan/jobTemplate/issues)中提交你的问题。

## 解释

应该有同学会问到为什么要使用`gulp`+`webpack`结合来创建项目呢？

`gulp` 和 `webpack` 不是同一类工具，虽然能实现相同的功能，但是在实现的同时也各有优势.

`gulp`在这个项目的作用是流程控制，`webpack`在这个项目的作用是模块管理

取它们两个各自优点来共同处理项目.

这个项目创建初衷是为了方便快速进行项目开发，不需要从头开始配置一大堆东西

项目融合了`gulp`、`webpack`、`js`、`ts`、`jsx`、`tsx`这些东西是为了后期开发中，前端可能使用到的语言语法进行处理。

# 开始

1. 你得先有一个`node @>v6.0`

2. 安装`gulp`全局包 `npm i -g gulp`

3. 安装项目包 `npm i`

4. 运行命令：`gulp`

# 扩展

1. `gulp env` 正式环境下进行代码处理，与直接运行`gulp`相比,`js`会进行压缩，并且不会生成`.map`文件,`less`文件会吧所有注释去掉.


# 技术

1. `react` [中文](https://react.bootcss.com/) [EN](https://facebook.github.io/react/)

2. `less` [中文](http://lesscss.cn/) [EN](http://lesscss.org/)

3. `webpack` [中文](https://doc.webpack-china.org/) [EN](http://webpack.github.io/)

4. `gulp` [中文](http://www.gulpjs.com.cn/) [EN](https://gulpjs.com/)

5. `typescript` [中文](https://www.tslang.cn/) [EN](http://www.typescriptlang.org/)

6. `js` 这个都不会就不用做前端了。

# 兼容

理论上支持现在常用的所有浏览器

# 文件和文件夹说明

`./help`

帮助文档，如果有什么疑问可以去这里面看


**`./source`**

主要目录，`js`、`css`、`image`这三个文件夹的源文件目录,不可删除

`./static`

自动化处理后的目录，可删除，但是尽量不要存放其它东西

**`./gulpfile.js`**

详情描述请直接查看文件注释，这个删了这个项目基本就费了

**`./webpack.config.js`**

功能同上，详情描述请直接查看文件注释

**`./tsconfig.json`**

仅仅为了解决一个编译`.ts`报错问题，没有它就报错

**`./index.html`**

一个空`html`页面，里面包含了基本的`meta`。

**`./source/*/module`是模块文件，会监听里面文件的，如果有变动同步更新`../module`中的所有文件。**

# 日志

日志按时间倒序，重要更新加粗

2017-10-09

1. 修复没有转换成`es2015`的BUG

2017-09-07

1. 优化`ts`编写引用模块问题

2. 优化`readme.md`文档

3. 优化三个配置文件的内容。

#### 2017-08-09

1. 添加对`ts`和`tsx`的支持

2. 去掉无用的`./source/module/_wx.js` 需要使用移步[zoedylan-tool](https://github.com/zoeDylan/zoeDylan-tool)

3. `gulp`内部加载`webpack.config.js`修改为动态加载,方便修改`webpack.config.js`后无需重启`gulp`

4. `css reset`修改为`normalize.css`

5. 清理掉一些没必要的文件和文件夹

6. 取消`./plugin`文件夹,后期可以自己手动添加

7. 添加`tsconfig.json`,解决`ts-loader`报错问题

8. 添加更多说明

2017-08-03

1. 添加默认`js`处理为`es2015`

2017-07-28

1. 添加`gulp-webserver`启动服务

2017-07-27

1. 新增内容测试完成

2. 优化文档

3. 更多的注释

#### 2017-07-26

1. 模块取消了`cmd`和直接调用，详情查看文件[help\moduleTp.js](./help/moduleTp.js)

2. 丰富`webpack`

>1. 取消`gulp`里面的`js`压缩和`gulp-babel`,完全使用`webpack`

>2. `webpack`添加对`react`方面的处理,可以直接编写`*.jsx`文件

2017-07-05

1. 微信分享一个小BUG修复

2017-06-30

1. 修改`less`的`sourcemap`文件路径

#### 2017-06-21

1. 首推`V2`版本