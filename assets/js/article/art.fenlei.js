$(() => {
    var index = null
    var bianji = null
    const { form, layer } = layui

    //1.0获取文章分类
    fenlei()

    function fenlei() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取文章类别列表失败')
                const htmlStr = template('content', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //2.0添加类别点击事件
    $('#add').on('click', function() {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#tianjia').html(),
            area: ['500px', '300px']
        });

    })


    //3.0确认添加
    $('body').on('submit', '#formAdd', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {

                if (res.status !== 0) return layer.msg('添加文章类别失败')
                layer.msg('添加文章类别成功')
                fenlei()
                layer.close(index)
            }
        })
    })

    //4.0编辑
    $('tbody').on('click', '#bianji', function() {

        bianji = layer.open({
            type: 1,
            title: '编辑文章分类',
            content: $('#bianjiBtn').html(),
            area: ['500px', '300px']
        });
        const id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function(res) {

                if (res.status !== 0) return
                form.val('form-filter', res.data)
            }
        })
    })

    //5.0根据 Id 更新文章分类数据
    $('body').on('submit', '#formBianji', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('编辑失败')
                layer.msg('编辑成功')
                layer.close(bianji)
                fenlei()
            }
        })
    })

    //6.0删除
    $('tbody').on('click', '#shanchu', function() {
        const id = $(this).attr('data-id')

        //eg1
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除文章分类失败')
                    layer.msg('删除文章分类成功')
                    layer.close(index);
                    fenlei()
                }
            })

        });

    })
})