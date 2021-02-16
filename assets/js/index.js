$(() => {
    const { from, layer } = layui
    getUserInfo()
        //1.0获取用户信息
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                    //2.1调用渲染头像,昵称函数
                renderAvatar(res.data)
            }
        })
    }

    //2.0渲染头像
    function renderAvatar(user) {
        //用户昵称
        const name = user.nickname || user.username
        $('#welcome').text('欢迎   ' + name)
            //用户头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
                //文字头像
            const first = name[0].toUpperCase()
            $('.text-avatar').text(first).show()

        }
    }

    //3.0退出
    $('#tuichu').on('click', function() {

        layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function(index) {
            //3.1清除token,并跳转到登陆页面
            localStorage.removeItem('token')
            location.href = "../../login.copy.html"

            layer.close(index);
        });
    })


})