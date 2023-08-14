<?php

namespace Category;

require_once __DIR__ . '/../database.php';

use Database\Database;


class Category
{

    public function addCategory(string $title, string $last_book_id)
    {
        $conn = new Database();
        $pdo =  $conn->getConnection();
        $sql = "INSERT INTO category(title,book_id) 
        VALUES(:title,:book_id)";
        $result = $pdo->prepare($sql)->execute(['title' => $title, 'book_id' => $last_book_id]);
        return $result;
    }

    public function getAllCategories()
    {
        $conn = new Database();
        $pdo =  $conn->getConnection();
        $sql =   "SELECT * FROM category WHERE deleted_at IS NULL";
        $stm = $pdo->prepare($sql);
        $stm->execute();
        $result = $stm->fetchAll();
        return $result;
    }

    public function deleteCategory(string  $date)

    {
        $conn = new Database();

        $pdo =  $conn->getConnection();

        $sql =   "UPDATE category SET deleted_at=:time";

        $stm = $pdo->prepare($sql);

        $stm->execute(['time' => $date]);

        $result = $stm->fetchAll();

        return $result;
    }

    public function editCategory(string $title, string $newtitle)
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
