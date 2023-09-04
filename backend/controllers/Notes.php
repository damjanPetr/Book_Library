<?php

namespace Comments;

require_once __DIR__ . '/../autoloader.php';



use Database\Database;


$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);



if (isset($data)) {

    $json = $data['json'];
    switch ($data['action']) {
        case 'addNote': {
                try {
                    Notes::addNote($json['body'], $json['books_id'], $json['users_id']);
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

        case 'deleteNote': {
                try {
                    Notes::deleteNote($json['id']);
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
        case 'editNote': {
                try {
                    Notes::editNote($json['body'], $json['id']);
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


        case 'getAllBookNotes': {
                try {
                    Notes::getAllBookNotes($json['books_id'], $json['users_id']);
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





class Notes
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


    static function getAllBookNotes($bookid, $users_id)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'SELECT * FROM notes 
        where 
        books_id = :books_id AND 
        users_id = :users_id AND 
        deleted_at is NULL';

        $stm = $pdo->prepare($sql);

        if (
            $stm->execute(
                [
                    'books_id' => $bookid,
                    'users_id' => $users_id
                ]
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
        ;
    }


    static function editNote(string $body, $id)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();

        $sql = "UPDATE notes SET 
        body=:body
         WHERE id=:id ;
         ";

        $stm = $pdo->prepare($sql);


        if (
            $stm->execute(
                [
                    'body' => $body,
                    'id' => $id,
                ]
            )
        ) {
            echo json_encode([
                'error' => false,
            ]);
        } else {
            throw new \PharException;
        }
    }

    static function addNote(string $body, $books_id, $users_id)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();

        $sql = "INSERT INTO notes (body,books_id,users_id)
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
        } else {
            throw new \PDOException;
        }
    }


    static function deleteNote($id)
    {

        $conn = new Database();

        $pdo = $conn->getConnection();
        $date = date('Y-m-d');

        $sql = "UPDATE notes SET deleted_at=:date WHERE id=:id";


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
        } else {
            throw new \PDOException;
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