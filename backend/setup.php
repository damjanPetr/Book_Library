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

        $inputSQLUsers = "INSERT INTO authors (first_name,last_name,short_bio)
        VALUES
        (:first_name,:last_name,:short_bio);";

        $array = [
            [
                'first_name' => 'Steven',
                'last_name' => 'King',
                'short_bio' =>  'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the "King of Horror", his books have sold more than 350 million copies as of 2006, and many have been adapted into films, television series, miniseries, and comic books.',
            ],
            [
                'first_name' => 'Lewis',
                'last_name' => 'Carroll',
                'short_bio' => 'Charles Lutwidge Dodgson, better known by his pen name Lewis Carroll, was an English author, poet and mathematician. His most notable works are Alice\'s Adventures in Wonderland and its sequel Through the Looking-Glass. He was noted for his facility with word play, logic, and fantasy.',
            ],
            [
                'first_name' => 'George',
                'last_name' => 'Orwell',
                'short_bio' => 'Eric Arthur Blair, better known by his pen name George Orwell, was an English novelist, essayist, journalist, and critic. His work is characterised by lucid prose, social criticism, opposition to totalitarianism, and support of democratic socialism.'
            ],
        ];


        foreach ($array as $item) {

            $stm2 = $this->conn->prepare($inputSQLUsers);
            $stm2->execute(
                [
                    'first_name' => $item['first_name'],
                    'last_name' => $item['last_name'],
                    'short_bio' => $item['short_bio']
                ]
            );
        }





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
