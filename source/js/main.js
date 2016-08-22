/*
 * JS函数扩展
 * 作者：zoeDylan
 * 描述：收集网络上各种高性能、实用性高、兼容解决等JS功能，方便平时开发
 * 修改：2016-05-03 
 * ##更新说明：
 * 1. 添加_cookie函数
 * 2. 之前未添加下划线(`_`)的函数全部添加下划线(`_`)
 * 3. 去除`zoe`和`zoeDylan`的全局函数添加
 * 
 */


/*
 * 随机值
 * min:最小值
 * max:最大值
 * noInt:是否返回小数
 * randomNum(10,20);获取10到20的值
 * randomNum(10);获取0-10的值
 *
 */
function _randomNum(min, max, noInt) {
    if (typeof (max) == 'undefined') {
        max = min;
        min = 0;
    }
    return noInt ? Math.random() * (max - min) + min : parseInt(Math.random() * (max - min) + min);
}

/*
 * 随机字符串
 * 默认32位字符
 * len:返回字符串长度
 * char:指定字符串
 */
function _randomString(length, chars) {
    length = length || 32;

    chars = chars || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var pwd = '';
    for (i = 0; i < length; i++) {
        pwd += chars.charAt(randomNum(chars.length));
    }
    return pwd;
}

/*
 * 随机颜色值
 * 返回：#XXXXXX(16进制)
 */
function _randomColor() {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
}

/*
 * 去字符串首尾空格
 */
String.prototype.trim = function () {
    var str = this,
    whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (var i = 0, len = str.length; i < len; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

/*
 * cookie处理，默认get、set、clear使用html5的localStorage,没有的情况下使用cookie
 * 
 */
var _cookie = (function () {
    var cookie = {};
    cookie.html5 = window.localStorage ? true : false;



    cookie.setCookie = function (name, cvalue, exdays) {
        var d = new Date();
        exdays = exdays || 100000;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    cookie.getCookie = function (name) {
         name = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) != -1) {
                return c.substring(name.length, c.length)
            }
        }
        return null;
    }
    cookie.clearCookie = function (name) {
        setCookie(name, "", -1);
    }
    cookie.deleteCookie = cookie.clearCookie;
    cookie.getAllCookie = function () {
        var all = {};
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            c = c.split('=');
            all[c[0]] = c[1];
        }
        return all;
    }
    cookie.clearAllCookie = function () {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
    cookie.deleteAllCookie = cookie.clearAllCookie;

    if (cookie.html5) {
        cookie.set = function (name, val) {
            window.localStorage.setItem(name, val);
        }
        cookie.get = function (name) {
            return window.localStorage.getItem(name);
        }
        cookie.clear = function (name) {
            window.localStorage.removeItem(name);
        }
        cookie.delete = cookie.clear;
        cookie.getAll = function () {
            var all = {};
            for (var i = 0; i < window.localStorage.length; i++) {
                var nowK = window.localStorage.key(i);
                all[nowK] = window.localStorage.getItem(nowK);
            }
            return all;
        }
        cookie.clearAll = function () {
            for (var i = 0; i < window.localStorage.length; i++) {
                var nowK = window.localStorage.key(i);
                window.localStorage.removeItem(nowK);
            }
        }
        cookie.deleteAll = cookie.clearAll;
    } else {
        cookie.set = cookie.setCookie;
        cookie.get = cookie.getCookie;
        cookie.clear = cookie.clearCookie;
        cookie.delete = cookie.clear;
        cookie.getAll = cookie.getAllCookie;
        cookie.clearAll = cookie.clearAllCookie;
        cookie.deleteAll = cookie.clearAll;
    }

    return cookie;
})();

//是否是手机号
function _isPhone(val) {
    return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val);
}

//是否是邮箱号
function _isEmail(val) {
    return /^[0-9a-z][a-z0-9\._-]{1,}@[a-z0-9-]{1,}[a-z0-9]\.[a-z\.]{1,}[a-z]$/.test(val)
}