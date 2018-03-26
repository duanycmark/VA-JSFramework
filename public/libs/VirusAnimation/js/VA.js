/**
 * VirusAnimation
 *
 * Created by duanyc
 *
 * Versions : 0.5.1
 *
 */
console.time('VirusAnimationJS RunTimer');

/**
 * PS： VirusAnimation文件夹内文件名字与位置不能改变
 * */

(function (window) {

    var
        location = window.location,

        document = window.document,

        VAjsUrl = document.currentScript.src,

        core_selector,

        core_version = '0.5.1',

        doc_root_ = document.documentElement,

        root_,

        $this,

        connectTag,

        loadingAnimationTimeout,

        VA = function (selector) {
            return new VA.fn.init(selector);
        };

    VA.fn = VA.prototype = {
        VA: core_version,
        constructor: VA,
        length: 1,
        init: function (selector) {
            core_selector = selector;
            root_ = $('body');
            this.origin = location.origin;
            this.callback = null;
            $this = this;
            if (selector) {
                if (selector.split('@').length > 0) this.stylesheet = true;
                this.selector = core_selector.split('@')[0];
            }
            if (typeof selector === 'string' || !selector) {
                return this;
            } else {
                return console.error(new Error('请在选择器 VA() 中，按照规则传参'));
            }
        },
        tool: {

            error: function (msg) {
                throw new Error(msg);
            },

            randomId: function () {
                return Math.floor(Math.random() * Date.now()).toString(36) +
                    (Date.now() * parseInt(Math.random() * 100)).toString(36);
            },

            checkFont: function () {
                const font = 'font-awesome';
                var ele = $('link'),
                    haveLink = false;
                ele.each(function () {
                    if ($(this).prop('href').indexOf(font) !== -1) haveLink = true;
                });
                if (haveLink === false) VA.fn.tool.error('请引入font-awesome.min.css');
            },

            checkElement: function (selector) {
                if (typeof selector[0] === 'string') {
                    if (typeof selector === 'string') {
                        if ($(selector).length > 0) {
                            $(selector).remove();
                        }
                    } else if (typeof selector === 'object') {
                        $.each(selector, function (i, e) {
                            if ($(e).length > 0) {
                                $(e).remove();
                            }
                        })
                    }
                } else {
                    return false;
                }
            },

            buildConnect: function (connectType, animationFileName) {
                var lock_ = false, id = V.fn.tool.randomId();
                const
                    arr = VAjsUrl.split('/'),
                    path = arr.slice(0, arr.length - 2);

                if (connectType === 'link') {

                    $.each($('[V-connect-link="' + animationFileName + '"]'), function () {
                        if ($(this).attr('v-connect-link') === animationFileName) lock_ = true;
                    });

                    if (lock_) {
                        return;
                    } else {
                        connectTag = "<link rel='stylesheet'" + "V-connect-link='" + animationFileName + "'" +
                            " href='" + path.join('/') + '/css/' + animationFileName + ".css?randomId=" + id + "'>";
                    }

                } else {
                    $.each($('[V-connect-script="' + animationFileName + '"]'), function () {
                        if ($(this).attr('V-connect-script') === animationFileName) lock_ = true;
                    });

                    if (lock_) {
                        return;
                    } else {
                        connectTag = "<script " + "V-connect-script='" + animationFileName + "'" +
                            " src='" + path.join('/') + '/dependent/' + connectType + '/' + animationFileName + ".js?randomId='" + id + ">";
                    }
                }

                $('head').append(connectTag);
            },

            elementRegister: function (e, fn) {
                if ($(e).length > 0) {
                    fn();
                } else {
                    return this;
                }
            },

            fullScroll: function (t, s) {
                var n = $('body');
                if (t === 'hide') {
                    n.bind('mousewheel', function () {
                        return false;
                    }).css('overflow', 'hidden');
                } else if (t === 'show') {
                    n.unbind('mousewheel').css('overflowY', s);
                }
            },

            initsvgTemplate: function (fileName, fn) {

                var currentDirArray = VAjsUrl.split('/'),
                    dir = currentDirArray.slice(0, currentDirArray.length - 2).join('/');

                $.get(dir + '/dependent/svgTemplate/' + fileName, function (data, status) {
                    status === 'success' ? status = true : status = false;
                    fn.apply(this, [data, status]);
                });

            },

            // TODO selector filter
            selectorFilter: function (selector, node) {

                console.log(selector);

                var stylesheet = selector.split('@')[1],
                    key = stylesheet.split(':')[0],
                    val = stylesheet.split(':')[1];

                node.css(key, val);

            }
        },

        /**
         * @method: VA(parentElement).loadingAnimation()
         * */
        loadingAnimation: function (animationType, text) {
            var virusAnimationBox, boxCenter, boxLod, loadingText, $body;
            const typeCheck = [
                'rotate',
                'scale',
                'circleScale',
                'canvasLoading',
                'svg',
                'svg-1',
                'svg-2',
                'svg-3',
                'svg-4',
                'svg-5',
                'svg-6',
                'svg-7',
                'svg-8'
            ];

            VA.fn.tool.checkElement("div[VA-initBox='loading']");
            if (VA.fn.tool.checkFont() === false) VA.fn.tool.error('请加载font-awesome字体，然后重试');

            $(window).keypress(function (event) {
                if (event.which === 88 && event.shiftKey) VA().hideAnimation();
            });

            if (!text) text = '';
            if (text && text.length > 12) text = text.substr(0, 11) + ' ...';

            $body = $('body');
            $body.attr('VA-scrollType', $body.css('overflowY'));
            V.fn.tool.fullScroll('hide');

            loadingAnimationTimeout = setTimeout(function () {
                if ($('div[VA-initBox="loading"]').css('display') === 'block') {
                    VA().hideAnimation();
                    VA().prompt('请求服务器长时间无反应，或超时');
                    clearTimeout(loadingAnimationTimeout);
                }
            }, 60000);

            if (typeCheck.indexOf(animationType) === -1) return VA.fn.tool.error('Check your animationType');

            if (animationType === 'rotate') {

                virusAnimationBox = document.createElement('div');
                boxCenter = document.createElement('div');
                boxLod = document.createElement('div');

                var transform = document.createElement('i');
                loadingText = document.createElement('span');

                $(virusAnimationBox).addClass('loading_initBox').attr('VA-initBox', 'loading');
                $(virusAnimationBox).append(
                    $(boxCenter).addClass('loading_content').append($(boxLod).addClass('loading_initBox_lod'))
                );

                $(boxLod).append($(transform).addClass('fa fa-spinner'));

                $(boxLod).append($(loadingText).html(text));
                $(this.selector).append(virusAnimationBox);

            }

            else if (animationType === 'scale') {

                virusAnimationBox = document.createElement('div');
                boxCenter = document.createElement('div');
                boxLod = document.createElement('div');

                var transformCircle = document.createElement('div');
                loadingText = document.createElement('span');

                $(virusAnimationBox).addClass('loading_initBox').attr('VA-initBox', 'loading');
                $(virusAnimationBox).append(
                    $(boxCenter).addClass('loading_content').append($(boxLod).addClass('loading_initBox_lod'))
                );

                $(boxLod).append(
                    $(transformCircle).clone().addClass('loading_initBox_circle circle_1'),
                    $(transformCircle).clone().addClass('loading_initBox_circle circle_2'),
                    $(transformCircle).clone().addClass('loading_initBox_circle circle_1'),
                    $(loadingText).html(text)
                );

                $(this.selector).append(virusAnimationBox);

            }

            else if (animationType === 'circleScale') {

                virusAnimationBox = document.createElement('div');
                boxCenter = document.createElement('div');
                boxLod = document.createElement('div');

                var loadingCircle = document.createElement('div');
                loadingText = document.createElement('span');

                $(virusAnimationBox).addClass('loading_initBox').attr('VA-initBox', 'loading');
                $(virusAnimationBox).append(
                    $(boxCenter).addClass('loading_content').append($(boxLod).addClass('loading_initBox_lod_cs'))
                );

                $(boxLod).append(
                    $('<div class="loading_position"></div>').append($(loadingCircle).clone().addClass('loading_circle'))
                );

                $(boxLod).children().append($(loadingCircle).clone().addClass('loading_circle'));
                //暂时不考虑这个动画加入文字
                // $(boxLod).children().append($(loadingText).html(text));
                $(boxLod).children().append($(loadingText));

                $(this.selector).append(virusAnimationBox);

            }

            else if (animationType === 'canvasLoading') {
                var M = Math,
                    PI = M.PI,
                    TWOPI = PI * 2,
                    HALFPI = PI / 2,
                    canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    width = canvas.width = 350,
                    height = canvas.height = 350,
                    cx = width / 2,
                    cy = height / 2,
                    count = 40,
                    sizeBase = 0.1,
                    sizeDiv = 5,
                    tick = 0;
                ctx.translate(cx, cy);

                (function loop() {
                    requestAnimationFrame(loop);
                    ctx.clearRect(-width / 2, -height / 2, width, height);
                    ctx.fillStyle = '#fff';
                    var angle = tick / 8,
                        radius = -50 + M.sin(tick / 15) * 100,
                        size;

                    for (var i = 0; i < count; i++) {
                        angle += PI / 64;
                        radius += i / 30;
                        size = sizeBase + i / sizeDiv;

                        ctx.beginPath();
                        ctx.arc(M.cos(angle) * radius, M.sin(angle) * radius, size, 0, TWOPI, false);
                        ctx.fillStyle = 'rgba(248, 97, 72, 0.8)';
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(M.cos(angle) * -radius, M.sin(angle) * -radius, size, 0, TWOPI, false);
                        ctx.fillStyle = 'rgba(38, 189, 209, 0.8)';
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(M.cos(angle + HALFPI) * radius, M.sin(angle + HALFPI) * radius, size, 0, TWOPI, false);
                        ctx.fillStyle = 'rgba(89, 109, 192, 0.8)';
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(M.cos(angle + HALFPI) * -radius, M.sin(angle + HALFPI) * -radius, size, 0, TWOPI);
                        ctx.fillStyle = 'rgba(101, 55, 129, 0.8)';
                        ctx.fill();
                    }
                    tick++;
                })();

                if (text === '' || text === undefined) text = null;

                virusAnimationBox = document.createElement('div');
                boxCenter = document.createElement('div');
                boxLod = document.createElement('div');

                $(virusAnimationBox).addClass('loading_initBox').attr('VA-initBox', 'loading');
                $(virusAnimationBox).append(
                    $(boxCenter).addClass('loading_content').append($(boxLod).addClass('loading_initBox_lod'))
                );

                $(boxLod).append($(canvas));

                $(this.selector).append(virusAnimationBox);

            }

            else if (animationType.indexOf('svg') !== 1) {
                var svg;

                virusAnimationBox = document.createElement('div');
                boxCenter = document.createElement('div');
                boxLod = document.createElement('div');

                V.fn.tool.initsvgTemplate(animationType + '.ejs', function (data, status) {
                    if (status) {
                        svg = data;

                        $(virusAnimationBox).addClass('loading_initBox').attr('VA-initBox', 'loading');
                        $(virusAnimationBox).append(
                            $(boxCenter).addClass('loading_content').append($(boxLod).addClass('loading_initBox_lod'))
                        );

                        $(boxLod).append(svg);

                        var $svg = $(boxLod).find('svg');
                        // style
                        if (text) {

                            $svg.width(text.width).height(text.height);

                            if (animationType.split('-').length >= 2) {

                                if (
                                    animationType.split('-') === 1 ||
                                    animationType.split('-') === 2 ||
                                    animationType.split('-') === 3
                                ) {
                                    $svg.find('path').css('stroke', text.color);
                                } else {
                                    $svg.find('rect').css('fill', text.color);
                                }

                            } else {
                                $svg.find('circle').css('stroke', text.color);
                            }

                        } else {
                            $svg.find('svg').width(80).height(80);
                        }

                    } else {
                        V.fn.tool.error('加载SVG文件出错');
                    }
                });

                $(this.selector).append(virusAnimationBox);

            }

            if (this.stylesheet) {
                V.fn.tool.selectorFilter(core_selector, $(boxCenter));
            }
        },

        /**
         * @method: VA().hideLoadingBox
         * */
        hideAnimation: function () {
            const loadingBox = $('[VA-initBox="loading"]');

            if (loadingBox.length === 0) return VA.fn.tool.error('请先加载动画再清除动画');

            clearTimeout(loadingAnimationTimeout);

            loadingBox.fadeOut(function () {
                $(this).remove();
            });

            V.fn.tool.fullScroll('show', $('body').attr('VA-scrollType'));

            $('.loading_initBox_lod').remove();
        },

        /**
         * @method: VA().prompt
         * */
        prompt: function (text) {
            var
                allPrompt = $('div[VA-initBox=prompt]'),
                promptBox = document.createElement('div'),
                promptTitle = document.createElement('span'),
                promptContent = document.createElement('p');

            $(promptBox).addClass('VA_prompting_box')
                .append($(promptTitle).addClass('VA_prompting_title'), $(promptContent).addClass('VA_prompting_content'));
            $(promptBox).attr('VA-initBox', 'prompt');
            $(promptTitle).html('提示');
            $(promptContent).html(text);

            if (this.selector === '' || this.selector === undefined) this.selector = 'body';
            $(this.selector).append($(promptBox));
            $(promptBox).fadeIn('slow');
            $(promptBox).css('top', '15px');

            function promptHideAnimation(ele) {
                const currentNode = $(ele);
                setTimeout(() => {
                    currentNode.animate({
                        // top: '800px'
                        // transform:'translateY(800px)'
                    }, 1234, () => {
                        currentNode.css('transform', 'scale(0.1) translateX(1200px)');
                        currentNode.fadeOut('slow');
                        setTimeout(() => {
                            currentNode.remove();
                        }, 700);
                    });

                }, 3000)
            }

            if (allPrompt.length === 0) {
                $(promptBox).animate({
                    top: '15px',
                    right: 0
                }, 'fast', function () {
                    promptHideAnimation(this);
                });
            } else {
                var gatherNum = 15;
                allPrompt.each(function () {
                    gatherNum += $(this)[0].offsetHeight + 15;
                });

                $(promptBox).animate({
                    top: gatherNum + 'px',
                    right: 0
                }, 'fast', function () {
                    promptHideAnimation(this);
                });
            }
        },

        /**
         * @method: VA().alertModal()
         * */
        alertModal: function (selector, successCallback, errorCallback) {
            var
                txt = selector, backdrop, modal, dialog, title, content, footer, btn, $body, s;
            $body = $('body');
            s = $body.css('overflowY');
            V.fn.tool.checkElement(['[V-modal="temporary"]', '.alertModal_backdrop']);
            V.fn.tool.fullScroll('hide');

            backdrop = $('<div class="alertModal_backdrop"></div>');
            modal = $('<div class="VA_modal" V-modal="temporary"></div>');
            dialog = $('<div class="VA_dialog" VA-modal-id="V_temporary"></div>');
            title = $('<div class="VA_modal_title"></div>');
            content = $('<div class="VA_modal_content"></div>');
            footer = $('<div class="VA_modal_footer"></div>');
            btn = $('<button class="VA_btn"></button>');

            function VA_modal_hide(type) {
                if (type === 'V_temporary') {
                    backdrop.fadeOut().css('opacity', 0);

                    $('div[V-modal="temporary"]').css('transform', 'translateY(-1000px)');

                    const alertModalTimeout = setInterval(function () {
                        V.fn.tool.checkElement(['[V-modal="temporary"]', '.alertModal_backdrop']);
                        clearInterval(alertModalTimeout);
                    }, 770);

                } else {
                    backdrop.fadeOut().css('opacity', 0);
                    $(type).css('transform', 'translateY(-1000px)');
                    const backdropInterval = setInterval(function () {
                        if (backdrop.css('display') === 'none') {
                            backdrop.remove();
                            $(type).parent().hide();
                            clearInterval(backdropInterval);
                        }
                    }, 100);
                    backdrop.remove();
                }
                V.fn.tool.fullScroll('show', s);
            }

            function VA_modal_clickRegister(type) {
                var cancel = $('[VA-modal-btn="cancel"]'),
                    confirm = $('[ VA-modal-btn="confirm"]'),
                    modal = $('div[V-modal="temporary"]');
                cancel.unbind();
                confirm.unbind();
                modal.unbind();
                $(type).unbind();

                cancel.click(function () {
                    VA_modal_hide(type);
                    errorCallback.apply($this);
                });

                confirm.click(function () {
                    VA_modal_hide(type);
                    successCallback.apply($this);
                });

                if (type === 'V_temporary') {
                    modal.click(function (ev) {
                        if (ev.target === this) VA_modal_hide(type);
                    });
                } else {
                    $('.VA_modal').click(function (ev) {
                        if (ev.target === this) VA_modal_hide(type);
                    })
                }

            }

            if (typeof selector === 'string') {
                if (selector.charAt(0) === '#') {
                    selector = "div[VA-modal-id='" + selector.substr(1, selector.length) + "']";
                    if ($(selector).length === 0) V.fn.tool.error('未获取到当前元素ID，请重新输入');
                    $(selector).parent().show();
                    $(selector).parent().after(backdrop);
                    $(selector).fadeIn().css('transform', 'translateY(0px)');
                    $(selector).show().css('opacity', 1);
                    const alertModalTimeout = setInterval(function () {
                        var style, matrix;
                        const temporary = $(selector);
                        style = temporary.css('transform');
                        matrix = style.split(',');
                        if (matrix[matrix.length - 1].split(')')[0] * 1 === 0) {
                            VA_modal_clickRegister(selector);
                            clearInterval(alertModalTimeout);
                        }
                    }, 770);

                } else {
                    var
                        successBtn = btn.clone().attr('VA-modal-btn', 'confirm').html('确认'),
                        cancelBtn = btn.clone().attr('VA-modal-btn', 'cancel').html('取消');

                    title.append($('<div><i class="fa fa-exclamation"></i><span>提示</span></div>'))
                        .append($('<i class="fa fa-times" VA-modal-btn="cancel"></i>'));
                    content.append($('<span class="VA_modal_content_placeholder">' + txt + '</span>'));
                    footer.append($('<div class="VA_modal_btnGroups"></div>').append(cancelBtn).append(successBtn));

                    modal.append(dialog.append(title).append(content).append(footer));

                    $body.append(backdrop);
                    backdrop.before(modal);

                    //fadein
                    setTimeout(function () {
                        modal.show();
                        dialog.fadeIn();
                        backdrop.fadeIn();
                        dialog.css('transform', 'translateY(0)');
                    }, 10);
                    VA_modal_clickRegister('V_temporary');
                }
            } else {
                V.fn.tool.error('方法参数错误，输入ID或者需要创建模态框内的文字');
            }
            return $this;
        },

        /**
         * @method: VA().dropdown()
         * */
        dropdown: function (direction, callback) {
            var
                dropMenu, alertTimeOut, $_this, $_temporary;

            $_this = $(this.selector);
            dropMenu = $("[V-labelledby='" + this.selector + "']");

            if (this.selector === undefined || this.selector.charAt(0) !== '#')
                return V.fn.tool.error('请获取元素id后，再执行下拉框操作');

            if (direction === undefined) direction = 'down';

            if (typeof direction !== 'string') return V.fn.tool.error('请输入正确参数');

            function dropDownHide() {
                dropMenu.children('li:nth-child(odd)').css('transform', 'translateX(200px)');
                dropMenu.children('li:nth-child(even)').css('transform', 'translateX(-200px)');

                var hideTimeout = setTimeout(function () {
                    $_this.parent().removeClass('open');
                    dropMenu.hide();
                    $_this.find('span').css('transform', 'rotateX(180deg)');

                    clearTimeout(hideTimeout);
                }, 285);
            }

            if (dropMenu.css('display') === 'none') {

                $(this.selector).parent().addClass('open');
                dropMenu.prop('style', '');
                if (direction === 'down') {
                    dropMenu.css({
                        'left': 0,
                        'top': '100%'
                    })
                } else if (direction === 'up') {
                    dropMenu.css({
                        'left': 0,
                        'bottom': '100%'
                    });
                } else {
                    V.fn.tool.error('请输入正确参数');
                }

                dropMenu.show();
                $_this.find('span').css('transform', 'rotateX(360deg)');

                alertTimeOut = setTimeout(function () {
                    dropMenu.find('li').each(function () {
                        $(this).css('transform', 'translateX(0)');
                    });
                    root_.click(function (eve) {

                        dropDownHide();

                        $.each(dropMenu.find('li').children(), function (i, e) {
                            if (eve.target === e) {
                                $_this.html($(eve.target).html());
                                $_this.append($('<span class="caret"></span>'));

                                if ($(eve.target).data('jsonData') === undefined) {
                                    $_temporary = eve.target.innerText;
                                } else {
                                    $_temporary = $(eve.target).data('jsonData');
                                }
                                if (typeof callback === 'function') callback.apply($this, [$_temporary]);
                            }
                        });
                        root_.unbind();

                    });
                    clearTimeout(alertTimeOut);
                }, 1);

            } else if (dropMenu.css('display') === 'block') {
                dropDownHide();
            }
            return $this;
        },

        /**
         * @method: VA().search()
         * */
        search: function (data, callback) {

            V.fn.tool.buildConnect('autocomplete', 'jquery.autocomplete');

            var $_this, width, method, listDirection, maxHeight;

            $_this = $('input[V-searchInput=' + this.selector + ']');
            width = $_this.outerWidth();
            listDirection = $_this.attr('V-searchInput-listDirection');
            method = $_this.attr('V-searchInput-method');
            maxHeight = $_this.attr('V-searchInput-maxHeight');

            const divResize = setInterval(function () {
                if ($('.V_searchInput_prompt').length > 0) {
                    clearInterval(divResize);
                    $('.V_searchInput_prompt').css({
                        'max-height': maxHeight + 'px',
                        overflowY: 'auto'
                    });
                }
            }, 100);

            $_this.AutoComplete({
                data: data,
                width: width,
                emphasis: true,           // true  false
                async: true,             // true  false
                ajaxDataType: 'json',   // xml  json
                listDirection: listDirection, // up  down
                ajaxType: method,     // GET  POST
                afterSelectedHandler: function (data) {
                    if (typeof callback === 'function') {
                        $this.callback = data.value;
                        callback.apply($this, [data.value, data]);
                    }
                },
                emphasisHandler: function (keyword, data) {
                    var regex = new RegExp("(" + keyword.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") + ")", 'ig');
                    data.label = data.label.replace(regex, "<span class='V_searchInput_emphasis'>$1</span>");
                },
                onerror: function (msg) {
                    console.error(msg);
                }
            });

        },

        /**
         * @method: VA().loadBtn()
         * */

        loadBtn: function (type, color, text) {
            var
                $btn = $(this.selector),
                price = parseInt($btn.css('fontSize')) + 4,
                $svg;

            if (type) {

                if ($btn.find('.V_loadBtn').length === 0) {

                    if (text && text !== '' && typeof text === 'string') $btn.attr('V-copyHTML', $btn.html()).html(text);

                    V.fn.tool.initsvgTemplate('svg-2.ejs', function (data, status) {
                        if (status) {
                            $btn.prepend(data).prop('disabled', true).addClass('V_loadBtn')
                                .find('svg').css('width', price)
                                .find('path').css('fill', color);
                        } else {
                            V.fn.tool.error('加载svgTemplate出错');
                        }
                    });

                } else {
                    V.fn.tool.error('不要重复加载动画');
                }

            } else {

                $svg = $btn.find('svg');
                $svg.length === 1 ?
                    $svg.fadeOut('fast', function () {
                        $btn.prop('disabled', false);
                        $svg.remove();
                    }) : V.fn.tool.error('需要指定元素是否加载load动画，或元素未加载load动画');

                $btn.html($btn.attr('V-copyHTML')).attr('V-copyHTML', '');
            }

        },

        /**
         * @method: callback()
         * */
        then: function () {
            debugger;
        }

    };

    $(function () {

        //font
        V.fn.tool.checkFont();
        //module
        V.fn.tool.buildConnect('link', 'va_module_stylesheet');
        //animation
        V.fn.tool.buildConnect('link', 'va_base_animation_stylesheet');
        V.fn.tool.buildConnect('link', 'va_animation_rotate_style');
        V.fn.tool.buildConnect('link', 'va_animation_scale_style');
        V.fn.tool.buildConnect('link', 'va_animation_circleScale_style');

        /**
         * @method: class .VA_fullScreen
         * @use: fullScreen init
         * */
        V.fn.tool.elementRegister('.VA_fullScreen', function () {
            $('.VA_fullScreen').each(function () {
                $(this).click(function () {
                    if ($('body').attr('VA_fullScreen') === undefined || $('body').attr('VA_fullScreen') === 'false') {

                        $('body').attr('VA_fullScreen', true);
                        if (doc_root_.requestFullscreen) {
                            doc_root_.requestFullscreen();
                        } else if (doc_root_.mozRequestFullScreen) {
                            doc_root_.mozRequestFullScreen();
                        } else if (doc_root_.webkitRequestFullscreen) {
                            doc_root_.webkitRequestFullscreen();
                        } else if (doc_root_.msRequestFullscreen) {
                            doc_root_.msRequestFullscreen();
                        }

                    } else {
                        $('body').attr('VA_fullScreen', false);
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        }
                    }
                })
            });
        });

        /**
         * @method: fileInputRegister
         * */
        V.fn.tool.elementRegister('[V-fileInput="#image"]', function () {
            $('[V-fileInput="#image"]').each(function (i, e) {
                $(e).click(function () {
                    var id, file, reader;
                    id = $(e).attr('V-fileInput');

                    $(this).change(function (eve) {

                        file = eve.target.files[0];
                        reader = new FileReader();
                        reader.onload = function (e) {
                            $(id).prop('src', e.target.result);
                        };

                        reader.readAsDataURL(file);
                    })

                });
            });
        });

        /**
         * @method: deleteInputRegister
         * */
        V.fn.tool.elementRegister('[V-deleteInput]', function () {
            $('[V-deleteInput]').keyup(function () {
                var i = $('<i class="fa fa-times-circle-o V_delete_input"></i>'),
                    parent = $(this).parent(),
                    $i = parent.find('i'),
                    // const top = $(this).offset().top;
                    // const left = $(this).offset().left;
                    mathCount = parseInt($(this).outerHeight() / 3) * 2;

                parent.css('position', 'relative');

                i.css({
                    width: mathCount,
                    height: mathCount,
                    fontSize: mathCount
                });

                i.click(function () {
                    i.prev().val('');
                    $(this).hide();
                });

                if ($i.length > 0) {
                    if ($(this).val().length > 0) {
                        $i.show();
                    } else {
                        $i.hide();
                    }
                } else if ($i.length === 0) {
                    parent.append(i);
                    i.css({
                        top: `50%`,
                        right: '.5%',
                        marginTop: '-' + mathCount / 2 + 'px'
                    });
                    $(this).css('paddingRight', i.outerHeight() + 13);
                }

            });
        });

        $('head').prepend('<style type="text/css">.V_dropdown-menu{display:none;}</style>')

    });

    VA.fn.init.prototype = VA.fn;

    window.VA = window.V = VA;

}(window));

console.timeEnd('VirusAnimationJS RunTimer');