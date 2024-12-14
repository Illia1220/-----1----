// Обробник події для форми
document.getElementById('menuForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Запобігає відправці форми

    // Отримуємо значення з форми
    const menuTitle = document.getElementById('menuTitle').value;
    const submenuItems = document.getElementById('submenuItems').value.split(',').map(item => item.trim());
    const links = document.getElementById('links').value.split(',').map(link => link.trim());

    // Перевірка на коректність даних
    if (submenuItems.length !== links.length) {
        alert('Кількість пунктів підменю і посилань повинна співпадати!');
        return;
    }

    // Підготовка даних для відправки на сервер
    const dataToSend = {
        menuTitle: menuTitle,
        submenuItems: submenuItems,
        links: links
    };

    // Відправляємо дані на сервер через fetch
    fetch('http://localhost:8000/save_menu.php', { // Змінено шлях для роботи через локальний сервер
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Сервер відповів з помилкою: ' + response.status);
            }
            return response.json(); // Обробка відповіді сервера
        })
        .then(result => {
            // Відображення повідомлення залежно від результату
            if (result.success) {
                alert(result.message); // Виводимо успішне повідомлення
                // Оновлюємо динамічне меню на сторінці
                addDropdownMenu(dataToSend);
            } else {
                alert('Помилка: ' + result.message); // Виводимо повідомлення про помилку
            }
        })
        .catch(error => {
            alert('Помилка при відправці: ' + error.message); // Виводимо помилку на випадок помилок при з'єднанні
        });

    // Функція для додавання меню як дропдовн на сторінку
    function addDropdownMenu(data) {
        const menuElement = document.createElement('li');
        menuElement.classList.add('menu-item', 'dropdown');

        // Створюємо кнопку для головного пункту меню
        const titleElement = document.createElement('button');
        titleElement.classList.add('dropbtn');
        titleElement.textContent = data.menuTitle;
        menuElement.appendChild(titleElement);

        // Створюємо контейнер для підменю
        const submenuList = document.createElement('div');
        submenuList.classList.add('dropdown-content');

        // Додаємо підменю
        data.submenuItems.forEach((item, index) => {
            const submenuItem = document.createElement('a');
            submenuItem.href = data.links[index];
            submenuItem.textContent = item;
            submenuList.appendChild(submenuItem);
        });

        menuElement.appendChild(submenuList);

        // Додаємо створене меню в контейнер
    }

    // Очищаємо форму після додавання меню
    document.getElementById('menuForm').reset();
});
