const
//引用微信模块    
    _wx = require('./module/_wx');





//接口暴露给页面,不然页面使用 _wx 是没有这个函数的，如果页面不使用 _wx 可以不用暴露此函数.
window._wx = _wx;