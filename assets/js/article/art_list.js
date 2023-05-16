$(function() {
    let laypage = layui.laypage
        // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(data) {
        let dt = new Data(tata)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    function padZero(n) {
        return n > 9 ? n : `0${n}`

    }

    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            succcess: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                // 使用模板引擎渲染页面数据
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                    // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            succcess: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取数据失败')
                }
                // 调用模板引擎渲染分类的可选项
                let htmlStr = template('tpl-cate', res)
                $('[name = cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }

    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        let cate_id = $('[name = cate_id]').val()
        let state = $('[name = state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            limits: [2, 3, 4, 5],
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })

    }
    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        let len = $('.btn-delete').length
        let id = $(this).attr('data-Id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章失败')
                    }
                    layui.layer.msg('删除文章成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }

            })

            layer.close(index);
        })
    })
})