<!doctype html>
<html lang="ru">

<?=$self->getChunk('head')?>


<body class="mainpage">

<?=$self->getChunk('header', array('active' => $template))?>


<main>

<?=$self->getChunk('banner', array('small' => true))?>


<?=$self->getChunk('content-services')?>


<?=$self->getChunk('contacts')?>


</main>

<?=$self->getChunk('footer')?>


<?=$self->getChunk('scripts')?>


</body>
</html>