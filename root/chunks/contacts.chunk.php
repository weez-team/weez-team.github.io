<section id="contacts" class="contacts">
	<div class="container">
		<div class="image hidden-xs hidden-sm col-md-6 col-lg-5">
			<img src="assets/img/contacts/image.png" alt="lorem ipsum">
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-7">
			<h2>Оставьте заявку</h2>
			<form action="//weez.pro/ajax" method="post">
				<input type="text" name="act" value="contacts" hidden>
				<label class="clearfix column-half">
					<span class="pseudo-bold">Ваше имя:</span>
					<input type="text" name="name" required>
				</label>
				<label class="clearfix column-half">
					<span class="pseudo-bold">Ваш email:</span>
					<input type="email" name="email" required>
				</label>
				<label class="clearfix column-full">
					<span class="pseudo-bold">Сообщение:</span>
					<textarea name="message"></textarea>
				</label>
				<div class="clearfix">
					<input type="submit" value="Отправить" class="button">
				</div>
			</form>
		</div>
	</div>
</section>