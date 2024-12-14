document.getElementById('menuForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Отримуємо значення з форми
    const menuTitle = document.getElementById('menuTitle').value.trim();
    const submenuItems = document.getElementById('submenuItems').value.split(',').map(item => item.trim());
    const links = document.getElementById('links').value.split(',').map(link => link.trim());

    // Перевірка на кількість пунктів і посилань
    if (submenuItems.length !== links.length) {
        alert('Кількість пунктів підменю і посилань має співпадати!');
        return;
    }

    // Створюємо об'єкт даних
    const data = {
        title: menuTitle,
        submenu: submenuItems.map((item, index) => ({
            name: item,
            link: links[index]
        }))
    };

    console.log('Відправка даних на сервер:', data); // Додаємо для дебагу

    // Відправка на сервер
    fetch('save_menu.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) { // Перевірка статусу відповіді
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log('Результат з сервера:', result); // Додаємо для дебагу
        if (result.success) {
            alert('Дані успішно збережено!');
        } else {
            alert('Помилка: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Помилка під час виконання запиту:', error);
        alert('Виникла помилка! Перевірте консоль для деталей.');
    });
});
