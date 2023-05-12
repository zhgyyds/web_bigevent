$(function() {
    getUserInfo()
    let layer = layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function(res) {

        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    let name = user.nickname || user.username
    let welcome = document.querySelector('#welcome')
    let pic = document.querySelectorAll('.layui-nav-img')
    let text = document.querySelectorAll('.text-avatar')
    welcome.innerHTML = `欢迎${name}`
    if (user.user_pic !== null) {
        pic.src = user.user_pic
        pic.style.diplay = 'block'
        text.style.diplay = 'none'
    } else {
        pic.style.diplay = 'none'
        let first = name[0].toUpperCase()
        text.innerHTML = first
        text.style.diplay = 'block'

    }

}