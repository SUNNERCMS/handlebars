(function ($) {
    // 全局ajax异常处理
    $.ajaxSetup({
        error: function () {
            return alert('数据请求失败')
        }
    })
    
    // 是否有笔记helper
    Handlebars.registerHelper('hasnote', function(v1, v2, options) {
        if (v1 == v2) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    })

    // 课程是否超过1小时
    Handlebars.registerHelper('islong', function(v, options) {
        if (v.indexOf('小时') !== -1) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    })

    // 是否是视频课程
    Handlebars.registerHelper('isvideo', function(v, options) {
        if (v === 'video') {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    })

    // 格式化日期
    Handlebars.registerHelper('formatDate', function(v) {
        var date = new Date(v)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate()
        return y + '年' + m + '月' + d + '日'
    })

    // 是否有数据
    Handlebars.registerHelper('isEmpty', function(data, options) {
        if (data.length === 0) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    })

    // 获取课程列表
    var classesUrl = 'http://imoocnote.calfnote.com/inter/getClasses.php'
    var template = handlebarsCompile('#class-template')
    getJsonData(classesUrl, 1, template)

    $.getJSON(classesUrl, {curPage: 1}, function(data) {
        var pageCount = parseInt(data.totalCount)
        // 生成分页代码
        $(".tcdPageCode").createPage({
            pageCount: pageCount,
            current: 1,
            backFn: function (p) {
                getJsonData(classesUrl, p, template)
            }
        })
    })

    // 模态框居中
    var modal = $('.modal').eq(0)
    modal.css({
        left: parseInt(($(window).width() - modal.width()) / 2),
        top: parseInt(($(window).height() - modal.height()) / 2)
    })

    // 屏锁
    var lock = $('#lock')
    // 获取章节URL
    var chapterUrl = 'http://imoocnote.calfnote.com/inter/getClassChapter.php'
    // 获取笔记URL
    var noteUrl = 'http://imoocnote.calfnote.com/inter/getClassNote.php'
    // 编译chapter模板
    var chapterTemplate = handlebarsCompile('#chapter-template')
    // 编译note模板
    var noteTemplate = handlebarsCompile('#note-template')
    // 事件委托给content
    var content = $('#content')
    content.on('click', 'li', function(event) {
        var chapterData = {}
        // 显示屏锁
        lock.show()
        var li = $(event.currentTarget)
        // cid
        var cid = parseInt(li.attr('id'))
        // 课程标题
        chapterData.title = li.attr('title')
        // 获取章节数据
        $.getJSON(chapterUrl, {cid: cid}, function(data) {
            chapterData.data = data
            var html = chapterTemplate(chapterData)
            $('#chapter').html(html)
            // 显示模态框
            modal.show()
        })

        // 获取笔记数据
        $.getJSON(noteUrl, {cid: cid}, function(data) {
            var html = noteTemplate(data)
            $('#note').html(html)
        })
    })


    // 取消锁屏， 隐藏模态框
    lock.click(function() {
        lock.hide()
        modal.hide()
    })
    

})(jQuery)


function handlebarsCompile(id) {
    var tpl = $(id).html()
    var template = Handlebars.compile(tpl)
    return template
}


function getJsonData(classesUrl, curPage, template) {
    $.getJSON(classesUrl, { curPage: curPage }, function (data) {
        var data = data.data
        var html = template(data)
        $('#content').html(html)
    })
}