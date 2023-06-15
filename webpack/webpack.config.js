const path=require('path')
module.exports= {
    mode:'development',//mode用来指定构建模式,可选值有development/production
    entry:path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'), //输出目录
        filename:'bondle.js'    //输出文件
    }
}
