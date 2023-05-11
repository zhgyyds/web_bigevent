let a_reg = document.querySelector('#link_reg')
let a_login = document.querySelector('#link_login')

let login_box = document.querySelector('.login-box')
let reg_box = document.querySelector('.reg-box')
a_reg.addEventListener('click', function() {
    login_box.style.display = 'none'
    reg_box.style.display = 'block'

})
a_login.addEventListener('click', function() {
    reg_box.style.display = 'none'
    login_box.style.display = 'block'

})

let form = layui.form
let layer = layui.layer
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function(value) {
        let pwd = document.querySelector('.reg-box [name = password]')
        if (pwd.value !== value) {
            return '两次密码不一致'
        }
    }
})

// 监听注册表单的提交事件
// let regForm = document.querySelector('#form_reg')
// regForm.addEventListener('submit', function(e) {
//     e.preventDefault()
//     let url = 'http://www.liulongbin.top:3007/api/reguser'
//     let dataObj = {
//         username: document.querySelector('.reg-box [name = username]').value,
//         password: document.querySelector('.reg-box [name = password]').value

//     }
//     axios.post(url, dataObj).then(function(res) {
//         if (res.status !== 0) {
//             return console.log(res.message);
//         }
//         console.log('注册成功');
//     })http://ajax.frontend.itheima.net/api/reguser
// })
$(function() {
    // $('#form_reg').on('submit', function(e) {
    //     e.preventDefault()
    //     $.post('http://www.liulongbin.top:3007/api/reguser', {
    //             username: $('#form_reg [name = username]').val(),
    //             password: $('#form_reg [name = password]').val()
    //         },
    //         function(res) {

    //             if (res.status !== 0) {
    //                 return console.log(res.message);
    //             }
    //             console.log('注册成功');

    //         })
    // })

    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功！', { icon: 6 });
            $('#link_login').click()
        })
    })

    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // 将登录成功得到的字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转页面
                location.href = '/index.html'
            }
        })
    })
})