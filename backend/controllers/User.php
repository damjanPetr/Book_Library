<?php

namespace User;

use Database\Database;

require_once __DIR__ . '/./Database.php';
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);

if (isset($data)) {

    $json = $data['json'];

    switch ($data['action']) {
        case 'registerUser': {
                try {
                    User::createUser($json['username'], $json['password']);
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
        case 'authUser': {

                try {
                    User::authUser($json['username'], $json['password']);
                } catch (\Throwable $e) {
                    echo json_encode(
                        array(
                            'error' => true,
                            'message' => $e->getMessage()
                        )
                    );
                }
                break;
            }
        default: {
                echo json_encode(array('errorMessage' => 'no JOS '));
            }
            break;
    }
}

class User
{
    static function authUser($username, $password): void
    {

        $connection = new Database();
        $pdo = $connection->getConnection();


        // statement for checking the credentials
        $sql = 'SELECT username, password,id,type FROM users WHERE username=:username;';

        $stm1 = $pdo->prepare($sql);

        $stm1->execute([
            'username' => $username
        ]);

        $results = $stm1->fetchAll();
        if ($results) {
            $hashed_password = $results[0]['password'];
            if (password_verify($password, $hashed_password)) {
                setcookie("AUTH", "cookiethree", time() + 606024 * 30);
                echo json_encode([
                    'auth' => 'true',
                    'user' => $results[0]
                ]);
            } else {
                echo json_encode([
                    'error' => true,
                    'message' => "Wrong Password"
                ]);
            }
        } else {
            # return response json that the user is not here  
            echo json_encode([
                'error' => true,
                'message' => 'There is no such user registered'
            ]);
        }
    }



    static function createUser($username, $password): void
    {


        $connection = new Database();
        $pdo = $connection->getConnection();


        // statement for checking the credential username is present
        $sql = 'SELECT (username) FROM users WHERE username=:username';

        $stm1 = $pdo->prepare($sql);
        $stm1->execute([
            'username' => $username,
        ]);

        $results = $stm1->fetchAll();
        if ($results) {
            $json = [
                "error" => true,
                "message" => "This username is already in use.",
            ];
            echo json_encode($json);
        } else {

            $date = date('Y-m-d');

            $hash_password = password_hash($password, PASSWORD_DEFAULT);

            $sql = 'INSERT INTO  users (type,username,password,created_at)
            VALUES(
                :type,
                :username,
                :password,
                :created_at
            ) ';

            $stm1 = $pdo->prepare($sql);

            $stm1->execute([
                'type' => 'user',
                'username' => $username,
                'password' => $hash_password,
                'created_at' => $date,
            ]);
            $lastID = $pdo->lastInsertId();
            $results = $stm1->fetchAll();
            # return response json that the user is not here  

            //sql to get inserted user
            $sql2 = "SELECT * from users WHERE id=:userid";
            $stm2 = $pdo->prepare($sql2);
            $stm2->execute(['userid' => $lastID]);
            $user = $stm2->fetchAll();

            $json = [
                'error' => false,
                'user' => $user[0]
            ];
            echo json_encode($json);
        }
    }
    static function deleteUser(): void
    {
    }
    //set user as admin 
    static function createUserAdmin($id): void
    {

        $date = date('Y-m-d');
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = "UPDATE users
        SET type = 'admin' WHERE id = :id";

        $stm = $pdo->prepare($sql);

        if (
            $stm->execute(
                [
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