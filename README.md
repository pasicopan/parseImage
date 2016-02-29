这是一个可以清除png 图片空白区域，并把图片原来的位置、尺寸信息生成html的nodejs 文件

依赖pngjs 模块

准备要裁剪的图片

![准备要裁剪的图片](http://raw.github.com/pasicopan/parseImage/master/screenshot/1.jpeg "准备要裁剪的图片")

看图层数量就知道有多忙了

![看图层数量就知道有多忙了](http://raw.github.com/pasicopan/parseImage/master/screenshot/2.jpeg "看图层数量就知道有多忙了")

但我们有脚本！（对整个psd 进行脚本会非常耗时，建议是新建psd 对部分图层进行处理）

![但我们有脚本！](http://raw.github.com/pasicopan/parseImage/master/screenshot/3.jpeg "但我们有脚本！")

顺利的话会看到这样

![顺利的话会看到这样](http://raw.github.com/pasicopan/parseImage/master/screenshot/4.jpeg "顺利的话会看到这样")

在命令行模式下 或者windows 就双击parseImage.js

运行parseImage.js 之后（图片默认要放到parseImage.js 同目录下的img 文件夹里面，或者自己修改parseImage.js 文件）

![运行parseImage.js 之后](http://raw.github.com/pasicopan/parseImage/master/screenshot/5.jpeg "运行parseImage.js 之后")

还有这些带坐标尺寸的html 和css 代码！

![html代码](http://raw.github.com/pasicopan/parseImage/master/screenshot/6.jpeg "html代码")

打完收工～
