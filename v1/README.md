# jobTemplate

## 导航

> [项目说明](#项目说明 "查看项目说明")

> [日志](#日志 "查看日志")--*仅展示重要日志列表*

>> [2017-03-30 版本存储](#2017-03-30)

>> [2017-01-12](#2017-01-12)

>> [2017-01-09](#2017-01-09)

>> [2016-11-23](#2016-11-23)

> [插件官网网站](#插件官网网站 "插件官网网站")

> [API for zoeDylan.js](#api "zoeDylan.js的API文档")

>> [**String.trim** 清除字符串前后空格](#stringtrim "清除字符串前后空格")

>> [**_randomNum** 获取随机数](#_randomnum "获取随机数")

>> [**_randomString** 获取随机字符串](#_randomstring "获取随机字符串")

>> [**_randomColor** 获取随机颜色值](#_randomcolor "获取随机颜色值")

>> [**_isPhone** 判断是否是手机号码](#_isphone "判断是否是手机号码")

>> [**_isEmail** 判断是否是邮箱](#_isemail "判断是否是邮箱")

## 项目说明

> 一个工作上常用模版，方便开发前端（FE）开发时时直接使用。

> `source/less` 和 `source/js` 文件夹下面的文件会自动编译到根目录下面的 `statics` 文件夹下对应的目录（ `less目录内容将编译到css文件夹下面` ）

> js和css启用了压缩

> `index.html` 文件是基础模版

> `source/less` 文件夹内容说明

>> `false/` 文件夹里面是不进行直接编译，由 `main.less` 调用

>> `false/zoeDylan.reset-0.0.1.less` 文件是css样式初始化文件

>> `false/animation-0.0.1.less` 文件是css动画保存文件

>> `false/tc-0.0.1.less` 文件是弹窗样式

>> `false/swiper.min.css-0.0.1.less` swiper插件

> `source/js` 文件夹内容说明

>> 文件前面添加数字1是为了编译的时候好继承到一个文件夹里面而不报错

>> `1jquery-3.1.1.js` 和 `1swiper-3.4.0.js` 请移步[插件官网网站](#插件官网网站 "插件官网网站")

>> `1zoeDylan-0.0.1.js` 本项目最重要的一个插件，不依赖任何外包，纯js打造，主要内容是开发或收集网络上各种高性能、实用性高、兼容解决等JS功能，方便平时开发

>> `main.js` 页面使用的js，处理页面逻辑。

>> `./file`、`source/js/plugin`和`source/less/plugin`为[2017-01-12](#2017-01-12)新增

## API

> 说明： 

>> 此api为zoeDylan.js的API，如需项目内其它API，请移步[插件官网网站](#插件官网网站 "插件官网网站")

>> 所有开发的功能都以下划线(_)开头

>> 依赖和无依赖代表是否调用的内部的函数

> #### String.trim

>> Sting.trim()

>>> 清除字符串前后空格[无依赖]

    ' trim '.trim();//trim

> #### _randomNum

>> _randomNum(min[,max[,decimal]])

>>> 获取随机数[无依赖]

    _randomNum(10,20);//获取10到20的随机整数
    _randomNum(10);//获取0-10的随机整数
    _randomNum(10,20,5);//获取10-20的随机5位小数

> #### _randomString

>> _randomString([length[,chars]])

>>> 获取随机字符串[依赖：_randomNum]

    _randomString();//获取32位长度的随机字符串
    _randomString(10);//获取10位长度的随机字符串
    _randomString(10,'zoeDylan');//用zoeDylan生成10位长度的随机字符串

> #### _randomColor

>> _randomColor()

>>> 获取随机颜色值[无依赖]

    _randomColor();//#fadacd 返回一个16进制的颜色值

> #### _isPhone

>> _isPhone(val)

>>> 判断是否是手机号码[无依赖]

    _isPhone(13800138000);//true
    _isPhone(1380013800);//false

> #### _isEmail

>> _isEmail(val)

>>> 判断是否是邮箱[无依赖]

    _isEmail('627213037@qq.com');//true
    _isEmail('6@qq.com');//false

## 日志

> 说明：

>> 日志以时间倒叙排序 

>> 时间加粗为重大修改

> #### 2017-03-30 

>> 1. 重新`gulpfile.js`，优化内部代码

>> 2. 去除`source/js/plugin`，增加`source/plugin`，

>> 3. 取消`js`代码压缩功能和`es6 to es5`处理功能`(babel)`

>> 4. 取消`./file`，增加`source/image`，监听`source/image/*.*`，有改动移到对应的目录

>> 5. `gulp`将成为`V1`版本，如无特殊情况将不进行更新，后面将新增`webpack`版本进行开发

> #### 2017-01-12

>> 1. `gulp`中，`js`压缩和`css`压缩，增加`plugin`插件文件夹，用于单独压缩插件，不与自己编写的代码相冲突,`plugin`代码处理后，会在`statics`文件夹对应位置生成`plugin.*`的文件。

>> 2. `gulp`中，`build`方法增加文件提取，提取的文件会在根目录添加一个`/build`文件夹，提取后，所有页面文件`*.html`都会存入到`/build`文件夹中

>> 3. 增加`file`文件夹，用于存放图片、字体等开发中所需的文件

>> 4. css和js生成，取消全部压缩在`main.js`和`main.css`，方便项目开发单独文件的调用。

>> 5. 命令`gulp`后，默认对`source`文件夹进行代码处理

>> 6. 已知问题遗留，删除`source`文件夹文件后，`statics`文件夹未进行删除。

> #### 2017-01-09

>> 1. `gulp`添加[gulp-babel](https://www.npmjs.com/package/gulp-babel)，进行es6处理

>> 2. `gulp`添加[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)，增加文件加`statics/maps`源码地图

>> 3. `gulp`添加[gulp-plumber](https://www.npmjs.com/package/gulp-plumber)，之前报错有可能导致`gulp`强制关闭，使用次插件处理

>> 4. `gulp`添加[gulp-debug](https://www.npmjs.com/package/gulp-debug)，控制台展示`debug`信息

>> 5. `gulp`添加[gulp-watch](https://www.npmjs.com/package/gulp-watch)，此插件解决`gulp`无法监听文件的增加和删除的文件问题

>> 6. `main.js`和`1zoeDylan-0.0.1.js`部分位置修改为es6语法

>> 7. 添加[gulp](http://www.gulpjs.com.cn/)插件官网

> 2016-12-23

>> 1. `main.js` 分享成功事件错误问题

> 2016-12-16

>> 1. `index.html`里面js引用默认source修改为statics

> 2016-12-09

>> 1. 去除gulp中的图片处理

>> 2. 添加gulp任务：css、js、jsMinify，默认js不压缩，jsMinify是进行压缩

>> 3. 默认监听文件改动不进行压缩,执行build任务时，js进行压缩

> 2016-11-24

>> 1. main.js添加弹窗

>> 2. zoeDylan.js里面文案优化

> #### 2016-11-23

>> 1. requestAnimationFrame兼容添加

>> 2. 微信js配置添加 

>> 3. jQuery更新至3.1.1

>> 4. swiper更新至3.4.0

>> 5. zoeDylan.js的API添加

>> 6. 添加版本号

>> 7. 添加插件官网

>> 8. 添加README.md文件导航

> 2016-11-17

>> 添加js文件合并，合并js是注意js排序

> 2016-11-09

>> 1. 添加css兼容处理gulp-autoprefixer

>> 2. 添加弹窗样式、swiper插件和jq3.0

>> 3. 移除Koala编译

> 2016-07-20 

>> 添加gulp自动化,使用`gulp.js`进行编译,具体操作请移步[gulp.js](http://www.gulpjs.com.cn/docs/api/)


## 插件官网网站

> [jQuery](http://jquery.com/)

>> 前端开发利器，新手到大神都喜欢的一款插件。

> [swiper](http://www.swiper.com.cn/)

>> Swiper常用于移动端网站的内容触摸滑动，可用于幻灯片、单页应用等

> [gulp](http://www.gulpjs.com.cn/)

>> 自动化构建工具