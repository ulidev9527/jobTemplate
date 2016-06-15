/*
 * 随机颜色值
 * return：#ffffff
 */
function _randomColor() {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
}

/*
 * 随机值
 * m:结尾值
 * n:初始值
 * randomNum(10,20);获取10到20的值
 * randomNum(10);获取0-10的值
 */
function _randomNum(m, n) {
    if (!n) {
        n = m;
        m = 0;
    }
    return Math.round(Math.random() * (n - m) + m);
}

/*
 * 随机字符串
 * _randomString()
 */
function _randomString(len) {
    len = len || 32;

    var
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        maxPos = $chars.length,
        pwd = '';

    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return pwd;
}


//是否是手机号
function _isPhone(val) {
    return /^1[3|4|5|7|8][0-9]\d{8}$/.test(val);
}

//是否是邮箱号
function _isEmail(val) {
    return /^[0-9a-z][a-z0-9\._-]{1,}@[a-z0-9-]{1,}[a-z0-9]\.[a-z\.]{1,}[a-z]$/.test(val)
}