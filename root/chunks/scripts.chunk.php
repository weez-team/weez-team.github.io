<script src="assets/js/form.class.js"></script>
<script src="assets/js/portfolio.class.js"></script>

<!-- Add fancyBox -->
<link rel="stylesheet" href="assets/components/fancybox/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
<script type="text/javascript" src="assets/components/fancybox/jquery.fancybox.pack.js?v=2.1.5"></script>

<!-- Optionally add helpers - button, thumbnail and/or media -->
<link rel="stylesheet" href="assets/components/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5" type="text/css" media="screen" />
<script type="text/javascript" src="assets/components/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
<script type="text/javascript" src="assets/components/fancybox/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

<link rel="stylesheet" href="assets/components/fancybox/helpers/jquery.fancybox-thumbs.css?v=1.0.7" type="text/css" media="screen" />
<script type="text/javascript" src="assets/components/fancybox/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>

<script src="assets/js/script.js"></script>
<script>
	$(document).ready(function(){
		$('.scrollToContacts').on('click', function(e){
			e.preventDefault();
			
			$('body').stop().animate({
				scrollTop: $('#contacts').offset().top
			}, 500, 'swing');
		});
	});
</script>