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
                } catch (\Throwable $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e
                    ));
                }
            }
            break;
        case 'authUser': {

                try {
                    User::authUser($json['username'], $json['password']);
                } catch (\Throwable $e) {
                    echo json_encode(array(
                        'error' => true,
                        'message' => $e->getMessage()
                    ));
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
        $sql =  'SELECT username, password FROM user WHERE username=:username;';

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
                    'cookie' =>  'mehmeh'
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
        $sql =  'SELECT (username) FROM user WHERE username=:username';

        $stm1 = $pdo->prepare($sql);
        $stm1->execute([
            'username' => $username,
        ]);

        $results = $stm1->fetchAll();
        if ($results) {
            $text = "The user is already registered";
            echo json_encode(['message' => $text]);
        } else {

            $date = date('Y-m-d');

            $hash_password = password_hash($password, PASSWORD_DEFAULT);

            $sql =  'INSERT INTO  user (type,username,password,created_at)
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

            $results = $stm1->fetchAll();
            # return response json that the user is not here  
            // header('Content-type:application/json');
            $json = [
                'error' => false,
                'message' => $results
            ];
            echo json_encode($json);
        }
    }
    static function deleteUser(): void
    {
    }
}
