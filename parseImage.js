var fs = require('fs'),
    path = require('path'),
    PNG = require('pngjs').PNG;

// 图片目录
var imagePath = 'img';
// 重命名图片的前缀
var pre = imagePath+'-';
var outputHTMLFilePath = 'data.html';

// 未完成：接收用户输入前缀信息
// process.stdin.setEncoding('utf8');
// process.stdout.write('请输入文件前缀:');
//
// process.stdin.on('readable', function(){
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write('pre:'+chunk);
//   }
// });
//
// process.stdin.on('end', function(){
//   process.stdout.write('end');
// });

// 主入口
main(imagePath,pre);



function main(a_path,pre){
  // 清除旧数据，增加style
  fs.writeFile(outputHTMLFilePath, '<style>body{padding:300px 0;background-color:#ccc;width:60%;margin:0 auto;}img{display:block;margin:0 auto;}img{max-width:60%;max-height:400px;}</style>\n', 'utf8', function(){})
    var fileList = [];
    var dirList = fs.readdirSync(a_path);
    var index = 0;
    var fileString = '';
    // 遍历图片文件，重命名，裁切，生成图片信息数据
    dirList.forEach(function(item){
        if(fs.statSync(a_path + '/' + item).isDirectory()){
            walk(a_path + '/' + item);
        }else{
          if('.png'!==path.extname(item)) return;
          var newName = pre+index+path.extname(item);
          // fileList.push(a_path + '/' + item);
          index++;
          fileList.push(a_path + '/' + newName);
          fs.renameSync(a_path + '/' + item, a_path + '/' + newName);
          console.log('renamed complete');
          crop(a_path + '/' + newName,pre+index,function(data){
            writeFile(data);
          });
        }
    });
}

function crop(imageName,baseName,cb){
fs.createReadStream(imageName)
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
        var top = 0;
        var left = 0;
        var right = 0;
        var bottom = 0;
        var isFirstPoint = true;
        var index = 0;
        for(var i = 0 ,j = this.width*this.height*4;i<j;i = i+4,index++){
          var alphe = i+3;
          // 通过非透明像素找到图片的有效区间
          if(this.data[alphe]!=0 && isFirstPoint){
            // console.log('i is:',i);
            top = Math.floor(alphe/4/this.width);
            bottom = top;
            left = right = Math.floor(alphe/4%this.width);
            isFirstPoint = false;
          }
          else if(this.data[alphe]!=0 && !isFirstPoint) {
            if(alphe/4%this.width<left){
              left = Math.floor(alphe/4%this.width);
            }
            if(alphe/4%this.width>right){
              right = Math.floor(alphe/4%this.width);
            }
            if(Math.ceil(alphe/4/this.width)>bottom){
              bottom = Math.floor(alphe/4/this.width);
            }
          }
        }
        // console.log('[',top,']','[',left,']','[',bottom,']','[',right,']');
        var dst = new PNG({width: right-left+1, height: bottom-top+1});
        this.bitblt(dst, left, top, right-left+1, bottom-top+1, 0, 0);
        dst.pack().pipe(fs.createWriteStream(imageName));
        var pos = {x:left, y:top, w:right-left+1, h:bottom-top+1};
        var name = imageName;
        var data = '\n<p><img src="'+name+'"/></p><div class="cimg img-'+baseName+' hide"></div>\n <div><p>html:x:'+pos.x+',y:'+pos.y+',w:'+dst.width+',h:'+dst.height+'</p><textarea style="width:100%;"><div class="cimg img-'+baseName+' hide"></div></textarea></div><div>css:<textarea style="width:100%;">cimg.img-'+baseName+' {left:'+pos.x/100+'rem;top:'+pos.y/100+'rem;background-image: url("'+name+'");width: '+pos.w/100+'rem;height:'+pos.h/100+'rem ;}</textarea></div>\n';
        cb(data);
    });
}
function writeFile(data){
  fs.appendFile('data.html', data, 'utf8', function(){
    console.log('ok');
  })
}
