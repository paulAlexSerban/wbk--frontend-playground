/*
 *  Project: Scrolly : parallax is easy as a matter of fact !
 *  Description: Based on jQuery boilerplate
 *  Author: Victor C. / Octave & Octave web agency
 *  Licence: MIT
 */
!(function (root, factory) {
    factory(root.jQuery);
})(this, ($) => {
    // Create the defaults once
    const pluginName = 'scrolly';
    const defaults = {
        bgParallax: false,
    };
    // const didScroll = false;

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        const self = this;
        this.startPosition = this.$element.position().top;
        this.offsetTop = this.$element.offset().top;
        this.height = this.$element.outerHeight(true);
        this.velocity = this.$element.attr('data-velocity');
        this.bgStart = parseInt(this.$element.attr('data-fit'), 10);

        $(document).scroll(() => {
            self.didScroll = true;
        });

        setInterval(() => {
            if (self.didScroll) {
                self.didScroll = false;
                self.scrolly();
            }
        }, 10);
    };

    Plugin.prototype.scrolly = function () {
        const dT = $(window).scrollTop();
        const wH = $(window).height();
        let position = this.startPosition;

        if (this.offsetTop >= dT + wH) {
            this.$element.addClass('scrolly-invisible');
        } else {
            if (this.$element.hasClass('scrolly-invisible')) {
                position = this.startPosition + (dT + (wH - this.offsetTop)) * this.velocity;
            } else {
                position = this.startPosition + dT * this.velocity;
            }
        }
        // Fix background position
        if (this.bgStart) {
            position = position + this.bgStart;
        }

        if (this.options.bgParallax === true) {
            this.$element.css({ backgroundPosition: '50% ' + position + 'px' });
        } else {
            this.$element.css({ top: position });
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
});
