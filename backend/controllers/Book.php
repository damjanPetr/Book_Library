<?php

namespace Book;

require_once __DIR__ . '/../autoloader.php';

use Database\Database;

$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);


if (isset($data)) {
    $json = $data['json'];
    switch ($data['action']) {
        case 'addBook': {
                try {
                    Book::addBook(
                        $json['title'],
                        $json['releaseDate'],
                        $json['authorId'],
                        $json['categoryId'],
                        $json['numberOfPages'],
                        $json['pictureUrl']
                    );
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;

        case 'getBook': {
                try {
                    Book::getBook(
                        $json['id']
                    );
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;



        case 'deleteBook': {
                try {
                    Book::deleteBook($json['id']);
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;
        case 'editBook': {
                try {
                    Book::editBook(
                        $json['bookId'],
                        $json['title'],
                        $json['releaseDate'],
                        $json['numberOfPages'],
                        $json['pictureUrl'],
                        $json['categoryId'],
                        $json['authorId'],
                    );
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;
        case 'getAllBooks': {
                try {
                    Book::getAllBooks();
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


class Book
{
    static function getAllBooks()
    {

        $conn = new Database();
        $pdo = $conn->getConnection();
        // $sql = 'SELECT * FROM books WHERE deleted_at IS  NULL';
        $sql = "SELECT
        b.id,
        b.title,
        release_date,
        number_of_pages,
        img,
        b.deleted_at,
        author_id,
        categories_id,
        a.first_name,
        a.last_name,
        c.title as Category
        from books as b
        INNER join authors as a on a.id = b.author_id 
        INNER join categories as c on b.categories_id = c.id Where b.deleted_at IS NULL;
        ";


        $stm = $pdo->prepare($sql);
        $stm->execute();

        $result  = $stm->fetchAll();
        echo json_encode([
            'error' => false,
            'data' => $result
        ]);
    }

    static function getBook($bookid)
    {

        $conn = new Database();
        $pdo = $conn->getConnection();
        // $sql = 'SELECT * FROM books WHERE deleted_at IS  NULL';
        $sql = "SELECT
        b.id,
        b.title,
        release_date,
        number_of_pages,
        img,
        b.deleted_at,
        author_id,
        categories_id,
        a.first_name,
        a.last_name,
        c.title as Category
        from books as b
        INNER join authors as a on a.id = b.author_id 
        INNER join categories as c on b.categories_id = c.id 
        WHERE b.id = :bookId AND b.deleted_at IS NULL ;";


        $stm = $pdo->prepare($sql);
        $stm->execute(['bookId' => $bookid]);

        $result  = $stm->fetch();
        echo json_encode([
            'error' => false,
            'data' => $result
        ]);
    }

    static function addBook(
        string $title,
        string $release_date,
        string $author,
        string $category,
        int $number_of_pages,
        string  $img
    ) {
        $conn = new Database();
        $pdo = $conn->getConnection();



        $sql = 'INSERT INTO books (title,release_date,author_id,categories_id,number_of_pages,img)
        VALUES(
            :title,
            :release_date,
            :author_id,
            :categories_id,
            :number_of_pages,
            :img)
            ;
        ';

        $stm = $pdo->prepare($sql);


        if ($stm->execute(
            [
                'title' => $title,
                'release_date' => $release_date,
                'author_id' => $author,
                'categories_id' => $category,
                'number_of_pages' => $number_of_pages,
                'img' => $img
            ]
        )) {
            $lastId = $pdo->lastInsertId();

            $stm2 = $pdo->prepare('SELECT * FROM books WHERE id=:id;');

            $stm2->execute([
                'id' => $lastId
            ]);

            $result = $stm2->fetchAll();

            echo json_encode([
                'error' => false,
                'data' => $result[0]
            ]);
        }
    }

    static function editBook($bookid, $title, $release_date, $number_of_pages, $img, $category_id, $author_id)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();

        $sql = 'UPDATE books SET 
        title = :title,
        release_date = :release_date,
        number_of_pages = :number_of_pages,
        author_id = :author_id,
        categories_id = :categories_id,
        img = :img
        WHERE id = :bookid
        ';

        $stm = $pdo->prepare($sql);

        if ($stm->execute([
            'bookid' => $bookid,
            'title' => $title,
            'release_date' => $release_date,
            'number_of_pages' => $number_of_pages,
            'author_id' => $author_id,
            'categories_id' => $category_id,
            'img' => $img,
        ])) {
            Book::getBook($bookid);
            // echo json_encode([
            // 'error' => false,
            // 'data' => ''
            // ]);

        }
    }

    static function deleteBook($bookid)
    {

        $date = date('Y-m-d');

        $conn = new Database();

        $pdo = $conn->getConnection();

        $sql = "UPDATE books SET deleted_at=:delete_date WHERE id = :bookid";

        $stm = $pdo->prepare($sql);

        $stm->execute([
            'bookid' => $bookid,
            'delete_date' => $date
        ]);

        if ($stm->execute([
            'bookid' => $bookid,
            'delete_date' => $date
        ])) {
            $sql = "UPDATE notes SET deleted_at=:delete_date WHERE books_id = :bookid;
            UPDATE comments SET deleted_at=:delete_date WHERE books_id = :bookid;
            ";

            $stm = $pdo->prepare($sql);

            if ($stm->execute([
                'bookid' => $bookid,
                'delete_date' => $date
            ])) {


                echo json_encode([
                    "error" => false,
                    "data" => true
                ]);
            }
        }
    }
}
