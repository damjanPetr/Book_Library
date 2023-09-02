<?php

namespace Comments;

require_once __DIR__ . '/../autoloader.php';



use Database\Database;


$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);





if (isset($data)) {

    $json = $data['json'];
    switch ($data['action']) {
        case 'addComment': {
                try {
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

        case 'deleteComment': {
                try {
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
        case 'editComment': {
                try {
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
        case 'getAll': {
                Comments::getAllComments();
                try {
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
        case 'getSingle': {
                try {
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
        case 'approveComment': {

                try {
                    Comments::approveComment($json['id']);
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
        case 'declineComment': {
                Comments::declineComment($json['id']);
                try {
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





class Comments
{

    //static funciton to approve comment
    static function approveComment($id)
    {
        $date = date('Y-m-d');
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'UPDATE comments
        SET approved =:date ,declined = null  where id = :id';

        $stm = $pdo->prepare($sql);


        if (
            $stm->execute(
                [
                    'date' => $date,
                    'id' => $id,
                ]
            )
        ) {
            echo json_encode([
                'error' => false,
            ]);
        }
        ;
    }
    static function getAllComments()
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'SELECT c.*, u.username
        FROM 
        comments as c
        INNER JOIN users as u ON c.users_id = u.id;  
        ';

        $stm = $pdo->prepare($sql);
        $stm->execute();
        $result = $stm->fetchAll();

        if ($result) {
            echo json_encode([
                'error' => false,
                "data" => $result
            ]);
        }
        ;
    }


    static function getAllBookComments($bookid)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'SELECT * FROM comments where book_id=:bookid';

        $stm = $pdo->prepare($sql);
        $stm->execute(['bookid' => $bookid]);
        $result = $stm->fetchAll();
        return $result;
    }


    static function addComment(string $title)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();

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


    static function deleteComment(string $title)
    {

        $conn = new Database();

        $pdo = $conn->getConnection();
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

    static function editComment(string $title, string $newtitle)
    {

        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = "UPDATE categories SET title=:newtitle WHERE title=:title and deleted_at IS NULL";
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



    static function declineComment($id)
    {
        $date = date('Y-m-d');
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'UPDATE comments
        SET declined = :date,approved = null WHERE id = :id';

        $stm = $pdo->prepare($sql);


        if (
            $stm->execute(
                [
                    'date' => $date,
                    'id' => $id,
                ]
            )
        ) {
            echo json_encode([
                'error' => false,
            ]);
        }
        ;
    }
}