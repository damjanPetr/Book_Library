<?php

namespace Comments;

require __DIR__ . '/../database.php';

use Database\Database;

class Comments
{

    public function getAllComments()

    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'SELECT * FROM comments';

        $stm = $pdo->prepare($sql);
        $stm->execute();
        $result = $stm->fetchAll();
        return $result;
    }


    public function getAllBookComments($bookid)
    {
        $conn = new Database();
        $pdo = $conn->getConnection();
        $sql = 'SELECT * FROM comments where book_id=:bookid';

        $stm = $pdo->prepare($sql);
        $stm->execute(['bookid' => $bookid]);
        $result = $stm->fetchAll();
        return $result;
    }
}
