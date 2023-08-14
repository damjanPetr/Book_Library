<?php

namespace User;

require __DIR__ . '/../database.php';

use Database\Database;


if (isset($_POST)) {
    $data = $_POST;

    echo 'uhtena';
}

class User
{

    public function authUser($username, $password): void
    {

        $hash_password =   password_hash($password, PASSWORD_DEFAULT);


        $connection = new Database();
        $pdo = $connection->getConnection();

        $sql2 =  '';


        // statement for checking the credentials
        $sql =  'SELECT (password,username) FROM user WHERE password = :password, username=:username';

        $stm1 = $pdo->prepare($sql);
        $stm1->execute([
            'password' => $username,
            'username' => $password
        ]);

        $results = $stm1->fetchAll();
        if ($results) {
            // TODO: 
            # return response json
        } else {
            # return response json that the user is not here  
        }

        $sql = 'INSERT INTO user (type,created_at) 

        VALUES ()';
    }



    public function createUser($username, $password): void
    {


        $connection = new Database();
        $pdo = $connection->getConnection();

        $sql2 =  '';


        // statement for checking the credential username is present
        $sql =  'SELECT (username) FROM user WHERE username=:username';

        $stm1 = $pdo->prepare($sql);
        $stm1->execute([
            'username' => $username,
        ]);

        $results = $stm1->fetchAll();
        if ($results) {
            // TODO: 
            $text = "The user is already registered";
            json_encode('');
        } else {

            $date = date('Y-m-d');

            $hash_password = password_hash($password, PASSWORD_DEFAULT);

            $sql =  'INSERT INTO  user (type,username,password,created_at)
            VALUES(
                :type,
                :username,
                :password,
                :created_at,
            ) ';

            $stm1 = $pdo->prepare($sql);

            $stm1->execute([
                'password' => $password,
                'username' => $username,

            ]);
            $results = $stm1->fetchAll();
            # return response json that the user is not here  
            header('Content-type:application/json');
            echo ('uhtneoauthaoen');
        }
    }
    public function deleteUser(): void
    {
    }
}
