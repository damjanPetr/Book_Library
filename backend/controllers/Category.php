<?php

namespace Category;

// require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../autoloader.php';

use Database\Database;

$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);


if (isset($data)) {
    $json = $data['json'];
    switch ($data['action']) {
        case 'addCategory': {
                try {
                    Category::addCategory($json);
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;

        case 'deleteCategory': {
                try {
                    Category::deleteCategory($data['json']['title']);
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;
        case 'editCategory': {
                try {
                    Category::editCategory($json['title'], $json['newTitle']);
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;
        case 'getAll': {
                try {
                    Category::getAllCategories();
                } catch (\PDOException $e) {
                    echo json_encode(
                        array(
                            'error' => true,
                            'message' => $e->getMessage()
                        )
                    );
                }
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

        $sql = "SELECT * FROM categories where title=:title AND deleted_at IS NULL";

        $stm = $pdo->prepare($sql);

        $stm->execute(['title' => $title]);

        $result = $stm->fetchAll();

        if ($result) {
            echo json_encode([
                'error' => true,
                'message' => 'Category Already Exits'
            ]);
        } else {

            $sql2 = "INSERT INTO categories (title) 
            VALUES(:title)";

            $result2 = $pdo->prepare($sql2)->execute(['title' => $title]);
            if ($result2) {
                echo json_encode([
                    'error' => false,
                    "data" => $result2
                ]);
            }
        }
    }

    static function getAllCategories()
    {
        $conn = new Database();

        $pdo =  $conn->getConnection();

        $sql =   "SELECT * FROM categories WHERE deleted_at IS NULL";

        $stm = $pdo->prepare($sql);

        $stm->execute();

        $result = $stm->fetchAll();
        echo json_encode($result);
    }

    static function deleteCategory(string  $title)

    {



        $conn = new Database();

        $pdo =  $conn->getConnection();
        $date = date('Y-m-d');

        $sql = "UPDATE categories SET deleted_at=:date WHERE title=:title";


        $stm = $pdo->prepare($sql);

        $stm->execute(
            [
                'date' => $date,
                'title' => $title
            ]
        );

        $result = $stm->fetchAll();
        echo json_encode($result);
    }

    static function editCategory(string $title, string $newtitle)
    {

        $conn = new Database();
        $pdo =  $conn->getConnection();
        $sql =   "UPDATE categories SET title=:newtitle WHERE title=:title and deleted_at IS NULL";
        $stm = $pdo->prepare($sql);
        $stm->execute(
            [
                'title' => $title,
                'newtitle' => $newtitle
            ]
        );

        $result = $stm->fetchAll();
        echo json_encode(['error' => false]);
    }
}
