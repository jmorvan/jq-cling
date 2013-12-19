;
(function (defaults, $, window, document, undefined) {

    'use strict';

    $.extend({
        // Function to change the default properties of the plugin
        // Usage:
        // jQuery.pluginSetup({property:'Custom value'});
        clingSetup: function (options) {

            return $.extend(defaults, options);
        }
    }).fn.extend({
            // Usage:
            // jQuery(selector).pluginName({property:'value'});
            cling: function (options) {
                var self = $(this);
                options = $.extend({}, defaults, options);

                var el = $(this).first();

                if (!el || !el.length) return $(this);

                var bindClick = function() {
                    $(self).on('click', close);
                };

                var unbindClick = function() {
                    $(self).off('click', close);
                };

                var close = function () {
                    if (options.beforeClose || typeof options.beforeClose === "function") {
                        if (options.beforeClose(overlay, options)) {
                            overlay.hide();
                            close$.hide();
                            unbindClick();
                        }

                    }
                    else {
                        overlay.hide();
                        close$.hide();
                        unbindClick();
                    }
                };

                var open = function () {
                    if (options.beforeShow || typeof options.beforeShow === "function") {
                        if (options.beforeShow(overlay, options)){
                            overlay.show();
                            close$.show();
                            bindClick();
                        }
                    }
                    else {
                        overlay.show();
                        close$.show();
                        bindClick();
                    }
                };

                var o2c = function (c) {
                    if (!c) {
                        c = {};
                        console.warn("JQ-CLING WARNING: You passed an empty color object for one of the properties. One will be created for you!");
                    }
                    else if (!c.r || !c.g || !c.b || !c.a) {
                        console.warn("JQ-CLING WARNING: Color for one of the properties is missing some attribute. Defaults will apply!");
                    }

                    c.r = c.r || 0;
                    c.g = c.g || 0;
                    c.b = c.b || 0;
                    c.a = c.a || 1;

                    return  ' rgba(' + c.r + ',' + c.g + ', ' + c.b + ', ' + c.a + ') '
                }

                if (!options.titleColor) options.titleColor = options.radialColor;

                var overlay = $('#cling-overlay');

                if (!overlay.length) {
                    overlay = $('<div id="cling-overlay" style="background-color: transparent;">' +
                        '<div id="cling-title"></div>' +
                        '<div id="cling-desc"></div>' +
                        '</div>');
                    $('body').append(overlay);
                    overlay.hide();
                }

                var title$ = overlay.find('#cling-title').html(options.title);
                var descr$ = overlay.find('#cling-desc').html(options.description);

                var close$ = $('<div id="cling-close"></div>').html(options.closeText).click(function () {
                    close();
                });

                $('body').append(close$);
                close$.hide();

                var pos = el.offset();

                var bgX = pos.left,
                    bgY = pos.top,
                    bgRad = Math.max(el.height(), el.width());

                overlay.css(
                    {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        'background-image': '-webkit-radial-gradient(' + (bgX + (el.width() / 2)) + 'px ' + (bgY + (el.height() / 2)) + 'px, circle, transparent ' + bgRad + 'px, ' +
                            o2c(options.radialColor) + bgRad + 'px, ' +
                            o2c(options.overlayColor) + (bgRad + 30) + 'px,' +
                            o2c(options.radialColor) + (bgRad + 30) + 'px,' +
                            o2c(options.overlayColor) + (bgRad + 60) + 'px,' +
                            o2c(options.overlayColor) + ' 0)',
                        '-ms-filter': 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=overlay.png,  sizingMethod=scale)',
                        'pointer-events': 'none'
                    }
                );

                title$.css({
                    position: 'absolute',
                    top: bgY + (bgRad + 80),
                    left: (bgX + (bgRad)),
                    color: o2c(options.titleColor),
                    'font-size': "22px",
                    'font-weight': "bold"
                });

                descr$.css({
                    position: 'absolute',
                    top: bgY + (bgRad + 110),
                    left: (bgX + (bgRad)),
                    color: o2c(options.descriptionColor),
                    'font-size': "18px"
                });

                close$.css({
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: "10px",
                    'margin-right': "3%",
                    'margin-bottom': "3%",
                    color: "white",
                    'font-size': "1em",
                    'font-weight': "bold",
                    background: o2c(options.radialColor),
                    border: "1px solid lightgray",
                    cursor: "pointer"
                });

                open();


                return $(this);
            }
        });
})({
    title: "No title",
    description: "no description",
    closeText: "CLOSE",
    overlayColor: {r: 0, g: 0, b: 0, a: 0.5},
    radialColor: {r: 0, g: 255, b: 255, a: 1},
    titleColor: null,
    descriptionColor: {r: 255, g: 255, b: 255, a: 1}
}, jQuery, window, document);