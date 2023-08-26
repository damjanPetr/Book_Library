<?php


class Setup
{

    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function createTables()
    {
        $message = [];
        $message[] = '[Setup Started]<br>';

        $message[] = '[Setup Completed]<br>';
        return $message;
    }
    public function input()
    {

        $message = [];

        $message[] = 'input start';

        $inputSQL = "INSERT INTO categories (title) 
        VALUES
        ('Science-Fiction'),
        ('Drama'),
        ('Comedy'),
        ('Romance'),
        ('Fantasy')
       ;";

        $stm = $this->conn->prepare($inputSQL);
        if (
            $stm->execute()
        ) {

            $message[] = 'input completed';
        } else {
            $message[] = 'input error';
        }

        return $message;
    }
}
