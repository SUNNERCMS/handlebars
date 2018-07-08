# 模板引擎Handlebars实现我的笔记本

[点击查看实现后的效果](http://zhanghuanbiao.gitee.io/learnfree/handlebars/final-2/)  
[最终源码](https://gitee.com/zhanghuanbiao/LearnFree/tree/master/handlebars/final-2)

* 第一部分 Handlebars 的使用演示
    * Handlebars的基本使用流程
    * Handlebars中的each、with、if、注释
    * Handlebars中的自定义helper
* 第二部分 Handlebars 实战： 实现慕课笔记本
    * 课程接口
    * 章节大纲接口
    * 笔记接口

## 第一部分: Handlebars的使用演示

### 一、Handlebars的基本使用流程

首先，我们先搭建起一个简单的 `html` 页面，并加上简单的`css`样式：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="handlebars使用教学 handlebars案例演示">
    <title>Handlebars教程</title>
    <style>
        .card {
            font-size: 30px;
            background-color: #abbccc;
            margin: 20px;
            float: left;
        }
    </style>
</head>
<body>
    <div class="card"></div>
</body>
</html>
```

接下来通过代码，演示`Handlebars`的简单使用流程：

```html
 <!-- 模板部分 -->
<script id="tpl" type="text/x-handlebars-template">
    <div>姓名： {{name}}</div>
    <div>出生： {{birth}}</div>
    <div>籍贯： {{home}}</div>
    <div>工作： {{job}}</div>
</script>

<!-- 引入handlebars -->
<script src="https://cdn.bootcss.com/handlebars.js/2.0.0/handlebars.min.js"></script>

<!-- js部分 -->
<script>
    // 数据
    var data = {
        name: '凯文米特尼克',
        birth: '1963年8月6日',
        home: '美国洛杉矶',
        job: '网络安全咨询师'
    }

    // 获取模板
    var tpl = document.getElementById('tpl').innerHTML
    // Handlebars编译模板，返回一个可执行函数
    var template = Handlebars.compile(tpl)
    // 传入数据，得到编译后的html
    var html = template(data)
    // 将编译完成的html显示到网页
    document.getElementsByClassName('card')[0].innerHTML = html
</script>
```
通过以上代码的演示，可以很容易理解`Handlebars`的基本使用方式；

**说明：这是使用`Handlebars2.0`，因为我在电视机顶盒上测试过，可用，也就是说，起码可用兼容到`IE6`**  


[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/01/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/blob/master/handlebars/01/index.html "代码")  


### 二、Handlebars中的`each`、`with`、`if`、注释

**01** `Handlebars`内置`helper` ： `each` 的使用（遍历数组或对象）  

**注意：`each`、 `if`等内置表达式属于块级表达式，带`#`号**  

`each`使用演示-代码部分：

```html
<body>
    <div id="card"></div>
    <!-- 模板部分 -->
    <script id="tpl" type="text/x-handlebars-template">
        {{!-- Handlebars的注释写法 --}}
        {{!-- 注意：Handlerbars比较难以理解的地方是：在数据渲染时会自动进入数据的下一层 --}}
        {{!-- 这里的this代表data数组 --}}
        {{#each this}}
        <div class="card">
                <div>姓名： {{name}}</div>
                <div>出生： {{birth}}</div>
                <div>籍贯： {{home}}</div>
                <div>工作： {{job}}</div>
                <ul>
                    {{#each books}}
                    {{!-- 这里的this代表books数组中的值 --}}
                    <li>{{this}}</li>
                    {{/each}}
                </ul>
        </div>
        {{/each}}
    </script>
    <!-- 引入handlebars -->
    <script src="https://cdn.bootcss.com/handlebars.js/2.0.0/handlebars.min.js"></script>

    <!-- js部分 -->
    <script>
        // 数据
        var data = [
            {
                name: '凯文米特尼克',
                birth: '1963年8月6日',
                home: '美国洛杉矶',
                job: '网络安全咨询师',
                books: [
                    '《欺骗的艺术》',
                    '《入侵的艺术》',
                    '《线上幽灵》'
                ]
            },
            {
                name: '沃兹尼亚克',
                birth: '1950年8月11日',
                home: '美国加利福利亚',
                job: '电脑工程师',
                books: [
                    '《与苹果一起疯狂》'
                ]
            }
        ]

        // 获取模板
        var tpl = document.getElementById('tpl').innerHTML
        // Handlebars编译模板，返回一个可执行函数
        var template = Handlebars.compile(tpl)
        // 传入数据，得到编译后的html
        var html = template(data)
        // 将编译完成的html显示到网页
        document.getElementById('card').innerHTML = html
    </script>
</body>

</html>
```  

`handlebars` 遍历的另一种写法，上面代码中的`books`数组的遍历部分可以改为下面的形式，不过通常不用：

```text
{{!-- with的作用是进行上下文切换, 了解即可 --}}
{{#with books}}
    {{!-- 这里的this是books, 因为在with中上下文指向了books --}}
    {{#each this}}
    <li>{{this}}</li>
    {{/each}}
{{/with}}
```


[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/02/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/blob/master/handlebars/02/index.html "代码")    


**02** `Handlebars`内置`helper` ： `if` 的使用（判断）

上面代码中的`data`数组添加一条数据：

```javascript
// 数据
var data = [
    {
        name: '凯文米特尼克',
        birth: '1963年8月6日',
        home: '美国洛杉矶',
        job: '网络安全咨询师',
        books: [
            '《欺骗的艺术》',
            '《入侵的艺术》',
            '《线上幽灵》'
        ]
    },
    {
        name: '沃兹尼亚克',
        birth: '1950年8月11日',
        home: '美国加利福利亚',
        job: '电脑工程师',
        books: [
            '《与苹果一起疯狂》'
        ]
    },
    {
        name: 'zhanghuanbiao',
        home: '中国广东',
        job: '前端工程师'
    }
]
``` 

下面我们用代码演示一下`if`在`Handlebars`中的用法：  

```html
{{#each this}}
<div class="card">
        <div>姓名： {{name}}</div>
        {{#if birth}}
        <div>出生： {{birth}}</div>
        {{/if}}
        <div>籍贯： {{home}}</div>
        <div>工作： {{job}}</div>
        {{#if books}}
        <ul>
            {{#each books}}
            <li>{{this}}</li>
            {{/each}}
        </ul>
        {{/if}}
</div>
{{/each}}
```  

[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/03/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/blob/master/handlebars/03/index.html "代码") 



### 三、Handlebars中的自定义`helper`  

首先明白几个概念：  
* 通过， `@index` 可以获取元素在数组中的索引值；  
* 通过， `../` 可以获取到上层作用域中的值 （类似于相对路径);
* 通过， `Handlebars.registerHelper` 可以自定义`help`  
* `help`, 有块级`help`, 以及内联`help` 

我们通过解决下面的三个小需求来学习如何在`Handlebars`中自定义`helper`

* 在每个卡片上加上中文序号
* 在每本书上加上序号，格式为 卡片序号-书序号（如： 1-1，1-2 ...）
* 第一本书显示为红色，其余的显示为蓝色 

#### 01 在每个卡片上加上中文序号  

 更改模板部分为： 

 ```html
 ...
 {{!-- 调用自定义的内联help --}}
<div>卡片序号： {{chinese @index}}</div>
<div>姓名： {{name}}</div>
{{#if birth}}
<div>出生： {{birth}}</div>
{{/if}}
<div>籍贯： {{home}}</div>
<div>工作： {{job}}</div>
...
 ```  

 自定义的内联`helper`为：

 ```javascript
 // 自定义内联help
 // 返回中文序号
Handlebars.registerHelper('chinese', function(value) {
    var hash = ['一', '二', '三']
    return hash[value]
})
 ```

[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/04/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/blob/master/handlebars/04/index.html "代码") 


#### 02 在每本书上加上序号，格式为 卡片序号-书序号（如： 1-1，1-2 ...） 

 更改模板部分为： 

 ```html
 ...
 {{#if books}}
<ul>
    {{#each books}}
    <li>{{addOne @../index}}-{{addOne @index}} {{this}}</li>
    {{/each}}
</ul>
{{/if}}
 ...
 ```  

 自定义的内联`helper`为：

 ```javascript
// 序号加1
Handlebars.registerHelper('addOne', function(value) {
    return ++value
})
 ```  

[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/05/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/blob/master/handlebars/05/index.html "代码")  


#### 03 第一本书显示为红色，其余的显示为蓝色  


 更改模板部分为： 

 ```html
 ...
{{#each books}}
<li {{#isFirst @index}}style="color: red"{{/isFirst}} {{#isBlue @index}}style="color: blue"{{/isBlue}}>
    {{addOne @../index}}-{{addOne @index}} {{this}}
</li>
{{/each}}
 ...
 ```  

 自定义的块级`helper`为：

 ```javascript
// 自定义块级help
// 判断是否是第一个元素
Handlebars.registerHelper('isFirst', function(index, option) {
    if(index === 0) {
        return option.fn(this) // this根据上下文决定，这里的this代表books数组中的元素
    }
})
// 判断索引是否大于0
Handlebars.registerHelper('isBlue', function(index, option) {
    if(index > 0) {
        return option.fn(this) 
    }
})
 ```  

 由此可看出， 内联`helper` 与 块级`help`的区别在于：  
 * 块级`helper` 有开始和结束标签， 内联`helper` 没有结束标签
 * 块级`helper` 需要配合 `#`号使用

[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/06/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/blob/master/handlebars/06/index.html "代码") 



## 第二部分 Handlebars实战演练（实现我的笔记本）

### 一 接口介绍

* 课程数据接口（带分页,每页显示6条数据）： `http://imoocnote.calfnote.com/inter/getClasses.php?curPage=1`
* 课程章节接口： `http://imoocnote.calfnote.com/inter/getClassChapter.php?cid=1`  
* 获取笔记内容接口： `http://imoocnote.calfnote.com/inter/getClassNote.php?cid=1`  

### 二 获取课程数据，并通过Handlebars渲染  

[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/final/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/tree/master/handlebars/final "代码") 

### 三 获取章节大纲数据，并通过Handlebars渲染  

[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/final-1/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/tree/master/handlebars/final-1 "代码") 


### 四 获取笔记数据，并通过Handlebars渲染  

[点击查看演示](http://zhanghuanbiao.gitee.io/learnfree/handlebars/final-2/ "演示")  
[点击获取代码](https://gitee.com/zhanghuanbiao/LearnFree/tree/master/handlebars/final-2 "代码") 

**大部分课程没有笔记， 如果想看有笔记的，可以翻到最后一页，点击`sublime`那个课程进行查看**  


**实战部分，在源码中，有详细注释，有兴趣的可以参见源码**


> 佛曰： 我执，是痛苦的根源！
