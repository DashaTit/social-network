<?php
// валидация

function verificationTest($login, $password, $checkPassword) {
    if (strlen(verificationPassword($password, $checkPassword)) !== 1) {
        die(verificationPassword($password, $checkPassword));
    }
    if (strlen(verificationLogin($login)) !== 1) {
        die(verificationLogin($login));
    }
}

function verificationPassword($password, $checkPassword)
{
    // if (strlen($password) <= 3) {
    //     http_response_code(400);
    //     $res = [
    //         "status" => 'false',
    //         "messge" => 'Длина пароля должна быть больше 3х символов'
    //     ];
    //     return json_encode($res);}
    if ($password !== $checkPassword) {
        http_response_code(400);
        $res = [
            "status" => 'false',
            "messge" => 'Пароли не совпадают'
        ];
        return json_encode($res);
    } else {
        http_response_code(200);
        return true;
    }
}

function verificationLogin($login)
{
    if (strlen($login) <= 3) {
        http_response_code(400);
        $res = [
            'status' => 'false',
            'message' => 'Длина логина должна быть больше 3х символов'
        ];
        return json_encode($res);
    } else {
        http_response_code(200);
        return true;
    }
}


function isAdmin($login, $password) {
    if ($login=="admin" && $password=="123") {
        return 'admin';
    } else {
        return 'user';
    }
}