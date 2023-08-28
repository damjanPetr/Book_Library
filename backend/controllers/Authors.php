<?php

namespace Authors;

// require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../autoloader.php';

use Database\Database;

$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);


if (isset($data)) {
    $json = $data['json'];
    switch ($data['action']) {
        case 'addAuthor': {
                try {
                    Authors::addAuthor($json['newFirstName'], $json['newLastName'], $json['newShortBio']);
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;

        case 'deleteAuthor': {
                try {
                    Authors::deleteAuthor($json['id']);
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;
        case 'editAuthor': {
                try {
                    Authors::editAuthor($json['id'], $json['first_name'], $json['last_name'], $json['short_bio']);
                } catch (\PDOException $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
                }
            }
            break;
        case 'getAllAuthors': {
                try {
                    Authors::getAllAuthors();
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


class Authors
{
    static function addAuthor(string $first_name, string $last_name, string $short_bio)
    {
        $conn = new Database();
        $pdo =  $conn->getConnection();

        $sql = "SELECT * FROM authors where first_name=:first_name AND last_name=:last_name AND deleted_at IS NULL";

        $stm = $pdo->prepare($sql);

        $stm->execute(
            [
                'first_name' => $first_name,
                'last_name' => $last_name
            ]
        );

        $result = $stm->fetchAll();

        if ($result) {
            echo json_encode([
                'error' => true,
                'message' => 'Authors Already Exits'
            ]);
        } else {

            $sql2 = "INSERT INTO authors (first_name,last_name,short_bio) 
            VALUES(:first_name,:last_name,:short_bio);";


            $stm2 = $pdo->prepare($sql2);
            $stm2->execute(
                [
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'short_bio' => $short_bio
                ]
            );

            $result2 = $stm2->fetchAll();
            $lastid = $pdo->lastInsertId();
            $returnSql = "SELECT * from authors where id=:id;";


            $stmReturn = $pdo->prepare($returnSql);
            $stmReturn->execute([
                'id' => $lastid
            ]);
            $returnResult = $stmReturn->fetch();

            if (isset($result2)) {
                echo json_encode([
                    'error' => false,
                    "data" => $returnResult
                ]);
            }
        }
    }

    static function getAllAuthors()
    {
        $conn = new Database();

        $pdo =  $conn->getConnection();

        $sql =   "SELECT * FROM authors WHERE deleted_at IS NULL";

        $stm = $pdo->prepare($sql);

        $stm->execute();

        $result = $stm->fetchAll();
        echo json_encode($result);
    }

    static function deleteAuthor(int $id)

    {

        $conn = new Database();

        $pdo =  $conn->getConnection();
        $date = date('Y-m-d');

        $sql = "UPDATE authors SET deleted_at=:date WHERE id=:id";


        $stm = $pdo->prepare($sql);

        $stm->execute(
            [
                'date' => $date,
                'id' => $id
            ]
        );

        $result = $stm->fetchAll();
        echo json_encode($result);
    }

    static function editAuthor(string $id, string $first_name, string $last_name, string $short_bio)
    {

        $conn = new Database();
        $pdo =  $conn->getConnection();
        $sql =   "UPDATE authors 
        SET 
        first_name=:first_name,
        last_name=:last_name,
        short_bio=:short_bio
         WHERE id=:id AND deleted_at IS NULL";

        $stm = $pdo->prepare($sql);

        $stm->execute(
            [
                'id' => $id,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'short_bio' => $short_bio,
            ]
        );

        $result = $stm->fetchAll();
        echo json_encode(['error' => false]);
    }
}
