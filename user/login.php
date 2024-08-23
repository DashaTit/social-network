<?php

function login($login, $password, $pdo)
{
    try {
        $sql = 'SELECT id FROM users WHERE login = ? AND password = ?';
        $query = $pdo->prepare($sql);
        $query->execute([$login, $password]);
        if ($query->rowCount() == 0) {
            http_response_code(409);
            $res = [
                'status' => 'false',
                'message' => 'this user is not exist'
            ];
            echo json_encode($res);
        } else {
            $photo = getProfilePhoto($login, $pdo);
            http_response_code(200);
            $res = [
                'status' => 'true',
                'message' => $photo
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

function getProfilePhoto($login, $pdo)
{
    $sql = 'SELECT photo FROM users WHERE login = ?';
    $query = $pdo->prepare($sql);
    $query->execute([$login]);
    $data = $query->fetchAll();
    $imagedata = file_get_contents($data[0]["photo"]);
    $base64 = base64_encode($imagedata);
    return json_encode("data:image/png;base64,$base64");
}
