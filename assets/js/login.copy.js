$(() => {
    const { form, layer } = layui
    $('#link_reg').click(function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').click(function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能为空'
        ],
        pwd: function(value) {
            const mima = $('#mima')
            if (value !== mima.val()) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单
    $('#register').on('submit', function(e) {
            e.preventDefault()
            $.post('/api/reguser', {
                    username: $('#register [name=username]').val(),
                    password: $('#register [name=password]').val()
                },
                function(res) {
                    if (res !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功，请登陆！')
                    $('#link_login').click()
                })
        })
        //监听登陆表单

    $('#login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
                url: '/api/login',
                method: 'post',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('登陆失败')
                    }
                    layer.msg('登陆成功')

                    localStorage.setItem('token', res.token)
                    location.href = '../../index.html'
                }
            }

        )
    })
})