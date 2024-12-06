<?php
header('Content-Type: application/json');

// Перевірка методу запиту
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Отримуємо дані з POST-запиту
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['title']) || !isset($data['submenu'])) {
        echo json_encode(['success' => false, 'message' => 'Некоректні дані']);
        exit;
    }

    // Збереження даних у файл
    $filename = 'menu_data.json';
    $menuData = [
        'title' => $data['title'],
        'submenu' => $data['submenu']
    ];

    if (file_put_contents($filename, json_encode($menuData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Дані успішно збережено']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Не вдалося зберегти дані']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Некоректний метод запиту']);
}
