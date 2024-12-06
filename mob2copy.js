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

    // Створюємо новий елемент меню
    const menu = document.getElementById('dynamicMenu');
    const menuItem = document.createElement('li');
    menuItem.textContent = menuTitle;

    // Створюємо підменю
    const submenu = document.createElement('ul');
    submenu.classList.add('submenu');

    submenuItems.forEach((item, index) => {
        const submenuItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = links[index].trim();
        link.textContent = item.trim();
        submenuItem.appendChild(link);
        submenu.appendChild(submenuItem);
    });

    // Додаємо підменю до пункту меню
    menuItem.appendChild(submenu);
    menu.appendChild(menuItem);

    // Очищуємо форму
    document.getElementById('menuForm').reset();
});




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

    // Підготовка даних для збереження
    const data = {
        title: menuTitle,
        submenu: submenuItems.map((item, index) => ({
            name: item.trim(),
            link: links[index].trim()
        }))
    };

    // Відправка даних на сервер
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
                alert('Помилка збереження: ' + result.message);
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert('Помилка збереження даних.');
        });
});
