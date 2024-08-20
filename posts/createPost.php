<?php

function createPost($login, $link, $pdo) {
    $time = trim(date("Y-m-d-H-i-s", time()));
    $photoName = trim("userPosts/$login-$time.png");
    $ifp = fopen( "userPosts/$time.png", 'wb' ); 
    $data = explode( ',', $link );
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );
    fclose( $ifp );

    $sql = "INSERT INTO Posts(user_name, post) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(([$login, $photoName]));
    http_response_code(200);
    $res = [
        'status' => 'true',
        'message' => 'Post Create!'
    ];
    echo json_encode($res);
}

function getUserPosts($login, $pdo) {
    $posts = [];
    $sql = 'SELECT post FROM `Posts` WHERE user_name = ?';
    $query = $pdo->prepare($sql);
    $query->execute([$login]);
    $result = $query->fetchAll();
    for ($i=0;$i<count($result);$i++){
        $posts[] = $result[$i][0];
    }
    http_response_code(200);
    $res = [
        'status' => 'true',
        'message' => $posts
    ];
    echo json_encode($res);
}



?>