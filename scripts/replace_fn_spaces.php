<?php
$dir = $argv[1];
$h = opendir($dir);
while(false !== ($entry = readdir($h)))
	if($entry !== ".." && $entry !== ".")
		rename("$dir/$entry", "$dir/".str_replace("'", "-", str_replace(" ", "-", $entry)));
?>
