<?php

function createPost($login, $link, $pdo) {
    $sql = "UPDATE Users SET post = ? WHERE login = $login";
    $stmt = $pdo->prepare($sql);
    foreach ($link as $row) {
        $stmt->bindParam($row['photo']);
        $stmt->execute();
    }
    http_response_code(200);
    $res = [
        'status' => 'true',
        'message' => 'Post Create!'
    ];
    echo json_encode($res);
}

?>