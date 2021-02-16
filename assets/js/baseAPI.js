$.ajaxPrefilter(function(options) {

    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //用户直接访问index是否登陆 
    options.complete = function(res) {
        if (res.responseJSON.status == 1) {
            localStorage.removeItem('token')
            location.href = "/login.copy.html"
        }
    }


})