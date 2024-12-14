<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Получаем JSON-данные из запроса
$data = json_decode(file_get_contents("php://input"), true);

// Проверка корректности данных
if ($data && isset($data['menuTitle']) && isset($data['submenuItems']) && isset($data['links'])) {
    try {
        // Подключение к базе данных SQLite
        $pdo = new PDO('sqlite:/Users/betpublic/Desktop/-----1----/-----1----/database.db');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Создаём таблицу
        $pdo->exec("CREATE TABLE IF NOT EXISTS menus (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            submenu TEXT NOT NULL,
            links TEXT NOT NULL
        )");

        // Вставляем данные
        $stmt = $pdo->prepare("INSERT INTO menus (title, submenu, links) VALUES (:title, :submenu, :links)");
        $stmt->execute([
            'title' => $data['menuTitle'],
            'submenu' => implode(', ', $data['submenuItems']),
            'links' => implode(', ', $data['links']),
        ]);

        echo json_encode(["success" => true, "message" => "Меню успішно збережено!"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Помилка: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Невірні дані!"]);
}
?>
