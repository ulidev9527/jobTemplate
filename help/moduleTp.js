/**
 * 模块编写模版
 */

/**
 * 第一部分：定义自己的模块
 */
const _tp = (function() {

    function hello() {
        console.log('hello');
    }


    return {
        hello: hello
    }

})();

/**
 * _tp.hello(); //hello
 */


/**
 * 第二部分: 处理函数，将自己的模块给一个接口
 * cmd、amd和直接调用
 *
 * 2017-07-26 已更新，取消cmd、amd和直接调用，仅使用cmd方式调用
 */

// typeof exports === 'object' && typeof module !== 'undefined' ?
//     module.exports = _tp :
//     typeof define === 'function' && define.amd ?
//     define(function() { return _tp; }) :
//     this._tp = _tp;
module.exports = _tp

/**
 * 第三部分：请查看 source/js/main.js 中引用`_wx`模块
 */