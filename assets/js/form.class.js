function Form( _opts ){
	"use strict";
	
	var self = this;
	
	var files = {};
	
	var opts = {
		reset: true,
		list: [],
		before: function( e ){
			// before sending
		},
		after: function( e ){
			// after getting answer
		},
		success: function( e ){
			self.success( e.answer );
		},
		fail: function( e ){
			self.fail( e.answer );
		}
	};

	self.opts = function( _opts ){
		if ( typeof _opts !== 'undefined' ) {
			if ( typeof _opts.reset !== 'undefined' ) opts.reset = _opts.reset;
			if ( typeof _opts.list !== 'undefined' ) opts.list = _opts.list;
			if ( typeof _opts.before === 'function' ) opts.before = _opts.before;
			if ( typeof _opts.after === 'function' ) opts.after = _opts.after;
			if ( typeof _opts.success === 'function' ) opts.success = _opts.success;
			if ( typeof _opts.fail === 'function' ) opts.fail = _opts.fail;
		}
	};
	
	var init = function( _opts ){
		self.opts( _opts );
		events();
	};

	var events = function(){
		
		$(document).on('change', function(e){
			var me = $(e.target);
			
			if ( me.is('input[type="file"]') ) {
				var form = me.closest('form');
				
				if ( isInList( form ) ) {
					files[ selector( me.closest('form') ) ] = e.target.files;
				}
			}
		});
		
		$(document).on('submit', function(e){
			var form = $(e.target);
			
			if ( isInList( form ) ) {
				e.preventDefault();
				
				var data = form.serialize();
				
				if ( form.find('input[type="file"]').length > 0 && typeof files[ selector( form ) ] !== 'undefined' && files[ selector( form ) ].length > 0 ) {
					var dataFiles = new FormData();
					$.each( files[ selector( form ) ], function( key, value ){
						dataFiles.append( key, value );
					});
					submit({
						type: 'files',
						form: form,
						data: dataFiles
					});
				}
				else {
					submit({
						form: form,
						data: data
					});
				}
			}
		});
	};
	
	self.success = function( data ){
		console.log('ajax success:');
		console.log( data );
	};
	
	self.fail = function( data ){
		console.log( data );
	};
	
	var isInList = function( form ){
		for ( var i = 0; i < opts.list.length; i++ ) {
			if ( form.is( opts.list[ i ] ) ) {
				return true;
			}
		}
		return false;
	};
	
	var selector = function( form ){
		for ( var i = 0; i < opts.list.length; i++ ) {
			if ( form.is( opts.list[ i ] ) ) {
				return opts.list[ i ];
			}
		}
	}
	
	var submit = function( o ){
		if ( typeof o.form === 'undefined' ) return false;
		if ( typeof o.data === 'undefined' ) return false;
		
		var form = o.form;
		var data = o.data;
		
		if ( typeof opts.before === 'function' ) {
			var result = opts.before({
				form: form,
				data: data,
				answer: undefined
			});
			if ( typeof result !== 'undefined' ) {
				if ( typeof result.data !== 'undefined' ) data = result.data;
				if ( typeof result.stop !== 'undefined' ) return false;
			}
		}
		
		switch ( o.type ) {
			case 'files':
				var url = form.attr('action') + '?form=' + encodeURIComponent( selector( form ) );
				var query = form.serialize();
				if ( query.length > 0 ) url += '&'+ query;
				
				$.ajax({
					type: form.attr('method'),
					url: url,
					data: data,
					cache: false,
					dataType: 'json',
					processData: false,
					contentType: false
				})
				.done(function( answer ) {
					if ( typeof answer.success !== 'undefined' ) {
						if ( opts.reset ) {
							form.trigger('reset');
						}
						if ( typeof opts.success === 'function' ) opts.success({
							form: form,
							data: data,
							answer: answer
						});
					}
					else if ( typeof answer.fail !== 'undefined' ) {
						console.warn('Form.fail: answer.fail');
						if ( typeof opts.fail === 'function' ) opts.fail({
							form: form,
							data: data,
							answer: answer
						});
					}
					else {
						console.warn('Form.fail: answer unexpected');
						if ( typeof opts.fail === 'function' ) opts.fail({
							form: form,
							data: data,
							answer: answer
						});
					}
				})
				.always(function( answer ) {
					if ( typeof opts.after === 'function' ) opts.after({
						form: form,
						data: data,
						answer: answer
					});
				})
				.fail(function( error ) {
					console.warn('Form.fail: ajax fail');
					if ( typeof opts.fail === 'function' ) opts.fail({
						form: form,
						data: data,
						answer: error
					});
				});
				break;
			default:
				$.ajax({
					type: form.attr('method'),
					url: form.attr('action'),
					data: data,
					cache: false
				})
				.done(function( response ) {
					try {
						let answer = JSON.parse( response );
						if ( typeof answer.success !== 'undefined' ) {
							if ( opts.reset ) {
								form.trigger('reset');
							}
							if ( typeof opts.success === 'function' ) opts.success({
								form: form,
								data: data,
								answer: answer
							});
						}
						else if ( typeof answer.fail !== 'undefined' ) {
							console.warn('Form.fail: answer.fail');
							if ( typeof opts.fail === 'function' ) opts.fail({
								form: form,
								data: data,
								answer: answer
							});
						}
						else {
							console.warn('Form.fail: answer unexpected');
							if ( typeof opts.fail === 'function' ) opts.fail({
								form: form,
								data: data,
								answer: answer
							});
						}
					}
					catch (error) {
						console.warn('Form.fail: JSON.parse() fail');
						console.log({
							response: response,
							error: error
						});
					}
				})
				.always(function( answer ) {
					if ( typeof opts.after === 'function' ) opts.after({
						form: form,
						data: data,
						answer: answer
					});
				})
				.fail(function( error ) {
					console.warn('Form.fail: ajax fail');
					if ( typeof opts.fail === 'function' ) opts.fail({
						form: form,
						data: data,
						answer: error
					});
				});
				break;
		}
	};
	
	init( _opts );
	return self;
}