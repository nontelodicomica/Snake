<?php
session_start();
$type = 'login';
if($type == 'login')
$type = './php/'.$type;
else 
$type = './'.$type;
var_dump('\''.$type.'form.php\' method=\'post\'');
?>