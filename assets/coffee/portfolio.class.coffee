class Portfolio
	constructor: ( args )->
		@opts =
			parent: undefined

		if typeof args isnt 'undefined'
			if typeof args.parent isnt 'undefined' then @opts.parent = args.parent

		@prepare()
		@setEvents()
		return

	prepare: ->
		if $( @opts.parent + ' .columns' ).length
			cases = $( @opts.parent + ' .columns' ).children()

			$( @opts.parent + ' .columns' ).html """
				<div class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"></div>
				<div class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"></div>
				<div class="column col-xs-12 col-sm-6 col-md-4 col-lg-4"></div>
			"""
			
			@append cases
		return

	setEvents: ->
		$(document).on 'click', (e)=>
			me = $ e.target
			
			if me.is @opts.parent + ' .button'
				if not me.hasClass 'nomore' then @more()
		return

	append: ( cases )->
		counter = $( @opts.parent + ' .case' ).length
		
		$( cases ).each ( index, element )=>
			me = $ element
			column = counter++ % 3
			$( @opts.parent + ' .columns .column' ).eq( column ).append( me )
			return

		return
	
	more: ->
		data =
			act: 'portfolio-more'
			already: $( @opts.parent + ' .case' ).length
		
		$.ajax(
			url: '/ajax'
			method: 'post'
			data: data
		).done(( response )=>
			console.log 'portfolio.class.js: success'
			console.log
				data: data
				response: response
			
			try
				answer = JSON.parse response
				if typeof answer.success isnt 'undefined'
					if answer.data then @append answer.data
					else $( @opts.parent + ' .button' ).addClass 'nomore'
			catch e
				console.warn 'portfolio.class.js: this.more() - JSON.parse() error'
				console.log
					data: data
					response: response
			
		).fail(( response )=>
			console.warn 'portfolio.class.js: this.more() - $.ajax() error'
			console.log
				data: data
				response: response
		)