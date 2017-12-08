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

    window.Unit = Unit;

})(jQuery);

Unit.ui.int();

// bootstrap dropdown
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