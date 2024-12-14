<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

try {
    $pdo = new PDO('sqlite:/Users/betpublic/Desktop/-----1----/-----1----/database.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT title, submenu, links FROM menus");
    $menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($menus);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
