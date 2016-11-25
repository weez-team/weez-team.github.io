;(function($){
	"use strict";
	
	$(document).ready(function(){
	
		$('.scrollToContacts').on('click', function(e){
			e.preventDefault();
			
			$('body').stop().animate({
				scrollTop: $('#contacts').offset().top
			}, 500, 'swing');
		});

		$('.fancy').fancybox({
			prevEffect: 'none',
			nextEffect: 'none',
			closeBtn: false,
			helpers: {
				title: {
					type : 'inside'
				},
				buttons	: {}
			}
		});
	
		if ( typeof Form === 'function' ) {
			new Form({
				list: ['.contacts form', 'footer .subscribe', 'aside .search-form']
			});
		}
		if ( typeof Portfolio === 'function' ) {
			if ( $('.portfolio-page').length ) {
				new Portfolio({
					parent: '.portfolio-page .container'
				});
			}
			if ( $('.portfolio-mainpage').length ) {
				new Portfolio({
					parent: '.portfolio-mainpage .container'
				});
			}
		}
	
	});

})(jQuery);