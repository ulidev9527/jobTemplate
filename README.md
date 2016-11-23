# jobTemplate

## 项目说明

> 一个工作上常用模版，方便开发前端（FE）开发时时直接使用。

> `source/less` 和 `source/js` 文件夹下面的文件会自动编译到根目录下面的 `statics` 文件夹下对应的目录（ `less目录内容将编译到css文件夹下面` ）

> js和css启用了压缩

> `index.html` 文件是基础模版

> `source/less` 文件夹内容说明

>> `false/` 文件夹里面是不进行直接编译，由 `main.less` 调用

>> `false/zoeDylan.reset.less` 文件是css样式初始化文件

>> `false/animation.less` 文件是css动画保存文件

>> `false/tc.less` 文件是弹窗样式

>> `false/swiper.min.css.less` swiper插件

> `source/js` 文件夹内容说明

>> 文件前面添加数字1是为了编译的时候好继承到一个文件夹里面而不报错

>> `1jquery-3.0.0.js` jQuery3.0,不解释


## API

> 说明： 

>> 此api为zoeDylan.js的API，如需项目内其它API，请移步[插件官网列表](#插件官网列表"插件官网列表")

>> 所有开发的功能都以下划线(_)开头

>> 继承和无集成代表是否调用的内部的函数

#### String.trim

> Sting.trim()--清除字符串前后空格[无集成]

    ' trim '.trim();//trim

#### _randomNum

> _randomNum(min[,max[,decimal]])--获取随机数[无集成]

    randomNum(10,20);//获取10到20的随机整数
    randomNum(10);//获取0-10的随机整数
    randomNum(10,20,5);//获取10-20的随机5位小数

#### _randomString

> _randomString([length[,chars]])--获取随机字符串[集成：_randomNum]


## 日志

> 说明：

>> 日志以时间倒叙排序

> 2016-11-23

>> 1.requestAnimationFrame兼容添加

>> 2.微信js配置添加 

>> 3.jQuery更新至3.1.1

>> 4.swiper更新至3.4.0


> 2016-11-17

>> 添加js文件合并，合并js是注意js排序



> 2016-11-09

>> 1.添加css兼容处理gulp-autoprefixer

>> 2.添加弹窗样式、swiper插件和jq3.0

>> 3.移除Koala编译


> 2016-07-20 

>> 添加gulp自动化,使用`gulp.js`进行编译,具体操作请移步[gulp.js](http://www.gulpjs.com.cn/docs/api/)

## 插件官网列表