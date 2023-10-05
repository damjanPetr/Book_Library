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
    public function reset()
    {
        $hostDB = 'library';

        $sql = "-- MySQL Workbench Forward Engineering

        SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
        SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
        SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
        
        -- -----------------------------------------------------
        -- Schema mydb
        -- -----------------------------------------------------
        -- -----------------------------------------------------
        -- Schema $hostDB
        -- -----------------------------------------------------
        DROP SCHEMA IF EXISTS `$hostDB` ;
        
        -- -----------------------------------------------------
        -- Schema $hostDB
        -- -----------------------------------------------------
        CREATE SCHEMA IF NOT EXISTS `$hostDB` DEFAULT CHARACTER SET utf8mb3 ;
        USE `$hostDB` ;
        
        -- -----------------------------------------------------
        -- Table `$hostDB`.`authors`
        -- -----------------------------------------------------
        DROP TABLE IF EXISTS `$hostDB`.`authors` ;
        
        CREATE TABLE IF NOT EXISTS `$hostDB`.`authors` (
          `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
          `first_name` VARCHAR(255) NOT NULL,
          `last_name` MEDIUMTEXT NOT NULL,
          `short_bio` TEXT NOT NULL,
          `deleted_at` VARCHAR(255) NULL DEFAULT NULL,
          PRIMARY KEY (`id`))
        ENGINE = InnoDB
        AUTO_INCREMENT = 10
        DEFAULT CHARACTER SET = utf8mb3;
        
        
        -- -----------------------------------------------------
        -- Table `$hostDB`.`categories`
        -- -----------------------------------------------------
        DROP TABLE IF EXISTS `$hostDB`.`categories` ;
        
        CREATE TABLE IF NOT EXISTS `$hostDB`.`categories` (
          `id` INT NOT NULL AUTO_INCREMENT,
          `title` VARCHAR(255) NOT NULL,
          `deleted_at` VARCHAR(255) NULL DEFAULT NULL,
          PRIMARY KEY (`id`))
        ENGINE = InnoDB
        AUTO_INCREMENT = 43
        DEFAULT CHARACTER SET = utf8mb3;
        
        
        -- -----------------------------------------------------
        -- Table `$hostDB`.`books`
        -- -----------------------------------------------------
        DROP TABLE IF EXISTS `$hostDB`.`books` ;
        
        CREATE TABLE IF NOT EXISTS `$hostDB`.`books` (
          `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
          `title` VARCHAR(255) NOT NULL,
          `release_date` VARCHAR(255) NOT NULL,
          `number_of_pages` INT UNSIGNED NOT NULL,
          `img` VARCHAR(255) NOT NULL,
          `deleted_at` VARCHAR(45) NULL DEFAULT NULL,
          `author_id` INT UNSIGNED NOT NULL,
          `categories_id` INT NOT NULL,
          PRIMARY KEY (`id`),
          INDEX `fk_book_author1_idx` (`author_id` ASC) VISIBLE,
          INDEX `fk_books_categories1_idx` (`categories_id` ASC) VISIBLE,
          CONSTRAINT `fk_book_author1`
            FOREIGN KEY (`author_id`)
            REFERENCES `$hostDB`.`authors` (`id`),
          CONSTRAINT `fk_books_categories1`
            FOREIGN KEY (`categories_id`)
            REFERENCES `$hostDB`.`categories` (`id`))
        ENGINE = InnoDB
        AUTO_INCREMENT = 10
        DEFAULT CHARACTER SET = utf8mb3;
        
        
        -- -----------------------------------------------------
        -- Table `$hostDB`.`users`
        -- -----------------------------------------------------
        DROP TABLE IF EXISTS `$hostDB`.`users` ;
        
        CREATE TABLE IF NOT EXISTS `$hostDB`.`users` (
          `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
          `type` VARCHAR(45) NULL DEFAULT NULL,
          `created_at` VARCHAR(45) NULL DEFAULT NULL,
          `username` VARCHAR(255) NOT NULL,
          `password` VARCHAR(255) NOT NULL,
          PRIMARY KEY (`id`))
        ENGINE = InnoDB
        AUTO_INCREMENT = 5
        DEFAULT CHARACTER SET = utf8mb3;
        
        
        -- -----------------------------------------------------
        -- Table `$hostDB`.`comments`
        -- -----------------------------------------------------
        DROP TABLE IF EXISTS `$hostDB`.`comments` ;
        
        CREATE TABLE IF NOT EXISTS `$hostDB`.`comments` (
          `id` INT NOT NULL AUTO_INCREMENT,
          `body` VARCHAR(255) NOT NULL,
          `books_id` INT UNSIGNED NOT NULL,
          `users_id` INT UNSIGNED NOT NULL,
          `deleted_at` DATE NULL DEFAULT NULL,
          `approved` DATE NULL DEFAULT NULL,
          `declined` DATE NULL DEFAULT NULL,
          PRIMARY KEY (`id`),
          INDEX `fk_comments_books1_idx` (`books_id` ASC) VISIBLE,
          INDEX `fk_comments_users1_idx` (`users_id` ASC) VISIBLE,
          CONSTRAINT `fk_comments_books1`
            FOREIGN KEY (`books_id`)
            REFERENCES `$hostDB`.`books` (`id`),
          CONSTRAINT `fk_comments_users1`
            FOREIGN KEY (`users_id`)
            REFERENCES `$hostDB`.`users` (`id`))
        ENGINE = InnoDB
        AUTO_INCREMENT = 26
        DEFAULT CHARACTER SET = utf8mb3;
        
        
        -- -----------------------------------------------------
        -- Table `$hostDB`.`notes`
        -- -----------------------------------------------------
        DROP TABLE IF EXISTS `$hostDB`.`notes` ;
        
        CREATE TABLE IF NOT EXISTS `$hostDB`.`notes` (
          `id` INT NOT NULL AUTO_INCREMENT,
          `body` TEXT NOT NULL,
          `deleted_at` DATE NULL DEFAULT NULL,
          `books_id` INT UNSIGNED NOT NULL,
          `users_id` INT UNSIGNED NOT NULL,
          PRIMARY KEY (`id`),
          INDEX `fk_notes_books1_idx` (`books_id` ASC) VISIBLE,
          INDEX `fk_notes_users1_idx` (`users_id` ASC) VISIBLE,
          CONSTRAINT `fk_notes_books1`
            FOREIGN KEY (`books_id`)
            REFERENCES `$hostDB`.`books` (`id`),
          CONSTRAINT `fk_notes_users1`
            FOREIGN KEY (`users_id`)
            REFERENCES `$hostDB`.`users` (`id`))
        ENGINE = InnoDB
        AUTO_INCREMENT = 16
        DEFAULT CHARACTER SET = utf8mb3;
        
        
        SET SQL_MODE=@OLD_SQL_MODE;
        SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
        SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
        

            ALTER TABLE authors AUTO_INCREMENT = 1;
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




        User::createUser('admin', 'admin');
        User::createUser('hans', 'hans');
        User::createUser('mans', 'mans');
        User::createUser('aoeu', 'aoeu');
        User::createUserAdmin(1);


        $inputSQL = "INSERT INTO categories (title) 
        VALUES
        ('Science-Fiction'),
        ('Fiction'),
        ('History'),
        ('Drama'),
        ('Comedy'),
        ('Romance'),
        ('Contemporary'),
        ('Classics'),
        ('Horror'),
        ('Poetry')
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
                'short_bio' => 'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Described as the "King of Horror", his books have sold more than 350 million copies as of 2006, and many have been adapted into films, television series, miniseries, and comic books.',
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
            [
                'first_name' => 'Jane',
                'last_name' => 'Austen',
                'short_bio' => 'Jane Austen was an English novelist whose works of romantic fiction, set among the landed gentry, earned her a place as one of the most widely read writers in English literature, her realism and biting social commentary cementing her historical importance among scholars and critics.
                Austen lived her entire life as part of a close-knit family located on the lower fringes of the English landed gentry. She was educated primarily by her father and older brothers as well as through her own reading. The steadfast support of her family was critical to her development as a professional writer. Her artistic apprenticeship lasted from her teenage years until she was about 35 years old. During this period, she experimented with various literary forms, including the epistolary novel which she tried then abandoned, and wrote and extensively revised three major novels and began a fourth. From 1811 until 1816, with the release of Sense and Sensibility (1811), Pride and Prejudice (1813), Mansfield Park (1814) and Emma (1815), she achieved success as a published writer. She wrote two additional novels, Northanger Abbey and Persuasion, both published posthumously in 1818, and began a third, which was eventually titled Sanditon, but died before completing it.'
            ],
            [
                'first_name' => 'Aldous',
                'last_name' => 'Huxley',
                'short_bio' => 'This most prominent member of the famous Huxley family of England spent the part of his life from 1937 in Los Angeles in the United States until his death. Best known for his novels and wide-ranging output of essays, he also published short stories, poetry, travel writing, and film stories and scripts. Through novels and essays, Huxley functioned as an examiner and sometimes critic of social mores, norms and ideals. Spiritual subjects, such as parapsychology and philosophical mysticism, interested Huxley, a humanist, towards the end of his life. People widely acknowledged him as one of the pre-eminent intellectuals of his time before the end of his life.
                (less)'
            ],
            [
                'first_name' => 'Douglas',
                'last_name' => 'Adams',
                'short_bio' => "In addition to The Hitchhiker's Guide to the Galaxy, Douglas Adams wrote or co-wrote three stories of the science fiction television series Doctor Who and served as Script Editor during the seventeenth season. His other written works include the Dirk Gently novels, and he co-wrote two Liff books and Last Chance to See, itself based on a radio series. Adams also originated the idea for the computer game Starship Titanic, which was produced by a company that Adams co-founded, and adapted into a novel by Terry Jones. A posthumous collection of essays and other material, including an incomplete novel, was published as The Salmon of Doubt in 2002.

                His fans and friends also knew Adams as an environmental activist and a lover of fast cars, cameras, the Macintosh computer, and other 'techno gizmos'.
                
                Toward the end of his life he was a sought-after lecturer on topics including technology and the environment."
            ]


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
                "title" => '1984',
                "release_date" => '1949-07-08',
                "author_id" => '3',
                "categories_id" => '2',
                "number_of_pages" => '368',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg'
            ],
            [
                "title" => 'Animal Farm',
                "release_date" => '1945-08-17',
                "author_id" => '3',
                "categories_id" => '2',
                "number_of_pages" => '493',
                "notes_id" => '2',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1325861570i/170448.jpg'
            ],
            [
                "title" => 'Homage to Catalonia',
                "release_date" => '1938-04-25',
                "author_id" => '3',
                "categories_id" => '3',
                "number_of_pages" => '232',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1394868278i/9646.jpg'
            ],
            [
                "title" => 'The Shining',
                "release_date" => '1977-01-28',
                "author_id" => '1',
                "categories_id" => '9',
                "number_of_pages" => '659',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg'
            ],
            [
                "title" => 'It',
                "release_date" => '1986-09-15',
                "author_id" => '1',
                "categories_id" => '9',
                "number_of_pages" => '1168',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1334416842i/830502.jpg'
            ],
            [
                "title" => 'The Stand',
                "release_date" => '1978-01-01',
                "author_id" => '1',
                "categories_id" => '9',
                "number_of_pages" => '823',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1674820514i/87591651.jpg'
            ],
            [
                "title" => 'Misery',
                "release_date" => '1987-06-08',
                "author_id" => '1',
                "categories_id" => '2',
                "number_of_pages" => '370',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554220401i/10614.jpg'
            ],
            [
                "title" => 'Carrie',
                "release_date" => '1974-01-01',
                "author_id" => '1',
                "categories_id" => '2',
                "number_of_pages" => '272',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1166254258i/10592.jpg'
            ],
            [
                "title" => 'The Gunslinger',
                "release_date" => '1982-06-01',
                "author_id" => '1',
                "categories_id" => '2',
                "number_of_pages" => '231',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554220416i/43615.jpg'
            ],
            [
                "title" => "Alice's Adventures in Wonderland",
                "release_date" => '1871-12-27',
                "author_id" => '2',
                "categories_id" => '8',
                "number_of_pages" => '320',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1647953436i/60671823.jpg'
            ],
            [
                "title" => "Jabberwocky",
                "release_date" => '1872-01-01',
                "author_id" => '2',
                "categories_id" => '10',
                "number_of_pages" => '32',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328866147i/143466.jpg'
            ],
            [
                "title" => "The Hunting of the Snark",
                "release_date" => '1876-01-01',
                "author_id" => '2',
                "categories_id" => '10',
                "number_of_pages" => '27',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1173486610i/296866.jpg'
            ],
            [
                "title" => "Pride and Prejudice ",
                "release_date" => '1813-01-28',
                "author_id" => '4',
                "categories_id" => '6',
                "number_of_pages" => '279',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg'
            ],
            [
                "title" => "Sense and Sensibility",
                "release_date" => '1811-10-29',
                "author_id" => '4',
                "categories_id" => '6',
                "number_of_pages" => '409',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1397245675i/14935.jpg'
            ],
            [
                "title" => "Emma",
                "release_date" => '1815-12-23',
                "author_id" => '4',
                "categories_id" => '6',
                "number_of_pages" => '474',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1373627931i/6969.jpg'
            ],
            [
                "title" => "Brave New World",
                "release_date" => '1932-01-01',
                "author_id" => '5',
                "categories_id" => '1',
                "number_of_pages" => '268',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg'
            ],
            [
                "title" => "The Doors of Perception",
                "release_date" => '1956-01-01',
                "author_id" => '5',
                "categories_id" => '7',
                "number_of_pages" => '187',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1375947566i/5128.jpg'
            ],
            [
                "title" => "The Hitchhiker's Guide to the Galaxy",
                "release_date" => '2005-01-01',
                "author_id" => '6',
                "categories_id" => '5',
                "number_of_pages" => '216',
                "notes_id" => '1',
                "img" => 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1531891848i/11.jpg'
            ],

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
        }
        ;


        /* Notes */
        $noteArray =
            [
                [
                    'body' => 'player is the best ',
                    'books_id' => '1',
                    'user_id' => '1'
                ],
                [
                    'body' => ' anata no tame ni ',
                    'books_id' => '1',
                    'user_id' => '1'
                ],
                [
                    'body' => 'nandeyo mihary rukuban best',
                    'books_id' => '1',
                    'user_id' => '1'
                ],
                [
                    'body' => 'iplic is the riverz ',
                    'books_id' => '1',
                    'user_id' => '1'
                ],
                [
                    'body' => 'is teh ebst is alber best ',
                    'books_id' => '1',
                    'user_id' => '1'
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
        }
        ;


        /* Comments */

        $commentArray =
            [
                [
                    'body' => 'Comment 1 ',
                    'books_id' => '1',
                    'user_id' => '2'
                ],
                [
                    'body' => 'Comment 2 
                    Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 Comment 2 ',
                    'books_id' => '1',
                    'user_id' => '3'
                ],
                [
                    'body' => 'Comment 3 Comment 3 Comment 3 Comment 3 Comment 3 Comment 3 Comment 3 Comment 3 Comment 3 Comment 3 Comment 3 ',
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
                ],
                [
                    'body' => 'Comment 6 ',
                    'books_id' => '1',
                    'user_id' => '4'
                ],
                [
                    'body' => 'Comment 7 ',
                    'books_id' => '1',
                    'user_id' => '4'
                ],
                [
                    'body' => 'Comment 8 ',
                    'books_id' => '1',
                    'user_id' => '4'
                ],
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
        }
        ;

        if (true) {
            $message[] = 'input completed';
        } else {
            $message[] = 'input error';
        }

        return $message;
    }
}