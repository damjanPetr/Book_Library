<?php


require_once __DIR__ . '/./autoloader.php';

require_once __DIR__ . '/setup.php';

if (isset($_GET['setup']) && isset($_GET['setup']) === true) {

    $setup = new Setup($db);
    // $messages = $setup->createTables();
    foreach ($messages as $message) {
        echo $message . '<br>';
    }
}



if (isset($_GET['input']) && $_GET['input'] === 'true') {
    $setup = new Setup($db);
    $setup->reset();
    $messages = $setup->input();
    // foreach ($messages as $message) {
    // echo $message . '<br>';
    // }
    echo "success";
}
