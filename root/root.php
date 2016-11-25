<?php
require_once 'config.php';
require_once 'compiler.php';

$compiler = new Compiler();
$compiler->run('templates/*.tpl.php', '../');