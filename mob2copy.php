<?php
// Отримуємо сирі дані
$requestPayload = file_get_contents("php://input");
$data = json_decode($requestPayload, true);

// Перевіряємо, чи всі дані передані
if (!$data || !isset($data['title']) || !isset($data['submenu'])) {
    echo json_encode(['success' => false, 'message' => 'Некоректні дані.']);
    exit;
}

// Генеруємо шлях до файлу
$filename = "menu_data.json";

// Зберігаємо дані в JSON файл
if (file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Помилка збереження.']);
}
?>
