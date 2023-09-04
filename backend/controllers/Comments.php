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
                    Comments::addComment($json['body'], $json['books_id'], $json['users_id']);
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
                    Comments::deleteComment($json['id']);
                } catch (\PDOException $e) {
                    Comments::declineComment($json['id']);
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

        case 'getAllBookComments': {
                try {
                    Comments::getAllBookComments($json['id']);
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
        INNER JOIN users as u ON c.users_id = u.id WHERE c.deleted_at IS NULL;
        ';

        $stm = $pdo->prepare($sql);

        if (
            $stm->execute()
        ) {
            $result = $stm->fetchAll();
            echo json_encode([
                'error' => false,
                "data" => $result
            ]);

        } else {
            throw new \PDOException;
        }
        ;
    }


    static function getAllBookComments($bookid)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        // $sql = 'SELECT * FROM comments 
        // where books_id = :books_id AND 
        // deleted_at is NULL  
        // ';

        $sql = 'SELECT c.id,
        c.body,
        c.books_id ,
        c.users_id,
        c.deleted_at,
        c.approved,
        c.declined,
        users.username 
        FROM comments as c
        inner join users ON users.id = c.users_id
        where books_id = :books_id AND 
        deleted_at is NULL  
        ;';


        $stm = $pdo->prepare($sql);

        if (
            $stm->execute(
                ['books_id' => $bookid]
            )
        ) {
            $result = $stm->fetchAll();

            echo json_encode([
                'error' => false,
                'data' => $result
            ]);
        } else {
            throw new \PDOException;
        }
    }


    static function editComment(string $body, $books_id, $users_id)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();

        $sql = "UPDATE comments  SET body=:body,users_id =:users_id WHERE books_id = :books_id AND deleted_at IS NULL";

        $stm = $pdo->prepare($sql);

        $stm->execute(
            [
                'body' => $body,
                'books_id' => $books_id,
                'users_id' => $users_id
            ]
        );

        $result = $stm->fetchAll();

        if ($result) {
            echo json_encode([
                'error' => true,
                'message' => 'Category Already Exits'
            ]);
        }
    }

    static function addComment(string $body, $books_id, $users_id)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();

        $sql = "INSERT INTO comments (body,books_id,users_id)
        VALUES
        (:body,:books_id,:users_id)";

        $stm = $pdo->prepare($sql);


        if (
            $stm->execute(
                [
                    'body' => $body,
                    'books_id' => $books_id,
                    'users_id' => $users_id
                ]
            )
        ) {
            echo json_encode([
                'error' => false,
            ]);
        }
    }


    static function deleteComment($id)
    {

        $conn = new Database();

        $pdo = $conn->getConnection();
        $date = date('Y-m-d');

        $sql = "UPDATE comments SET deleted_at=:date WHERE id=:id";


        $stm = $pdo->prepare($sql);


        if (
            $stm->execute(
                [
                    'id' => $id,
                    'date' => $date
                ]
            )
        ) {

            echo json_encode(
                [
                    'error' => false,

                ]
            );
        }

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