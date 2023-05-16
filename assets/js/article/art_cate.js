$(function() {
    // initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                let htmoStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#btnAddCate').on('click', function(e) {
        let indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            ulr: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(e) {
                if (res.status !== 0) {
                    return layui.layer.msg('新增分类失败')
                }
                initArtCateList()
                layui.layer.msg('新增分类成功')
                layui.layer.close(indexAdd)
            }
        })
    })
})