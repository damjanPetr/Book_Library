<?php

use User\User;

require __DIR__ . '/controllers/User.php';

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
    public function reset()
    {

        $sql =
            // "DROP DATABASE `library`;
            "ALTER TABLE authors AUTO_INCREMENT = 1;
    ALTER TABLE books AUTO_INCREMENT = 1;
    ALTER TABLE categories AUTO_INCREMENT = 1;
    ALTER TABLE users AUTO_INCREMENT = 1;
    ALTER TABLE comments AUTO_INCREMENT = 1;
    ";





        $stm = $this->conn->prepare($sql);


        if ($stm->execute()) {
            return 'reset succesfull';
        } else {
            return 'reset fail';
        }
    }

    public function input()
    {

        $message = [];

        $message[] = 'input start';



        $usersArray = [
            [
                'type' => 'admin',
                'username' => 'aoeu',
                'password' => 'aoeu'
            ],
        ];


        // foreach ($usersArray as $item) {
        //     $date = date('Y-m-d');

        //     $stm2 = $this->conn->prepare('INSERT INTO users (type,created_at,username,password)');
        //     $stm2->execute(
        //         [
        //             'type' => $item['type'],
        //             'created_at' => $date,
        //             'username' => $item['username'],
        //             'password' => $item['password']
        //         ]
        //     );
        // }

        User::createUser('admin', 'admin');
        User::createUser('hans', 'hans');
        User::createUser('mans', 'mans');
        User::createUser('aoeu', 'aoeu');


        $inputSQL = "INSERT INTO categories (title) 
        VALUES
        ('Science-Fiction'),
        ('Drama'),
        ('Comedy'),
        ('Romance'),
        ('Fantasy')
        ('Thriller')
        ('Contemporary')
        ('Classics')
        ('Horror')
        ('Biography')
        ('Poetry')
        ('History')
        ('Crime')
        ('Self-Help')
       ;";

        $inputSQLUsers = "INSERT INTO authors (first_name,last_name,short_bio)
        VALUES
        (:first_name,:last_name,:short_bio);";

        $stm = $this->conn->prepare($inputSQL);

        $stm->execute();


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




        $arrayBooks = [
            [
                "title" => 'Play',
                "release_date" => '2012-4-10',
                "author_id" => '1',
                "categories_id" => '1',
                "number_of_pages" => '193',
                "notes_id" => '1',
                "img" => 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSByFYCsAQEoSFRdmV7UzVFr6M6HESCGjDDNZGQptnDVKkmR5_l'
            ]
        ];

        $inputBooksSQL = "INSERT INTO books (title,release_date,author_id,categories_id,number_of_pages,img)

        VALUES(
            :title,
            :release_date,
            :author_id,
            :categories_id,
            :number_of_pages,
            :img)
        ;";

        foreach ($arrayBooks as $item) {
            $bookStm = $this->conn->prepare($inputBooksSQL);
            $bookStm->execute(
                [
                    'title' => $item['title'],
                    'release_date' => $item['release_date'],
                    'author_id' => $item['author_id'],
                    'categories_id' => $item['categories_id'],
                    'number_of_pages' => $item['number_of_pages'],
                    'img' => $item['img']
                ]
            );
        };


        /* Notes */
        $noteArray =
            [
                [
                    'body' => 'player is the best ',
                    'books_id' => '1',
                    'user_id' => '2'
                ],
                [
                    'body' => ' anata no tame ni ',
                    'books_id' => '1',
                    'user_id' => '3'
                ],
                [
                    'body' => 'nandeyo mihary rukuban best',
                    'books_id' => '1',
                    'user_id' => '2'
                ],
                [
                    'body' => 'iplic is the riverz ',
                    'books_id' => '1',
                    'user_id' => '4'
                ],
                [
                    'body' => 'is teh ebst is alber best ',
                    'books_id' => '1',
                    'user_id' => '4'
                ]
            ];


        $inputNotesSql = 'INSERT INTO notes (body,books_id,users_id) VALUES(:body,:books_id,:users_id)';

        $stmNotes = $this->conn->prepare($inputNotesSql);
        foreach ($noteArray as $item) {

            $stmNotes->execute(
                [
                    'body' => $item['body'],
                    'books_id' => $item['books_id'],
                    'users_id' => $item['user_id'],
                ]
            );
        };


        /* Comments */

        $commentArray =
            [
                [
                    'body' => 'Comment 1 ',
                    'books_id' => '1',
                    'user_id' => '2'
                ],
                [
                    'body' => 'Comment 2 ',
                    'books_id' => '1',
                    'user_id' => '3'
                ],
                [
                    'body' => 'Comment 3 ',
                    'books_id' => '1',
                    'user_id' => '2'
                ],
                [
                    'body' => 'Comment 4 ',
                    'books_id' => '1',
                    'user_id' => '4'
                ],
                [
                    'body' => 'Comment 5 ',
                    'books_id' => '1',
                    'user_id' => '4'
                ]
            ];

        $inputCommentsSql = 'INSERT INTO comments (body,books_id,users_id) VALUES(:body,:books_id,:users_id)';

        $stmComments = $this->conn->prepare($inputCommentsSql);

        foreach ($commentArray as $item) {

            $stmComments->execute(
                [
                    'body' => $item['body'],
                    'books_id' => $item['books_id'],
                    'users_id' => $item['user_id'],
                ]
            );
        };



        if (true) {
            $message[] = 'input completed';
        } else {
            $message[] = 'input error';
        }

        return $message;
    }
}
