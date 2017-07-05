/**
 * 微信方面的js模块
 * [依赖：//res.wx.qq.com/open/js/jweixin-1.2.0.js]
 * 微信文档：//mp.weixin.qq.com/wiki
 *
 * @author zoeDylan
 * @time 2017-06-21
 *
 * 方法：
 *  1. _wx.init(config,op); //模块初始化，必须调用次方法才能其它操作
 *  2. _wx.setShareConfig(op); //设置分享信息
 *  3. _wx.setShareCancel(fn); //设置分享取消的事件
 *  4. _wx.setShareSuccess(fn); //设置分享成功的事件
 */

var _wx = (() => {
    let
    //分享成功和分享取消
        shareSuccess, shareCancel,
        //是否授权
        isAuthorization = null,
        //分享信息保存
        _op = {
            shareCancel: function() {},
            shareSuccess: function() {}
        };

    //微信权限配置/微信授权
    function setAuthorization(wxData) {
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
        };
        wx.config(cfg);
    }

    /**
     * 微信初始化
     * @param {*object} config 微信权限数据
     * @param {*object} op 微信分享文案
     */

    function init(config, op) {

        wx.error((res) => {
            isAuthorization = false;
            console.log('微信配置错误。', res);
        });
        wx.ready(() => {
            isAuthorization = true;
            setShareConfig(op);
        });
        setAuthorization(config);
    }

    /**
     * 微信文案分享配置
     * @param {*object} op 微信分享内容
     *  op:{
     *      title:分享标题,
     *      desc:分享描述,
     *      imgUrl:分享图片,
     *      link:分享地址
     * }
     */
    function setShareConfig(op) {
        if (isAuthorization) {
            //分享信息
            let
                title = op.title || _op.title,
                desc = op.desc || _op.desc,
                imgUrl = op.imgUrl || _op.imgUrl,
                link = op.link || _op.link;

            //两个事件
            shareSuccess = op.success ? op.success : _op.shareSuccess;
            shareCancel = op.cancel ? op.cancel : _op.shareCancel;

            let config = {
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: shareSuccess,
                cancel: shareCancel
            };
            _op = config;


            wx.onMenuShareQQ(config);
            wx.onMenuShareTimeline(config);
            wx.onMenuShareAppMessage(config);
            wx.onMenuShareWeibo(config);
            wx.onMenuShareQZone(config);
        }
    }

    //设置分享成功方法
    function setShareSuccess(fn) {
        typeof fn == 'function' ? (shareSuccess = fn) : '';
    }

    //设置分享取消方法
    function setShareCancel(fn) {
        typeof fn == 'function' ? (shareSuccess = fn) : '';
    }
    return {
        init: init,
        setShareConfig: setShareConfig,
        setShareSuccess: setShareSuccess,
        setShareCancel: setShareCancel
    }
})();


typeof exports === 'object' && typeof module !== 'undefined' ?
    module.exports = _wx :
    typeof define === 'function' && define.amd ?
    define(function() { return _wx; }) :
    this._wx = _wx;