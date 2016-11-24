/*!
 *  main.js文件里面内容需依赖其它插件
 *
 *  依赖中出现 #*** 代表的是页面标签id
 *
 */


/**
    微信分享[依赖：http://res.wx.qq.com/open/js/jweixin-1.0.0.js]

    //添加分享内容 *为必须
    _wx.run({
        debug: true||false false,
        appId: '',//*
        timestamp: '',//*
        nonceStr: '',//*
        signature: '',//*
        jsApiList:[] [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ]
    },{
        title:'',//分享标题*
        desc:'',//分享描述*
        imgUrl :'',//分享图片*
        link: '',//分享地址*
        success:function,//分享成功
        cancel:function //分享失败
    }});

*/
var _wx = (function () {
    //分享成功
    function shareSuccess() { }
    //分享失败
    function shareCancel() { }

    //微信权限配置
    function setConfig(wxData) {
        wxData = wxData ? wxData : {};
        var cfg = {
            debug: wxData.debug || false,
            appId: wxData.appId,
            timestamp: wxData.timestamp,
            nonceStr: wxData.nonceStr,
            signature: wxData.signature,
            jsApiList: wxData.jsApiList || [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
        }
        wx.config(cfg);
    }

    //微信文案配置
    function run(config, op) {
        setConfig(config);
        //标题
        var
            title = op.title,
            desc = op.desc,
            imgUrl = op.imgUrl,
            link = op.link;

        op.success ? shareSuccess = op.success : '';
        op.cancel ? shareCancel = op.cancel : '';

        wx.error(function (res) {
            console.log('微信配置错误。');
            console.log(res);
        });
        wx.ready(function () {
            var config = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: shareEnd,
                cancel: shareCancel
            }
            wx.onMenuShareQQ(config);
            wx.onMenuShareTimeline(config);
            wx.onMenuShareAppMessage(config);
            wx.onMenuShareWeibo(config);
            wx.onMenuShareQZone(config);
        });
    }

    function setShareSuccess(fn) {
        typeof fn == 'function' ? (shareSuccess = fn) : '';
    }
    function setShareCancel(fn) {
        typeof fn == 'function' ? (shareSuccess = fn) : '';
    }

    return {
        run: run,
        setShareSuccess: setShareSuccess,
        setShareCancel: setShareCancel
    }
})();



/**
 *
 * 页面弹窗（常用于手机浮窗）[依赖：1jquery-3.1.1.js、_tc-0.0.1.less、#__tc]
 * 说明：
 *
 * 显示弹窗
 * _tc.show('*选择器',true|false true);
 *
 * 隐藏弹窗
 * _tc.hide(null |function(){} null);
 *
 * loading加载
 * _tc.loading();
 * 
 *  
 */
var _tc = (function () {
    var fe = $('#__tc');
    fe.css({
        height: window.innerHeight,
        width: window.innerWidth
    });
    function show(sel, defaultSize) {
        var now = fe.children(sel);
        fe.addClass('active');
        fe.children().removeClass('active');
        now.addClass('active');
        now.find('[max-height]').each(function (i, e) {
            e = $(e);
            e.css({
                'height': innerHeight * .8 * parseInt(e.attr('max-height')) / 100,
                'overflow-y': 'auto'
            });
        })

        if (!defaultSize) {
            now.css({
                top: window.innerHeight / 2 - now.height() / 2,
                left: window.innerWidth / 2 - now.width() / 2 - parseInt(now.css('margin-left'))
            });
        }
    }

    function hide(fn) {
        fe.removeClass('active');
        fe.children().removeClass('active');
        typeof fn == 'function' ? window.setTimeout(function () {
            fn();
        }, 300) : '';
    }

    //加载
    function loading() {
        show('.loading');
    }

    fe.find('.close').click(hide);

    return {
        hide: hide,
        show: show,
        loading: loading
    }
})();