class Form
	constructor: ( args )->
		@opts =
			reset: true
			list: []
			before: ( e )=>
				return
			after: ( e )=>
				return
			success: ( e )=>
				@success e.answer
				return
			fail: ( e )=>
				@fail e.answer
				return

		if typeof args isnt 'undefined'
			if typeof args.reset isnt 'undefined' then @opts.reset = args.reset;
			if typeof args.list isnt 'undefined' then @opts.list = args.list;
			if typeof args.before is 'function' then @opts.before = args.before;
			if typeof args.after is 'function' then @opts.after = args.after;
			if typeof args.success is 'function' then @opts.success = args.success;
			if typeof args.fail is 'function' then @opts.fail = args.fail;
	
		@setEvents()
		return

	setEvents: ->
		$(document).on 'change', (e)=>
			me = $ e.target
			
			if me.is 'input[type="file"]'
				form = me.closest 'form'
				if @isInList form then files[ @selector( me.closest('form') ) ] = e.target.files
			return

		$(document).on 'submit', (e)=>
			form = $ e.target
			
			if @isInList form
				e.preventDefault()
				
				data = form.serialize()
				
				if ( form.find('input[type="file"]').length ) and ( typeof files[ @selector( form ) ] isnt 'undefined' ) and ( files[ @selector( form ) ].length )
					dataFiles = new FormData()

					$.each files[ @selector( form ) ], ( key, value )=>
						dataFiles.append key, value
						return

					@submit
						type: 'files'
						form: form
						data: dataFiles
				else
					@submit
						form: form
						data: data
				
			return
		
		return

	success: ( data )->
		console.log 'ajax success:'
		console.log data
		return
	
	fail: ( data )=>
		console.log data
		return
	
	isInList: ( form )=>
		for formFromList in @opts.list
			if form.is formFromList
				return true
		return false
	
	selector: ( form )=>
		for i in [0..@opts.list.length-1]
			if form.is @opts.list[ i ]
				return @opts.list[ i ]
		return
	
	submit: ( o )->
		if typeof o.form is 'undefined' then return false
		if typeof o.data is 'undefined' then return false

		form = o.form
		data = o.data

		if typeof @opts.before is 'function'
			result = @opts.before
				form: form
				data: data
				answer: undefined
			
			if typeof result isnt 'undefined'
				if typeof result.data isnt 'undefined' then data = result.data
				if typeof result.stop isnt 'undefined' then return false
			
		switch o.type
			when 'files'
				url = form.attr('action') + '?form=' + encodeURIComponent( @selector( form ) )
				query = form.serialize()
				if query.length then url += '&'+ query

				opts =
					type: form.attr 'method'
					url: url
					data: data
					cache: false
					dataType: 'json'
					processData: false
					contentType: false

				console.log opts

				$.ajax( opts )
				.done(( answer )=>
					if typeof answer.success isnt 'undefined'
						if @opts.reset then form.trigger 'reset'
						if typeof @opts.success is 'function' then @opts.success
							form: form
							data: data
							answer: answer
					else if typeof answer.fail isnt 'undefined'
						console.warn 'Form.fail: answer.fail'
						if typeof @opts.fail is 'function' then @opts.fail
							form: form
							data: data
							answer: answer
					else
						console.warn 'Form.fail: answer unexpected'
						if typeof @opts.fail is 'function' then @opts.fail
							form: form
							data: data
							answer: answer
				)
				.always(( answer )=>
					if typeof @opts.after is 'function' then @opts.after
						form: form
						data: data
						answer: answer
				)
				.fail(( error )=>
					console.warn 'Form.fail: ajax fail'
					if typeof @opts.fail is 'function' then @opts.fail
						form: form
						data: data
						answer: error
				)

				break
			else
				opts =
					type: form.attr 'method'
					url: form.attr 'action'
					data: data

				console.log opts

				$.ajax(opts)
				.done(( response )=>
					try
						answer = JSON.parse response
						if typeof answer.success isnt 'undefined'
							if @opts.reset then form.trigger 'reset'
							if typeof @opts.success is 'function' then @opts.success
								form: form
								data: data
								answer: answer
						else if typeof answer.fail isnt 'undefined'
							console.warn 'Form.fail: answer.fail'
							if typeof @opts.fail is 'function' then @opts.fail
								form: form
								data: data
								answer: answer
						else
							console.warn 'Form.fail: answer unexpected'
							if typeof @opts.fail is 'function' then @opts.fail
								form: form
								data: data
								answer: answer
					catch error
						console.warn 'Form.fail: JSON.parse() fail'
						console.log
							response: response
							error: error
				)
				.always(( answer )=>
					if typeof @opts.after is 'function' then @opts.after
						form: form
						data: data
						answer: answer
				)
				.fail(( error )=>
					console.warn 'Form.fail: ajax fail'
					if typeof @opts.fail is 'function' then @opts.fail
						form: form
						data: data
						answer: error
				)
				break

		return