/**
 * 匿名立即执行函数避免变量污染
 *
 * 参数：exports 暴露接口,传入window全局变量
 *      undefined 无需传入,undefined即为undefined
 */
(function (exports, undefined) {
    'use strict';

    /**
     * @description 轮播图构造函数
     * @param el 对应DOM元素
     * @param opts 选项 选项有一个key-value对，key为intervalTime，value值为轮播间隔时间，单位ms；不传则默认间隔5000ms
     * @returns {ElemeSlider} 返回一个实例
     */
    var ElemeSlider = function (el, opts) {

        // 安全模式检查是否忘记使用new来创建实例，若忘记此时的this为window而不是创建的实例对象
        // 通过instanceof检查当前this是否为ElemeSlider的实例，若不是则修正，返回一个ElemeSlider的实例对象
        if (!(this instanceof ElemeSlider)) {
            return new ElemeSlider(el, opts);
        } else {
            this.el = el;
            this.opts = opts;
        }

    };


    var slideInterval;
    var _height;
    var _sliderImgEl = document.getElementById("slider-img");
    var _sliderNavEl = document.getElementById("slider-nav");
    var _sliderNavs = _sliderNavEl.getElementsByTagName("li");
    var _counts = _sliderImgEl.getElementsByTagName("li").length;
    var _count = 0;
    var _lastCount = 0;

    /**
     * @description 兼容浏览器的事件工具 参考JS高程P360
     * @type {{_addEventHandler: _EventUtil._addEventHandler, _getEvent: _EventUtil._getEvent, _getTarget: _EventUtil._getTarget}}
     * @private
     */
    var _EventUtil = {

        /**
         * @description 添加事件
         * @param element 要添加的对象
         * @param type 事件类型
         * @param handler 事件处理函数
         * @private
         */
        _addEventHandler: function (element, type, handler) {

            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },

        /**
         * @description 获取事件对象
         */
        _getEvent: function (event) {
            return event ? event : window.event;
        },

        /**
         * @description 获取事件触发的目标对象
         */
        _getTarget: function (event) {
            return event.target || event.srcElement;
        }

    };


    /**
     * @description 修改DOM节点class的封装函数
     * @type {{_addClassName: _classNameUtil._addClassName, _removeClassName: _classNameUtil._removeClassName}}
     * @private
     */
    var _classNameUtil = {
        _addClassName: function (el, toAddName) {
            var reg=new RegExp(toAddName,"g");
            // 正则检测是否已经有了这个class name，无则添加
            if (!el.className.match(reg)) {
                el.className += toAddName;
            }
        },
        _removeClassName: function (el, toRemoveName) {
            var reg=new RegExp(toRemoveName,"g");
            if (el.className) {
                // 正则匹配替换要删除的class name为空
                el.className = el.className.replace(reg, "");
            }
        }
    };

    /**
     * @description 改变样式
     * @private
     */
    function _change() {
        // 修改图片列表位置
        _sliderImgEl.style = "top: -" + _height*_count + "px";

        // 移除上一个样式并为当前的添加样式
        _classNameUtil._removeClassName(_sliderNavs[_lastCount], "active");
        _classNameUtil._addClassName(_sliderNavs[_count], "active");
        // 将当前的计数器保存为上一个值的计数器
        _lastCount = _count;
    }

    /**
     * @description 开始定时器
     * @private
     */
    function _start() {

        var that = this; // 保存this引用
        var _intervalTime = that.opts.intervalTime || 5000; // 若未传入间隔时间则默认间隔时间为5s

        slideInterval = setInterval(function () {

            // 判断当前计数是否到头，到头则重数，否则加一
            _count = ((_count + 1) >= _counts) ? (_count + 1 - _counts) : (_count + 1) ;

            _change();

        }, _intervalTime);
    }


    function _init() {

        var that = this; // 保存this引用

        _height = that.el.offsetHeight; // 获取对象的高度

        _start.call(that);


        //添加各种事件监听器

        _EventUtil._addEventHandler(_sliderNavEl, "mouseover", function (event) {
            clearInterval(slideInterval);
        });

        _EventUtil._addEventHandler(_sliderNavEl, "mouseout", function (event) {
            _start.call(that);
        });

        _EventUtil._addEventHandler(_sliderNavEl, "click", function (event) {
            event = _EventUtil._getEvent(event);
            var target = _EventUtil._getTarget(event);

            // 判断是否真的点到了li上
            if (target.nodeName.toLowerCase() === "li") {
                _count = parseInt(target.innerHTML, 10) - 1;
                _change.call(that);
            }

        });

    }


    ElemeSlider.prototype = {
        constructor: ElemeSlider, // 修正constructor指向
        init: _init
    };


    // 将ElemeSlider构造函数挂载到暴露的接口（window）上
    exports.ElemeSlider = ElemeSlider;

})(window);