# jobTemplate

## 导航

> [项目说明](#项目说明 "查看项目说明")

> [日志](#日志 "查看日志")--*仅展示重要日志列表*

>> [2016-11-23](#2016-11-23)

> [插件官网网站](#插件官网网站 "插件官网网站")

> [API for zoeDylan.js](#api "zoeDylan.js的API文档")

>> [**String.trim** 清除字符串前后空格](#string.trim "清除字符串前后空格")

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

## API

> 说明： 

>> 此api为zoeDylan.js的API，如需项目内其它API，请移步[插件官网网站](#插件官网网站 "插件官网网站")

>> 所有开发的功能都以下划线(_)开头

>> 集成和无集成代表是否调用的内部的函数

> #### String.trim

>> Sting.trim()

>>> 清除字符串前后空格[无集成]

    ' trim '.trim();//trim

> #### _randomNum

>> _randomNum(min[,max[,decimal]])

>>> 获取随机数[无集成]

    _randomNum(10,20);//获取10到20的随机整数
    _randomNum(10);//获取0-10的随机整数
    _randomNum(10,20,5);//获取10-20的随机5位小数

> #### _randomString

>> _randomString([length[,chars]])

>>> 获取随机字符串[集成：_randomNum]

    _randomString();//获取32位长度的随机字符串
    _randomString(10);//获取10位长度的随机字符串
    _randomString(10,'zoeDylan');//用zoeDylan生成10位长度的随机字符串

> #### _randomColor

>> _randomColor()

>>> 获取随机颜色值[无集成]

    _randomColor();//#fadacd 返回一个16进制的颜色值

> #### _isPhone

>> _isPhone(val)

>>> 判断是否是手机号码[无集成]

    _isPhone(13800138000);//true
    _isPhone(1380013800);//false

> #### _isEmail

>> _isEmail(val)

>>> 判断是否是邮箱[无集成]

    _isEmail('627213037@qq.com');//true
    _isEmail('6@qq.com');//false

## 日志

> 说明：

>> 日志以时间倒叙排序 

>> 时间加粗为重大修改

> #### 2016-11-23

>> 1.requestAnimationFrame兼容添加

>> 2.微信js配置添加 

>> 3.jQuery更新至3.1.1

>> 4.swiper更新至3.4.0

>> 5.zoeDylan.js的API添加

>> 6.添加版本号

>> 7.添加插件官网

>> 8.添加README.md文件导航

> 2016-11-17

>> 添加js文件合并，合并js是注意js排序

> 2016-11-09

>> 1.添加css兼容处理gulp-autoprefixer

>> 2.添加弹窗样式、swiper插件和jq3.0

>> 3.移除Koala编译

> 2016-07-20 

>> 添加gulp自动化,使用`gulp.js`进行编译,具体操作请移步[gulp.js](http://www.gulpjs.com.cn/docs/api/)


## 插件官网网站

> [jQuery](http://jquery.com/)

>> 前端开发利器，新手到大神都喜欢的一款插件。

> [swiper](http://www.swiper.com.cn/)

>> Swiper常用于移动端网站的内容触摸滑动，可用于幻灯片、单页应用等