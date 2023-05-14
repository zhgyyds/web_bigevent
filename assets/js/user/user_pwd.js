$(function() {
    let form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            let val = $('[name=oldpwd]').val()
            if (value === val) {
                return '新旧密码不能相同'
            }
        },
        repwd: function(value) {
            if (value !== $('[name = newpwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                    // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})