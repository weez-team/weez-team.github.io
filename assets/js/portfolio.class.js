// Generated by CoffeeScript 1.11.1
var Portfolio;

Portfolio = (function() {
  function Portfolio(args) {
    this.opts = {
      parent: void 0
    };
    if (typeof args !== 'undefined') {
      if (typeof args.parent !== 'undefined') {
        this.opts.parent = args.parent;
      }
    }
    this.prepare();
    this.setEvents();
    return;
  }

  Portfolio.prototype.prepare = function() {
    var cases;
    if ($(this.opts.parent + ' .columns').length) {
      cases = $(this.opts.parent + ' .columns').children();
      $(this.opts.parent + ' .columns').html("<div class=\"column col-xs-12 col-sm-6 col-md-4 col-lg-4\"></div>\n<div class=\"column col-xs-12 col-sm-6 col-md-4 col-lg-4\"></div>\n<div class=\"column col-xs-12 col-sm-6 col-md-4 col-lg-4\"></div>");
      this.append(cases);
    }
  };

  Portfolio.prototype.setEvents = function() {
    $(document).on('click', (function(_this) {
      return function(e) {
        var me;
        me = $(e.target);
        if (me.is(_this.opts.parent + ' .button')) {
          if (!me.hasClass('nomore')) {
            return _this.more();
          }
        }
      };
    })(this));
  };

  Portfolio.prototype.append = function(cases) {
    var counter;
    counter = $(this.opts.parent + ' .case').length;
    $(cases).each((function(_this) {
      return function(index, element) {
        var column, me;
        me = $(element);
        column = counter++ % 3;
        $(_this.opts.parent + ' .columns .column').eq(column).append(me);
      };
    })(this));
  };

  Portfolio.prototype.more = function() {
    var data;
    data = {
      act: 'portfolio-more',
      already: $(this.opts.parent + ' .case').length
    };
    return $.ajax({
      url: '/ajax',
      method: 'post',
      data: data
    }).done((function(_this) {
      return function(response) {
        var answer, e;
        console.log('portfolio.class.js: success');
        console.log({
          data: data,
          response: response
        });
        try {
          answer = JSON.parse(response);
          if (typeof answer.success !== 'undefined') {
            if (answer.data) {
              return _this.append(answer.data);
            } else {
              return $(_this.opts.parent + ' .button').addClass('nomore');
            }
          }
        } catch (error) {
          e = error;
          console.warn('portfolio.class.js: this.more() - JSON.parse() error');
          return console.log({
            data: data,
            response: response
          });
        }
      };
    })(this)).fail((function(_this) {
      return function(response) {
        console.warn('portfolio.class.js: this.more() - $.ajax() error');
        return console.log({
          data: data,
          response: response
        });
      };
    })(this));
  };

  return Portfolio;

})();
