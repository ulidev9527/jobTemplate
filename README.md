# jobTemplate
一个工作上模版，方便开发web页面时直接使用。

模版使用Koala进行编译[http://koala-app.com/index-zh.html](http://koala-app.com/index-zh.html)

`source/less/false`文件夹里面是不进行编译的

`source/less/false/zoeDylan.reset.less`文件是css样式初始化文件

`source/less/false/animation.less`文件是css动画保存文件

`source/less/false/tc.less`文件是弹窗样式

`source/less/false/swiper.min.css.less`swiper插件

`source/less`和`source/js`文件夹下面的文件会自动编译到根目录下面的`statics`文件夹下对应的目录

`index.html`文件是基础模版

####2016-07-20 添加gulp自动化

使用`gulp.js`进行编译,具体操作请移步[gulp.js](http://www.gulpjs.com.cn/docs/api/)


####2016-11-09 

    1.添加css兼容处理gulp-autoprefixer
    2.添加弹窗样式、swiper插件和jq3.0