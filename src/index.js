$(document).ready(function () {

    // Extract the prefix needed for CSS stylings 
    function prefix() {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice
                .call(styles)
                .join('')
                .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
            )[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    }

    // 
    var _containerHeight = document.getElementsByClassName('bird-container')[0].offsetHeight;
    var _width, _height, _scrollHeight;
    var pre = prefix();
    var _jsPrefix = pre.lowercase;
    if (_jsPrefix == 'moz') _jsPrefix = 'Moz'
    var _cssPrefix = pre.css;
    var _movingElements = [];
    var _positions = [
        {
            name: 'intro_bird1',
            start: { percent: 0.55, x: -1, y: 0 },
            end: { percent: 1.5, x: 1, y: 0 },
            speed: .05,
        },
        {
            name: 'intro_bird2',
            start: { percent: 0.55, x: -1, y: 0 },
            end: { percent: 1.6, x: 1, y: 0 },
            speed: .08,
        },
        {
            name: 'intro_bird3',
            start: { percent: 0.55, x: -1, y: 0 },
            end: { percent: 1.2, x: 1, y: 0 },
            speed: .1,
        },
        {
            name: 'intro_bird4',
            start: { percent: 0.55, x: -1, y: 0 },
            end: { percent: 2.3, x: 1, y: 0 },
            speed: .12,
        },
        {
            name: 'intro_bird5',
            start: { percent: 0.55, x: -1, y: 0 },
            end: { percent: 2.1, x: 1, y: 0 },
            speed: .1,
        },
        {
            name: 'intro_bird6',
            start: { percent: 0.55, x: -1, y: 0 },
            end: { percent: 1.3, x: .8, y: 0 },
            speed: .05,
        },
        {
            name: 'intro_bird7',
            start: { percent: 0.55, x: -1, y: 0 },
            end: { percent: 1.3, x: 1, y: 0 },
            speed: .1,
        },
    ]

    //
    function initMovingElements() {
        for (var i = 0; i < _positions.length; i++) {
            _positions[i].diff = {
                percent: _positions[i].end.percent - _positions[i].start.percent,
                x: _positions[i].end.x - _positions[i].start.x,
                y: _positions[i].end.y - _positions[i].start.y,
            }
            var el = document.getElementsByClassName(_positions[i].name)[0];
            _movingElements.push(el);
        }
    }

    //
    function updateElements() {
        for (var i = 0; i < _movingElements.length; i++) {
            var p = _positions[i];
            if (_scrollPercent <= p.start.percent) {
                _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.start.x * _width) + 'px, ' + (p.start.y * _containerHeight) + 'px, 0px)';
            } else if (_scrollPercent >= p.end.percent) {
                _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.end.x * _width) + 'px, ' + (p.end.y * _containerHeight) + 'px, 0px)';
            } else {
                _movingElements[i].style[_jsPrefix + 'Transform'] = 'translate3d(' + (p.start.x * _width + (p.diff.x * (_scrollPercent - p.start.percent) / p.diff.percent * _width)) + 'px, ' +
                    (p.start.y * _containerHeight + (p.diff.y * (_scrollPercent - p.start.percent) / p.diff.percent * _containerHeight)) + 'px, 0px)';
            }
        }
    }

    //
    function loop() {
        _scrollOffset = window.pageYOffset || window.scrollTop;
        _scrollPercent = _scrollOffset / _scrollHeight || 0;
        updateElements();

        requestAnimationFrame(loop);
    }

    // 
    function resize() {
        _width = window.innerWidth;
        _height = window.innerHeight;
        _scrollHeight = _containerHeight - _height;
    }

    resize();
    initMovingElements();
    loop();
});
