function Portfolio( _opts ){
	'use strict';
	
	let self = this;
	
	self.opts = {
		parent: '.portfolio-page .container'
	};
	
	let init = function( _opts ){
		self.setOpts( _opts );
		prepare();
		events();
	};
	
	let prepare = function(){
		if ( $( self.opts.parent +' .columns' ).length > 0 ) {
			let cases = $( self.opts.parent +' .columns' ).html();
			
			$( self.opts.parent +' .columns' ).html('\
				<div class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"></div>\
				<div class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"></div>\
				<div class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"></div>\
			');
			
			self.append( cases );
		}
	};
	
	let events = function(){
		$(document).on('click', function(e){
			var me = $(e.target);
			
			if ( me.is( self.opts.parent +' .button' ) ) {
				if ( !me.hasClass('nomore') ) {
					self.more();
				}
			}
		});
	};
	
	init( _opts );
	return self;
}
Portfolio.prototype = {
	setOpts: function( _opts ){
		let self = this;
		
		if ( typeof _opts !== 'undefined' ) {
			if ( typeof _opts.parent !== 'undefined' ) self.opts.parent = _opts.parent;
		}
	},
	append: function( cases ){
		let self = this;
		
		let counter = $( self.opts.parent + ' .case' ).length;
		$( cases ).each(function(){
			let me = $(this);
			let column = counter++ % 3;
			
			$( self.opts.parent +' .columns .column' ).eq( column ).append( me );
		});
	},
	more: function(){
		let self = this;
		
		let data = {
			act: 'portfolio-more',
			already: $( self.opts.parent + ' .case' ).length
		};
		
		$.ajax({
			url: '/ajax',
			method: 'post',
			data: data
		}).done(function( response ){
			console.log('portfolio.class.js: success');
			console.log({
				data: data,
				response: response
			});
			
			try {
				let answer = JSON.parse( response );
				if ( typeof answer.success !== 'undefined' ) {
					if ( answer.data ) {
						self.append( answer.data );
					}
					else $( self.opts.parent +' .button' ).addClass('nomore');
				}
			}
			catch ( e ) {
				console.warn('portfolio.class.js: this.more() - JSON.parse() error');
				console.log({
					data: data,
					response: response
				});
			}
		}).fail(function( response ){
			console.warn('portfolio.class.js: this.more() - $.ajax() error');
			console.log({
				data: data,
				response: response
			});
		});
	}
};