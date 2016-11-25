<!doctype html>
<html lang="ru">

<?=$self->getChunk('head')?>


<body class="mainpage">
	
<?=$self->getChunk('header', array('active' => $template))?>


<main>
	
<?=$self->getChunk('banner')?>


<?=$self->getChunk('mainpage-services')?>


<?=$self->getChunk('mainpage-news')?>


<?=$self->getChunk('mainpage-portfolio')?>


<?=$self->getChunk('contacts')?>


</main>

<?=$self->getChunk('footer')?>


<?=$self->getChunk('scripts')?>
	
	
</body>
</html>