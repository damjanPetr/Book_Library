<?php

namespace Database;

class Database
{

    protected $connection;
    public function __construct()

    {
        try {

            $host = 'localhost';
            $user = 'root';
            $port = '3006';

            $dbname = 'library';
            $pass = '';
            $dsn = "mysql:host=$host;dbname=$dbname;";

            $this->connection = new \PDO($dsn, $user, $pass, [
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            ]);
        } catch (\PDOException $e) {
            echo 'Database could not connect' .
                $e->getMessage();
        }
    }


    public function __destruct()
    {
        $this->connection = null;
    }


    public function getConnection()
    {
        return $this->connection;
    }
}
