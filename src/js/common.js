;
(function () {
    var Unit = Unit || {};

    Unit.ui = {};

    Unit.ui.int = function () {
        this.fullScreen();
        this.collapse();
    }

    Unit.ui.fullScreen = function () {
        $('#j_full_switch').on('click', function () {
            $('.main-wrapper').addClass('full');
        });

        $('#j_drop_switch').on('click', function () {
            $('.main-wrapper').removeClass('full');
        });
    }

    Unit.ui.collapse = function () {
        $('.case-collapse').each(function (index, item) {
            $(item).find('.collapse-switch').on('click', function () {
                if ($(item).hasClass('open')) {
                    $(item).removeClass('open');
                    $(this).children('.text').text('Show');
                    $(this).children('.icon').removeClass('icon-down').addClass('icon-up');
                } else {
                    $(item).addClass('open');
                    $(this).children('.text').text('Hide');
                    $(this).children('.icon').removeClass('icon-up').addClass('icon-down');
                }
            })
        });
    }

    Unit.ui.realTimeCount = function (opened, online) {
        $('#js_total_opened').html(Unit.numberformat(opened));
        $('#js_online_members').html(Unit.numberformat(online));
    }

    Unit.ui.dropSkins = function () {

    }

    Unit.numberformat = function (val) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
            val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        return val;
    }

    Unit.colorRgb = function (sHex) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sHex.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }

            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange.join(",");
        } else {
            return sColor;
        }
    }

    Unit.preloaderImg = function (options) {
        var defaults = {
            url: '/',
            imgs: null
        }
        var opts = $.extend({}, defaults, options);

        var images = [];
        for (i = 0; i < opts.imgs.length; i++) {
			images[i] = new Image()
			images[i].src = opts.url + opts.imgs[i]
		}
    }

    window.Unit = Unit;

})(jQuery);

Unit.ui.int();

function numberformat(val){
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}

(function ($) {
    // Drop Skins
    $.fn.dropMarquee = function (options) {
        var defaults = {};
        var opts = $.extend({}, defaults, options);
        var $marquee = $(this);
        var $element = $marquee;
        var scrollH =  $element.height();
        var listView = null;
        var kidheight = 80;
    
        this.creat = function(data){
            if (data.length <= 0) return;
            var $listViews = $element.find('.list-view');
            var listViewCount = $listViews.length;

            if(listViewCount > 25){
                var length = listViewCount - 10;
                while (length > 0) {
                    length--;
                    $($listViews[length]).remove();
                }
                scrollH = kidheight * $element.find('.boxs-live').length;
            }

            var kidsCount = data.length;
            var boxsNew = '';
            $.each(data, function (key, item) {
                item.quality_color = item.quality_color ? item.quality_color : "317aff";
                var sHex = '#' + item.quality_color;
                var sRgbColor = Unit.colorRgb(sHex);
                var bgStyle = 'background-image: -moz-linear-gradient( 0deg, rgba('+sRgbColor+' , 0.2) 0%, rgb(24, 34, 61) 35%, rgb(24, 34, 61) 100%); background-image: -webkit-linear-gradient( 0deg, rgba('+sRgbColor+' , 0.2) 0%, rgb(24, 34, 61) 35%, rgb(24, 34, 61) 100%); background-image: -ms-linear-gradient( 0deg, rgba('+sRgbColor+' , 0.2) 0%, rgb(24, 34, 61) 35%, rgb(24, 34, 61) 100%);'
                
                boxsNew += '<li class="boxs-live boxs-live-new" style="' + bgStyle + '" >' +
                    '<a href="/profile/' + item.steamid + '">' +
                        '<div class="boxs-live-skins">' +
                            '<div class="boxs-live-skins-l">' + item.item_name + '</div>' +
                            '<div class="boxs-live-skins-r">' +
                            '<img src=" ' + item.image + '" alt="">' +
                            '</div>' +
                        '</div>' +
                        '<div class="boxs-live-case">' +
                            '<div class="boxs-live-case-l">' +
                                '<img class="head" src="./images/dev/head.png" alt="">' +
                                '<span class="nkname">' + item.item_name + '</span>' +
                            '</div>' +
                            '<div class="boxs-live-case-r">' +
                                '<span class="case-name">' + item.customer_name + '</span>' +
                                '<div style="background: url(./images/dev/case_230x208.png) right center no-repeat; background-size: 120px auto;" class="case-img"></div>' +
                            '</div>' +
                        '</div>' +
                    '</a>' +
                    '</li>';
            });

            boxsNew = '<ul class="boxs-live-list clearfix">' + boxsNew + '</ul>';
            var listView =  $('<div class="list-view"></div>');
            var kidsheight = data.length * kidheight;
            listView.html(boxsNew);
            listView.css({'height': '0px', 'transform': 'translate3d(0px, -' + kidsheight + 'px, 0px)'});
            listView.data('height', data.length * 250);

            scrollH += kidsheight;
            $element.children('.items-container').prepend(listView);
            $element.css({'height': scrollH + 'px', 'transition': 'transform 0.7s ease-out', 'transform': 'translate3d(0px, ' + kidsheight + 'px, 0px)'});

            setTimeout(function(){
                $element.css({'transition': 'none', 'transform': 'translate3d(0px, 0px, 0px)'});
                listView.css({'height': kidsheight + 'px', 'transform': 'translate3d(0px, 0px, 0px)'});
            }, 700);

        }
        return this;
    }

})(jQuery);

