<?php

namespace Book;

require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../Category/Category.php';

use Database\Database;
use Category\Category;


$book = new Book();
// $book->addBook('uhetaonu', '323211', 13312, '311');

$category = new Category();
// $category->addCategory('player', $book->lastid);
$test = $category->getAllCategories();

var_dump($test);

class Book
{
    public function getAllBooks($args)
    {

        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'SELECT * FROM book WHERE deleted_at IS NOT NULL';
        $stm = $pdo->prepare($sql);
        $result = $stm->execute();

        return $result;
    }

    public $lastid;
    public function addBook(string $title, string $release_date, int $number_of_pages, string  $img)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'INSERT INTO book (title,release_date,number_of_pages,img)
        VALUES(:title,:release_date,:number_of_pages,:img)
        ';

        $stm = $pdo->prepare($sql);

        $stm->execute(
            ['title' => $title, 'release_date' => $release_date, 'number_of_pages' => $number_of_pages, 'img' => $img]
        );

        $result = $stm->fetchAll();

        var_dump($pdo->lastInsertId());
        $this->lastid = $pdo->lastInsertId();

        return $result;
    }

    public function updateBook($bookid, $title, $release_date, $number_of_pages, $img)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'UPDATE book SET 
        title = :title,
        release_date = :release_date,
        number_of_pages = :number_of_pages,
        img = :img
        WHERE id = :bookid
        ';

        $stm = $pdo->prepare($sql);
        $stm->execute([
            'bookid' => $bookid,
            'title' => $title,
            'release_date' => $release_date,
            'number_of_pages' => $number_of_pages,
            'img' => $img,
        ]);
    }

    public function deleteBook($bookid, $delete_date)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = "UPDATE book SET deleted_at=:delete_date WHERE id = :bookid";
        $stm = $pdo->prepare($sql);
        $stm->execute([
            'bookid' => $bookid,
            'delete_date' => $delete_date
        ]);

        $result = $stm->fetchAll();
        return $result;
    }
}
