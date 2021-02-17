$(() => {
    const { form, layer } = layui
    //1.0自定义昵称校验规则
    form.verify({
        nickname: function(val) {
            if (val.length > 6) {
                return '昵称长度必须在1到6个字符之间'
            }
        }
    })

    //2.0获取用户信息
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                } else {
                    //2.1lay-filter快速为表单赋值
                    form.val('formUserInfo', res.data)
                }
            }
        })
    }
    //3。0重置
    $('[type=reset]').on('click', function(e) {
            e.preventDefault()
            getUserInfo()
        })
        //4.0更新用户信息
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败')
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo() //window.parent.getUserInfo is not a function
            }
        })
    })
})