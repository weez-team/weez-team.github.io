(($)->
	$(document).ready ()=>
		$(document).on 'click', (e)=>
			me = $ e.target

			if me.is '.scrollToContacts'
				e.preventDefault()
				$('body').stop().animate {
					scrollTop: $('#contacts').offset().top
				}, 500, 'swing'
			return

		$('.fancy').fancybox
			prevEffect: 'none'
			nextEffect: 'none'
			closeBtn: false
			helpers:
				title:
					type : 'inside'
				buttons	: {}
			
		form = new Form
			list: ['.contacts form', 'footer .subscribe', 'aside .search-form']

		if $('.portfolio-page').length
			new Portfolio
				parent: '.portfolio-page .container'

		if $('.portfolio-mainpage').length
			new Portfolio
				parent: '.portfolio-mainpage .container'

		return
	
)(jQuery)