<?php
// точка входа
require "./User/CreateUser.php"; // user create
require "./controllers/userControllers.php"; // валидация
require "./config/connect.php"; // подключение к бд
require "./user/login.php"; // login 
require "./posts/createPost.php"; //create post


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *, Autorization');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');

header('Content-type: application/json'); // чтобы запрос автоматически приходил в кчестве json
$method = $_SERVER['REQUESR_METHOD'];
$type = $_GET['q']; // получение url строки (все, что после основного адреса)



$login = $_POST['login'];
$password = $_POST['password'];
$checkPassword = $_POST['checkPassword'];
$status = isAdmin($login, $password);


switch ($type) { // проверка типа запроса
    case 'registration':
        http_response_code(200);
        $res = [
            'status' => 'true',
            'message' => $_POST,
        ];
        echo json_encode($res);
        verificationTest($login, $password, $checkPassword); // validation
        createUser($login, $password, $pdo, $status);
        break;
    case 'login':
        verificationTest($login, $password, $checkPassword); // validation
        login($login, $password, $pdo);
        break;
    case 'profile':
        echo json_encode($res);
        setPhoto($login, $_POST['photo'], $pdo);
        break;
    case 'photo':
        $login = $_GET['login'];
        getProfilePhoto($login, $pdo);
    case 'create':
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata,true);
        createPost($request['login'], $request, $pdo);
}
