$(() => {
    const { form, layer } = layui
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(val) {
            if (val == $('#old').val()) return '新旧密码不能一致'
        },
        newOld: function(val) {
            if (val !== $('[name=newPwd]').val())
                return '两次密码不一致'
        }
    })
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新密码失败')
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})