/*!
 * JS函数扩展
 * 作者：zoeDylan
 * 描述：不依赖任何外包，纯js打造，主要内容是开发或收集网络上各种高性能、实用性高、兼容解决等JS功能，方便平时开发
 *
 * zoeDylan-0.0.1.js
 */

/*______________________________兼容处理 begin*/


/**
 *
 * requestAnimationFrame兼容
 *
 */
; (function () {
    let lastTime = 0;
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        let currTime = new Date().getTime();
        let timeToCall = Math.max(0, 16 - (currTime - lastTime));
        let id = window.setTimeout(() => {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
} ());


/**
 *
 * 去字符串首尾空格(高性能)
 *
*/
String.prototype.trim = function () {
    let str = this,
        whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (let i = 0, len = str.length; i < len; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (let i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

/*______________________________兼容处理 end*/

/*______________________________功能开发 begin*/

/** 
 * 获取随机数[无依赖]
 * 
 * _randomNum(min[,max[,decimal]])
 * 
 * min:最小值
 * max:最大值
 * dec:是否返回小数位数，最大返回10位小数
 * 
 * _randomNum(10,20);//获取10到20的随机整数
 * _randomNum(10);//获取0-10的随机整数
 * _randomNum(10,20,5);//获取10-20的随机5位小数
 *
 */
function _randomNum(min, max, dec) {
    dec = dec && dec > 10 ? 10 : dec || 0;
    if (typeof (max) == 'undefined') {
        max = min;
        min = 0;
    }
    return Number((Math.random() * (max - min) + min).toFixed(dec));
}

/** 
 * 获取随机字符串[依赖：_randomNum]
 * 
 * _randomString([length[,chars]])
 * 
 * 默认32位字符
 * length:返回字符串长度
 * chars:指定字符串
 * 
 * _randomString();//获取32位长度的随机字符串
 * _randomString(10);//获取10位长度的随机字符串
 * _randomString(10,'zoeDylan');//用zoeDylan生成10位长度的随机字符串
 * 
 */
function _randomString(length, chars) {
    length = length || 32;

    chars = chars || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let pwd = '';
    for (i = 0; i < length; i++) {
        pwd += chars.charAt(_randomNum(chars.length));
    }
    return pwd;
}

/** 
 * 获取随机颜色值[无依赖]
 *
 * _randomColor()
 *
 * _randomColor();//#XXXXXX(16进制)
 */
function _randomColor() {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
}

/** 
 * cookie处理，默认get、set、clear使用html5的localStorage,没有的情况下使用cookie
 * 
 */
const _cookie = (function () {
    let cookie = {};
    cookie.html5 = window.localStorage ? true : false;

    cookie.setCookie = function (name, cvalue, exdays) {
        let d = new Date();
        exdays = exdays || 100000;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    cookie.getCookie = function (name) {
        name = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
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
        let all = {};
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            c = c.split('=');
            all[c[0]] = c[1];
        }
        return all;
    }
    cookie.clearAllCookie = function () {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = keys.length; i--;)
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
            let all = {};
            for (let i = 0; i < window.localStorage.length; i++) {
                let nowK = window.localStorage.key(i);
                all[nowK] = window.localStorage.getItem(nowK);
            }
            return all;
        }
        cookie.clearAll = function () {
            for (let i = 0; i < window.localStorage.length; i++) {
                let nowK = window.localStorage.key(i);
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

/**
 * 是否是手机号[无依赖]
 */
function _isPhone(val) {
    return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val);
}

/**
 * 是否是邮箱号[无依赖]
 */
function _isEmail(val) {
    return /^[0-9a-z][a-z0-9\._-]{1,}@[a-z0-9-]{1,}[a-z0-9]\.[a-z\.]{1,}[a-z]$/.test(val)
}


/*______________________________功能开发 end*/