(function() {
    // window.onresize = function() {
    //     location.reload();
    // }

    function isMobile() {
        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) return true;
        return false;
    }

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    isMobile() ? isMobile = true : isMobile = false;
    isWeiXin() ? isWeiXin = true : isWeiXin = false;

    function _uct() {
        if (isMobile && !isWeiXin) {
            return 'wap';
        } else if (isMobile && isWeiXin) {
            return 'wx';
        } else {
            return 'web';
        }
    }
    $.ajax({
        url: lanh.apiHost + "/service/cms_api/get_version.html",
        dataType: "json",
        success: function(result) {
            if (result.status == 0 && result.data[_uct()] < 0) {
                window.location.href = "http://sjzz.ilhjy.cn/libjs/stauts.html";
            }
        }
    });
    var _client_type = isMobile ? "app" : "web", //如果是pc就是web，mobile就是app
        _session_sid = "",
        _client_version = "2.2";
    var _statVisit = function() {
        //统计日志数据收录接口
        $.post(lanh.apiHost + "service/shop_visit_logs/stat_visit.html?client_type=" + _client_type + "&client_version=" + _client_version + "&session_sid=" + _session_sid, JSON.stringify({
            "referer_url": document.referrer, //来源路径
            "access_url": window.location.href, //当前访问路径
            "app_type": 1
        }), function(result) {
            window.onbeforeunload = function() {
                $.ajax({
                    url: lanh.apiHost + "service/shop_visit_logs/visit_time.html?client_type=" + _client_type + "&client_version=" + _client_version + "&session_sid=" + _session_sid,
                    data: JSON.stringify({
                        "access_url": window.location.href, //当前访问路径
                        "app_type": 1
                    }),
                    dataType: "json",
                    async: false,
                    type: "POST",
                    success: function(result) {}
                });
            }
        }, "json");
    }
    $.ajax({
        url: lanh.apiHost + "service/home/service_init.html?client_type=" + _client_type,
        method: "GET",
        contentType: "applicaton/json",
        dataType: "json",
        async: false,
        success: function(result) {
            if (result.status == 0) {
                _session_sid = result.session_sid;
                _statVisit();
            }
        }
    });
})();