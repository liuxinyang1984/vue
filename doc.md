# VUE

## ES6

### 模块 

#### 模块化规范
- 每个JS文件都是一个独立的模块
- 导入其它模块成员使用import关键字
- 向外共享模块成员使用export关键字

#### node.js中ES6模块化
1. node.js版本>=14.15.1
2. package.json的根节点中添加"type":"module"节点
    ```js
    //package.json
    "type":"module",
    ....
    ```

#### 默认导入导出
1. 默认导出    
    默认导出的语法:export default
    ```js
    let n1=10
    function foo(){}

    export default{
        n1,
        foo
    }
    ```
1. 默认导入 
    默认导入的语法:import xxx from 'xxx.js'    
    ```js
    import export1 from './01.export.js'
    console.log(export1)
    ```
1. 注意事项     
    - 导出    
    每个模块中,**只允许使用唯一的一次**export default,否则会报错!
    - 导入    
    默认导入时的接收名称可以任意名称,只要是__合法__的成员名称即可.

#### 自定义导入导出
1. 自定义导出    
    ```js
    export let s1 = 'a'
    export let s2 = 'b'
    export function say(){}
    ```
1. 自定义导入
    ```js
    import {s1,say} from './03.export.js'
    console.log(s1)
    ```
1. 注意事项
    - 每个模块中可以使用多次按需导出
    - 按需导入的成员名称必须和按需导出的名称保持一致
    - 按需导入时,可以使用as关键字进行重命名
    - 按需导入可以和默认导入一起使用

#### 直接导入并执行模块中的代码    
如果只是单纯地执行某个模块中的代码,并不需要得到模块中的向外共享的成员.些时,可以直接导入并执行模块代码
```js
/**
* 需要执行的文件,例如05.export.js
*/
for (let i=0;i<3;i++>){
 console.log(i)
}

/**
* 在需要执行的文件直接导入并执行
*/

import './05.export.js'

```

### promise    
为了解决回调问题,ES6新增了promise的概念
#### 基本概念
1. Promise是一个构造函数    
    - 可发创建一个Promise的实例    
    ```js
    const p = new Promise()
    ```
    - Promise实例对象代表一个异步操作
1. .then()方法
    - 每一个Promise对象都可以通过原型链的方式访问到.then()方法    
    ```js
    p.then()
    ```
    - .then()方法用来预先指定成功和失败的回调函数
    ```js
    //**
    //* param:function 成功的回调函数(必选)
    //* param:function 失败的回调函数(可选)
    //*/
    p.then(result=>{},error=>P{})
    ```
    - .then()方法的特性    
    如果上一个.then()方法返回了一个新的Promise实例对象,刚可以通过下一个.then()继续进行处理.通过.then()方法的链式调用,可以解决回调地狱问题.
    ```js
    fs.readFile('./files/1.txt','utf8')
    .then(
        r1=>{
            console.log(r1)
            return fs.readFile('./files/2.txt','utf8')
        }
    ).then(
        r2=>{
            console(r2)
        }
    )
    ```
1. .catch()方法    
Promise对象可以通过.catch()方法捕获错误,如果不希望前面的错误导致后续的.then()无法正常执行,可以__将.catch()提前调用__
```js
fs.readFile('./files/1.txt','utf8')
.catch(
    err=>{
        console.log(err.message)
    }
).then(
    r1=>{
        console.log(r1)
        fs.readFile('./files/2.txt','utf8')
    }
)
```
1. .all()方法    
    Promise.all()方法会发起并行的Promise异步操作,等__所有的异步操作全部结束后__才会执行下一步的.then()操作(等待机制).      
    ```js
    // 1. 定义一个数组,存放Promise对象
    const promiseArr = [
        fs.readFile('./files/1.txt','utf8'),
        fs.readFile('./files/2.txt','utf8')
    ]

    // 2. 将Promise数组作为Promise.all()的参数
    Promise.all(promiseArr)
    .then(
        ([r1,r2,r3])=>{
            console.log(r1,r2,r3)
        }
    ).catch(
        err=>{
            console.log(err.message)
        }
    )
    ```
