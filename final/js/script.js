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

    // 获取课程列表
    var classesUrl = 'http://imoocnote.calfnote.com/inter/getClasses.php'
    var tpl = $('#class-template').html()
    var template = Handlebars.compile(tpl)
    getJsonData(classesUrl, 1, template)
})(jQuery)


function getJsonData(classesUrl, curPage, template) {
    $.getJSON(classesUrl, { curPage: curPage }, function (data) {
        var pageCount = parseInt(data.totalCount)
        var current = parseInt(data.curPage)
        var data = data.data
        var html = template(data)
        $('#content').html(html)

        // 生成分页代码
        $(".tcdPageCode").createPage({
            pageCount: pageCount,
            current: current,
            backFn: function (p) {
                getJsonData(classesUrl, p, template)
            }
        })
    })
}