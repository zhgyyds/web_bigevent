$(function() {
    initCate()
    initEditor()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('失败')
                }
                let htmlStr = template('tpl-cate', res)
                $('[name = cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#btnChooseImage').on('click', function(e) {
        $('#coverfile').click()
    })
    $('#coverfile').on('change', function(e) {
        let files = e.target.files[0]
        if (files.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(files)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options)
    })
    let art_state = '已发布'
    $('#btnSave2').on('click', function(e) {
        e.preventDefault()
        art_state = '存为草稿'
    })
    $('#form-pub').on('submit', function(e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
            })
        fd.append('cover_img', blob)
    })

})