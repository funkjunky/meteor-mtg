<?php
$dir = "public/magicimgs/THS";
$h = opendir($dir);
while(false !== ($entry = readdir($h)))
	if($entry !== ".." && $entry !== ".")
		rename("$dir/$entry", "$dir/".substr($entry, 0, -8)."jpg");
?>