1. .race()方法
    Promise.race()方法会发起并行的Promise异步操作,__只要任何一个异步操作完成__,就__立即__执行下一步的.then()方法(赛跑机制).
    ```js
    ....
    Promise.race(promiseArr)
    .then(
        result=>{
        console.log(result)
        }
    )
    ```

### async/await    
#### 基本概念
async/await是ES8引用的新语法,用来简化__Promis异步操作__.在async/await出现之前,开发者只能通过__.then()的方式__处理Promise异步操作.
```js
thenFs.readFile('./files/1.txt','utf8')
.then(r1=>{
    console.log(r1)
})
```
#### 使用方法    
```js
import thenFS from 'then-fs'

async function getAllFile(){
    const r1 =  await thenFs.readFile('./files/1.txt','utf8')
    console.log(r1)
    const r2 =  await thenFs.readFile('./files/2.txt','utf8')
    console.log(r2)
}
getAllFile();
```

#### 注意事项    
- 如果在function中使用了await,则function**必须**被async修饰
- 在async方法中,**第一个await之前的代码会被同步执行**,await之后的代码会被异步执行
    ```js
    ...
    console.log('外面前>>>>')
    async function getAllFile(){
        console.log('里面前>>>>')
        const r1 = await fs.readFile('./files/1.txt','utf8')
        const r2 = await fs.readFile('./files/2.txt','utf8')
        console.log(r1,r2)
        console.log('里面后>>>>')
    }
    getAllFile()
    console.log('外面后>>>>')
    ```
    执行结果为    

    ```shell
    外面前>>>>
    里面前>>>>
    外面后>>>>
    I am 1.txt
    I am 2.txt
    里面后>>>>
    ```

### eventLoop
#### 基本概念
JavaScript主线程从任务队列中读取异步任务的回调函数,放到执行栈中依次执行.这程不断循环的运行机制称为__EventLoop__(事件循环)
##### 原因
JavaScript是一门__单线程执行__的编程语言,同一时间只能做一个任务,如果__前一个任务__非常耗时,后续的任务就不得不一直等待,从面导致程序假死

为了防止某个__耗时任务__导致__程序假死__,JavaScript把待执行的任务分为了两类
- 同步任务(synchronous)
    - 又叫做__非耗时任务__,指的是主线程上排队执行的任务
    - 只有前一个任务执行完毕,才能执行后一个任务
- 异步任务(asynchronous)
    - 又叫做__耗时任务__,异步任务由JavaScript__委托__给宿主环境进行执行
    - 当异步任务执行完成后,会通知JavaScript__主线程__执行异步任务的__回调函数__

##### 同步任务和异步任务的执行过程
1. 同步任务由JavaScript主线程次序执行
1. 异步任务委托给宿主环境执行
1. 已完成的异步任务__对应的回调函数__会被加入到任务队列中等待执行
1. JavaScript主线程的__执行栈__被清空后,会读取任务队列中的回调函数,次序执行
#### 宏任务和微任务
##### 简介
JavaScript把__异步任务__做了进一步的划分,异步任务又分为两类
- 宏任务(macrotask)
    - Ajax
    - setTimeout,setInterval
    - 文件操作
    - ...
- 微任务(microtask)
    - Promise.then,.catch,.finally
    - process.nextTick
    - ...

## API案例

### 需求
基于mysql数据库+Express对外提供用户列表的API接口服务

#### 技术栈
- Express包
- Mysql2包
- ES6模块化语法
- Promise
- 异步(async/await)

### 实现步骤
1. 搭建项目基本结构
    - 创建项目
    ```shell
    npm init -y
    ```
    - 启用ES6模块化支持
    ```shell    
    vim package.json
    //在package.json添加type字段
    type:module
    ```
    - 安装依赖包
    ```shell
    npm install express -S
    npm install mysql2 -S
    ```
1. 创建基本的服务器
```js
import express from 'express'
const app = express()
app.listen(8088,()=>{
    console.log('服务器运行在:http://127.0.0.1:8088')
})
```