var marquee = $('#dropMarquee').dropMarquee();
var dataTest = [{
    "item_name": "R8 Revolver | Crimson Web (Well-Worn)",
    "image": "https:\/\/steamcommunity-a.akamaihd.net\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3eSR9-9m0h7-GkvP9JrbummpD78A_3rmXo42ijATh8hA9azz3I4PHclM_NQnX8wXsx7juhsO478-fyCQx7D5iuyhlLV5UlA",
    "customer_name": "Axcerty",
    "steamid": "76561198370947142",
    "avatar": "https:\/\/steamcdn-a.akamaihd.net\/steamcommunity\/public\/images\/avatars\/eb\/ebfb74f46188ab433eeaee23a9213f70933ed656.jpg",
    "quality_color": "4B69FF"
}, {
    "item_name": "P250 | Metallic DDPAT (Factory New)",
    "image": "https:\/\/steamcommunity-a.akamaihd.net\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhh3szdYz9D4uO6nYeDg8j4MqnWkyUD7pN0jL2WrYis31e2-UtkZD-gIIeVdFVoaVHX_Fnox7281sK06cnP1zI97bNcM7TE",
    "customer_name": "ChroMaHuN  vreecase.com",
    "steamid": "76561198388496951",
    "avatar": "https:\/\/steamcdn-a.akamaihd.net\/steamcommunity\/public\/images\/avatars\/12\/12424301360aa0e50f2986b7eaf6f3ffd687f498.jpg",
    "quality_color": "5E98D9"
},{
    "item_name": "R8 Revolver | Crimson Web (Well-Worn)",
    "image": "https:\/\/steamcommunity-a.akamaihd.net\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3eSR9-9m0h7-GkvP9JrbummpD78A_3rmXo42ijATh8hA9azz3I4PHclM_NQnX8wXsx7juhsO478-fyCQx7D5iuyhlLV5UlA",
    "customer_name": "Axcerty",
    "steamid": "76561198370947142",
    "avatar": "https:\/\/steamcdn-a.akamaihd.net\/steamcommunity\/public\/images\/avatars\/eb\/ebfb74f46188ab433eeaee23a9213f70933ed656.jpg",
    "quality_color": "4B69FF"
},{
    "item_name": "AUG | Aristocrat (Minimal Wear)",
    "image": "https:\/\/steamcommunity-a.akamaihd.net\/economy\/image\/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFABz7PLddgJD_tWlgI-IhfbgDLfYkWNF18lwmO7Eu9il2ACwqRFuYzrzJ9KUIwQ_YQ6G8wC3yefpjcLo7p_MyCA37HR2tnnD30vglNIOKno",
    "customer_name": "veyr.a vreecase.com",
    "steamid": "76561198155596416",
    "avatar": "https:\/\/steamcdn-a.akamaihd.net\/steamcommunity\/public\/images\/avatars\/f0\/f08c6823e94082afb45abdf589d93eb8411e4a81.jpg",
    "quality_color": "8847FF"
}];

marquee.creat(dataTest);
setInterval(() => {
   marquee.creat(dataTest);
}, 2000)

/* Rect */
var Rect = function (p, rs, re, minw, maxw, sc, s, o, ao, imgUrl) {
    this.p = p;
    this.rs = rs;
    this.re = re;
    this.minw = minw;
    this.maxw = maxw;
    this.sc = sc;
    this.s = s;
    this.o = o;
    this.ao = ao;
    this.animation = null;
    this.imgUrl = imgUrl;
};

Rect.prototype = {
    constructor: Rect,
    render: function () {
        _this = this;
        _this.animation = setInterval(function () {
            var count = 4;
            for (var i = count - 1; i >= 0; i--) {
                _this.loop();
            }
        }, _this.sc);
    },

    loop: function () {
        _this = this;

        var degree = Math.random() * 360,
            h = (2 * Math.PI / 360) * degree;

        _this.x = Math.cos(h) * _this.rs;
        _this.y = -Math.sin(h) * _this.rs;

        var w = _this.minw + Math.floor(Math.random() * (_this.maxw - _this.minw));

        var light = $('<img class="light" src="' + _this.imgUrl + 'light1.png" alt="">');
        light.css({
            'width': w + 'px',
            'left': _this.x + 'px',
            'top': _this.y + 'px',
            'transform': "rotate(" + -degree + "deg)",
            'opacity': _this.o
        });

        $(_this.p).append(light);

        var re = Math.random() * (_this.re - _this.rs) + _this.rs;

        _this.x = Math.cos(h) * re;
        _this.y = -Math.sin(h) * re;

        light.animate({
            left: _this.x + 'px',
            top: _this.y + 'px',
            opacity: _this.ao
        }, _this.s, function () {
            light.remove();
        });
    },

    stop: function () {
        _this = this;
        window.clearInterval(_this.animation);
    }

}

/* bootstrap dropdown */
;
(function ($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();
    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function (options) {

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

        return this.each(function () {
            var $this = $(this).parent(),
                defaults = {
                    delay: 300,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                options = $.extend(true, {}, defaults, options, data),
                timeout;

            $this.hover(function () {
                if (options.instantlyCloseOthers === true)
                    $allDropdowns.removeClass('open');

                window.clearTimeout(timeout);
                $(this).addClass('open');
            }, function () {
                timeout = window.setTimeout(function () {
                    $this.removeClass('open');
                }, options.delay);
            });
        });
    };

    $('[data-hover="dropdown"]').dropdownHover();
})(jQuery, this);