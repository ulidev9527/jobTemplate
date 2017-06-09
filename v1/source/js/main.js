/*!
 *  main.js文件里面内容需依赖其它插件
 *
 *  依赖中出现 #*** 代表的是页面标签id
 *
 */


/**
    微信分享[依赖：http://res.wx.qq.com/open/js/jweixin-1.0.0.js]

    //添加分享内容 *为必须
    _wx.config({
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
var _wx = (() => {
    //分享成功
    function shareSuccess() {}
    //分享失败
    function shareCancel() {}

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
    function config(config, op) {
        setConfig(config);
        //标题
        var
            title = op.title,
            desc = op.desc,
            imgUrl = op.imgUrl,
            link = op.link;

        op.success ? shareSuccess = op.success : '';
        op.cancel ? shareCancel = op.cancel : '';

        wx.error((res) => {
            console.log('微信配置错误。');
            console.log(res);
        });
        wx.ready(() => {
            let config = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: shareSuccess,
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
        config: config,
        setShareSuccess: setShareSuccess,
        setShareCancel: setShareCancel
    }
})();