1. 创建db数据库操作模块
```js
// db/index.js
import mysql from 'mysql2'
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    database:'vue',
    user:'root',
    password:'xmlxzl'
})
export default pool.promise()
```
1. 创建user_ctrl业务模块
```js
// controller/user_ctrl.js
import db from '../db/index.js'
export async function getAllUser(req,res){
    try{
        const [rows] = await db.query('SELECT id,username,nickname,catid FROM user')
        console.log(rows)
        res.send({
            status:0,
            message:'获取用户成功',
            data:rows
        })
    }catch(ex){
        res.send({
            status:1,
            message:"服务器错误",
            desc:ex.message
        })
    }
}
```
1. 创建user_router路由模块
```js
// router/user_router.js
import express from 'express'
import { getAllUser } from '../controller/user_ctrl.js'
const router = new express.Router()
router.get('/user',getAllUser)
export default router
```

## webpack
### 隔行项目
#### 初始化
1. 新建项目
```shell
npc init -y
```
1. 新建src源代码目录
```shell
mkdir src
```
1. 新建首页 src/index.html首页和src/index.js脚本文件
```shell
touch src/index.html
touch src/index.js
```
1. 初始化首页基本结构
```html
...
ul>li{这是第$个li}*6
```
1. 安装jQuery模块
```shell
npm install jquery -S
```
1. 通过ES6模块化方式导入jQuery,实现隔行变色效果
    1. 导入jquery模块
    ```js
    import $ from 'jquery'
    ```
    1. 实现变色效果
    ```
    $(fcuntion(){
        $('li:odd'.css('backgroundColor','red'))
        $('li:even'.css('backgroundColor','blue'))
    })
    ```

### webpack
#### 安装webpack到开发依赖
```shell
npm install webpack webpack-cli -D
```

#### 配置webpack
- 在项目根目录,创建名为__webpack.config.js__的配置文件,并初始化以下基本配置
```js
// webpack.config.js
module.exports= {
    mode:'development' //mode用来指定构建模式,可选值有development/production
}
```
- 在package.json的script节点下,新增dev脚本
```js
// package.json
"scripts": {
"dev": "webpack",
"echo": "console.log(hello)"
}
```
- mode的可选值
    - development    
        - 开发环境
        - 不会对打包生成的文件进行__代码压缩__和__性能优化__
        - 打包速度过,适合在__开发阶段__使用
    - production
        - 生产环境
        - 会对打包生成的文件进行__代码压缩__和__性能优化__
        - 打包速度__慢__,适合在项目__发布阶段__使用

#### webpack.config.js文件的作用    
webpack.config.js是webpack的配置文件.webpack在真正开始打包构建之ll前,会__先读取这个配置文件__,从而基于给定的配置,对项目进行打包.
> 由于webpack是__基于node.js开发__的打包工具,因此在他的配置文件中,支持使用node.js相关的语法和模块进行webpack的个性化配置.

1. webpack中的默认约定 
    - 默认的打包入口文件为src/index.js
    - 默认的输出文件路径为dist/main.js
1. 自定义打包入口和出口    
在webpack.config.js配置文件中,通过__entry__节点指定打包的__入口__,通过__output__节点指定打包的__入口__.
```js
//webpack.config.js
const path = require('path')
module.exports= {
    mode:'development',//mode用来指定构建模式,可选值有development/production
    entry:path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'), //输出目录
        filename:'bondle.js'    //输出文件
    }
}
```
#### webpack插件
- webpack插件的作用    
通过安装和配置第三方插件,可以拓展webpack的能力,从而让webpack用起来更方便.最常用的webpack插件有如下两个:
    - webpack-dev-server    
    类似于node.js的nodemon工具,每当修改了源码,webpack会自动进行项目打包和构建
        - 安装
        ```shell
        npm install webpack-dev-server -D
        ```
        - 配置
        ```js
        //package.json
      "scripts": {
        "dev": "webpack server",
        "echo": "console.log(hello)"
      }
      ```
        - 运行    
        ```shell
        npm run dev
        ```
    - html-webpack-plugin    
    webpack中的HTML插件(类似于一个模板引擎插件),可以通过插件自定义index.html的页面内容
