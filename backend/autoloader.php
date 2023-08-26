<?php
require_once __DIR__ . '/controllers/Database.php';


use Database\Database;

function my_custom_autoloader($class_name)
{
    $file = __DIR__ . '/controllers/' . $class_name . '.php';

    if (file_exists($file)) {
        require_once $file;
    }
}

// add a new autoloader by passing a callable into spl_autoload_register()
spl_autoload_register('my_custom_autoloader');


$database = new Database();
$db = $database->getConnection();
