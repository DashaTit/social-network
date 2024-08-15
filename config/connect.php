<?php

require "db.php";

$dsn = "mysql:host=$host;dbname=$db_name;port=$port";
try {
	$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]); // подключение к бд
} catch (PDOException $e) {
    http_response_code(500);
    $res = [
        'status' => 'false',
        'message' => $e->getMessage()
    ];
	echo json_encode($res);
}