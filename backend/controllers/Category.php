<?php

namespace Category;

require_once __DIR__ . '/../database.php';

use Database\Database;

$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);


if (isset($data)) {
    $json = $data['json'];
    switch ($data['action']) {
        case 'createCategory': {
                Category::addCategory('huetnao');
            }
            break;
        case 'deleteCategory': {
                Category::deleteCategory($data['id']);
            }
            break;
        case 'editCategory': {
                Category::editCategory($data['id'], 'uhoena');
            }
            break;
        case 'getAll': {
                Category::getAllCategories();
            }
            break;
        default: {
            }
            break;
    }
}


class Category
{

    static function addCategory(string $title)
    {
        $conn = new Database();
        $pdo =  $conn->getConnection();
        $sql = "INSERT INTO category(title) 
        VALUES(:title)";
        $result = $pdo->prepare($sql)->execute(['title' => $title,]);
        return $result;
    }

    static function getAllCategories()
    {
        $conn = new Database();
        $pdo =  $conn->getConnection();
        $sql =   "SELECT * FROM category WHERE deleted_at IS NULL";
        $stm = $pdo->prepare($sql);
        $stm->execute();
        $result = $stm->fetchAll();
        return $result;
    }

    static function deleteCategory(string  $date)

    {
        $conn = new Database();

        $pdo =  $conn->getConnection();

        $sql =   "UPDATE category SET deleted_at=:time";

        $stm = $pdo->prepare($sql);

        $stm->execute(['time' => $date]);

        $result = $stm->fetchAll();

        return $result;
    }

    static function editCategory(string $title, string $newtitle)
    {

        $conn = new Database();
        $pdo =  $conn->getConnection();
        $sql =   "UPDATE category SET title=:newtitle WHERE title=:title";
        $stm = $pdo->prepare($sql);
        $stm->execute(['title' => $title, 'newtitle' => $newtitle]);
        $result = $stm->fetchAll();
        return $result;
    }
}
