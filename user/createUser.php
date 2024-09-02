<?php



function createUser($login, $password, $pdo, $status)
{
    try {
        $sql = 'SELECT id FROM Users WHERE login = ? AND password = ?';
        $query = $pdo->prepare($sql);
        $query->execute([$login, $password]);
        if ($query->rowCount() === 0) {
            $sql = "INSERT INTO Users(login, password, status) VALUES (?, ?, ?)";
            $statement = $pdo->prepare($sql);
            $statement->execute(([$login, $password, $status]));
            http_response_code(200);
            $res = [
                'status' => 'true',
                'message' => 'register!'
            ];
            echo json_encode($res);
        } else {
            http_response_code(409);
            $res = [
                'status' => 'false',
                'message' => 'this user is always exist'
            ];
            echo json_encode($res);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        $res = [
            'status' => 'false',
            'message' => $e->getMessage()
        ];
        echo json_encode($res);
    }
}

function setPhoto($login, $photo, $pdo)
{
    $photoName = "assets/$login.png";
    $ifp = fopen( "assets/$login.png", 'wb' ); 
    $data = explode( ',', $photo );
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );
    fclose( $ifp ); 
    $sql = "UPDATE Users SET photo = ? WHERE login = ?";
    $statement = $pdo->prepare($sql);
    $statement->execute(([$photoName, $login]));
    http_response_code(200);
    $res = [
        'status' => 'true',
        'message' => 'profile photo change!'
    ];
    echo json_encode($res);
};

function profileSettings($login, $pdo) {
    $photo = getProfilePhoto($login, $pdo);
    $posts = getUserPosts($login, $pdo);

    http_response_code(200);
    $res = [
        'posts' => $posts,
        'photo' => $photo
    ];
    echo json_encode($res);
}

