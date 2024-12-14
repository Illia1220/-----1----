document.getElementById('menuForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Отримуємо значення з форми
    const menuTitle = document.getElementById('menuTitle').value;
    const submenuItems = document.getElementById('submenuItems').value.split(',');
    const links = document.getElementById('links').value.split(',');

    // Перевірка на кількість пунктів і посилань
    if (submenuItems.length !== links.length) {
        alert('Кількість пунктів підменю і посилань має співпадати!');
        return;
    }

    // Створюємо об'єкт даних
    const data = {
        title: menuTitle,
        submenu: submenuItems.map((item, index) => ({
            name: item.trim(),
            link: links[index].trim()
        }))
    };

    // Відправка на сервер
    fetch('save_menu.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Дані успішно збережено!');
        } else {
            alert('Помилка: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Помилка:', error);
        alert('Виникла помилка!');
    });
});
