$(() => {
    const { form, layer, laypage } = layui
    //1.0定义查询参数的对象
    var query = {
        pagenum: '1',
        pagesize: '2',
        cate_id: '',
        state: ''
    }
    getlist()
        //2.0获取文章的列表数据
    function getlist() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: query,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取文章列表失败')
                var htmlStr = template('table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    // 2.1时间过滤器

    template.defaults.imports.dateFormat = function(date) {

            return moment(date).format('YYYY-MM-DD hh:mm:ss')
        }
        //3.0文章分类
    fenlei()

    function fenlei() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取文章类别列表失败')
                var str = template('fenlei', res)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }

    //4.0筛选
    $('#shaixuan').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name="state]').val()
        query.cate_id = cate_id
        query.state = state
        getlist()
    })

    //5.0分页
    function renderPage(total) {
        layui.use('laypage', function() {

            //执行一个laypage实例
            laypage.render({
                elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                    ,
                count: total //数据总数，从服务端得到
                    ,
                limit: query.pagesize, //每分页显示几条数据
                curr: query.pagenum, //设置默认被选中的分页,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3, 5],
                jump: function(obj, first) {
                    query.pagenum = obj.curr
                    query.pagesize = obj.limit
                    if (!first) {

                        getlist()
                    }
                }
            });
        });
    }

    // 6.0删除
    $('tbody').on('click', '#del', function() {
        var len = $('#del').length

        var id = $(this).attr('data-id')
            //eg1
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) return
                    if (len == 1) {
                        query.pagenum = query.pagenum == 1 ? 1 : query.pagenum - 1
                    }
                    getlist()
                }
            })
            layer.close(index);
        });
    })
})