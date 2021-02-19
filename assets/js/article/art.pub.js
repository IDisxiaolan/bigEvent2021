$(() => {
    const { form, layer } = layui
    let state;
    //1.0获取文章类别

    fenlei()

    function fenlei() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取文章类别列表失败')
                var str = template('tpl', res)
                $('#class').html(str)
                form.render()

            }
        })
    }
    //2.0富文本
    initEditor()

    // 3.0图片封面裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //3.1选择封面
    $('#fengmian').on('click', function() {

            $('[type=file]').click()
        })
        // 3.2监听change事件
    $('[type=file]').change(function(e) {
        var files = e.target.files
        if (files == 0) return
            // 拿到用户选择的文件,根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })


    // 4.0准备请求体（FormData 格式）：
    $('.last-row button').click(function() {
        state = $(this).attr('data-id')
    })
    $('#form-pub').submit(function(e) {
        e.preventDefault()
        var formData = new FormData($(this)[0])
        formData.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                formData.append('cover_img', blob)
                publish(formData)
            })

        // 5.0发布新文章


        function publish(formData) {
            $.ajax({
                method: 'post',
                url: '/my/article/add',
                data: formData,
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) return

                    location.href = '../../../article/art.list.html'
                }
            })
        }

    })
})