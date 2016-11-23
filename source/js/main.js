/**
    微信分享

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