// Generated by CoffeeScript 1.11.1
(function($) {
  return $(document).ready((function(_this) {
    return function() {
      var form;
      $(document).on('click', function(e) {
        var me;
        me = $(e.target);
        if (me.is('.scrollToContacts')) {
          e.preventDefault();
          $('body').stop().animate({
            scrollTop: $('#contacts').offset().top
          }, 500, 'swing');
        }
      });
      $('.fancy').fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: false,
        helpers: {
          title: {
            type: 'inside'
          },
          buttons: {}
        }
      });
      form = new Form({
        list: ['.contacts form', 'footer .subscribe', 'aside .search-form']
      });
      if ($('.portfolio-page').length) {
        new Portfolio({
          parent: '.portfolio-page .container'
        });
      }
      if ($('.portfolio-mainpage').length) {
        new Portfolio({
          parent: '.portfolio-mainpage .container'
        });
      }
    };
  })(this));
})(jQuery);
