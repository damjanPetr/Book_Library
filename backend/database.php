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
            $pass = 'aoeu';
            $dsn = "mysql:host=$host;dbname=$dbname;";

            $this->connection = new \PDO($dsn, $user, $pass, [
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            ]);
        } catch (\Throwable $e) {
            echo "<pre>";
            var_dump($e);
            echo "</pre>";
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
