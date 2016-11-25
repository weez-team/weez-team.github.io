<?php
class Compiler {
	function __construct() {
		@mkdir('cache');
	}

	function run( $input, $output ){
		$templates = glob( $input );
		foreach ( $templates as $template ) {
			$shortname = preg_replace('/^.*\/?([^\/\.]*)\.tpl\.php/isU', '$1', $template);
			$filename = $output . $shortname . '.html';

			$content = $this->getTemplate( $shortname );
			file_put_contents($filename, $content);
		}
	}
	
	function getTemplate( $template, $data=array() ){
		@mkdir('cache/templates');

		$callers = debug_backtrace();
		$caller = $callers[0]['object'];

		$templateFile = 'templates/'.$template.'.tpl.php';
		$cacheFile = 'cache/templates/'.urlencode( $templateFile );

		if ( file_exists($templateFile) ) {
			if ( !file_exists($cacheFile) || filemtime($templateFile) > filemtime($cacheFile) ) {
				$content = file_get_contents($templateFile);
				file_put_contents($cacheFile, $content);
			}

			if ( empty($this->cache['template'][ $templateFile ]) ) {
				$this->cache['template'][ $templateFile ] = create_function('&$self, $data=array()', 'if (!empty($data)) extract($data); $result = \'\'; ob_start(); include "'. $cacheFile .'"; $result = ob_get_contents(); ob_end_clean(); return $result;');
			}
			$templateFunction = $this->cache['template'][ $templateFile ];
			
			return $templateFunction($caller, $data);
		} else return false;
	}

	function getChunk( $chunk, $data=array() ){
		@mkdir('cache/chunks');

		$callers = debug_backtrace();
		$caller = $callers[0]['object'];

		$chunkFile = 'chunks/'.$chunk.'.chunk.php';
		$cacheFile = 'cache/chunks/'.urlencode( $chunkFile );

		if ( file_exists($chunkFile) ) {
			if ( !file_exists($cacheFile) || filemtime($chunkFile) > filemtime($cacheFile) ) {
				$content = file_get_contents($chunkFile);
				file_put_contents($cacheFile, $content);
			}

			if ( empty($this->cache['chunk'][ $chunkFile ]) ) {
				$this->cache['chunk'][ $chunkFile ] = create_function('&$self, $data=array()', 'if (!empty($data)) extract($data); $result = \'\'; ob_start(); include "'. $cacheFile .'"; $result = ob_get_contents(); ob_end_clean(); return $result;');
			}
			$chunkFunction = $this->cache['chunk'][ $chunkFile ];
			
			return $chunkFunction($caller, $data);
		} else return false;
	}

	function getSnippet( $snippet, $data=array() ){
		@mkdir('cache/snippets');

		$callers = debug_backtrace();
		$caller = $callers[0]['object'];

		$snippetFile = 'snippets/'.$snippet.'.snippet.php';
		$cacheFile = 'cache/snippets/'.urlencode( $snippetFile );

		if ( file_exists($snippetFile) ) {
			if ( !file_exists($cacheFile) || filemtime($snippetFile) > filemtime($cacheFile) ) {
				$content = file_get_contents($snippetFile);
				$content = preg_replace('/^(\s*)?(\<\?php)(\s*)?/is', '', $content);
				file_put_contents($cacheFile, $content);
			} else {
				$content = file_get_contents($cacheFile);
			}

			if ( empty($this->cache['snippet'][ $snippetFile ]) ) {
				$this->cache['snippet'][ $snippetFile ] = create_function('&$self, $data=array()', 'if (!empty($data)) extract($data); '.$content);
			}
			$snippetFunction = $this->cache['snippet'][ $snippetFile ];
			
			return $snippetFunction($caller, $data);
		} else return false;
	}
}