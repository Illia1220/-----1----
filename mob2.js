function swapBlocks() {
    // Находим элементы блоков по их ID
    const block1 = document.getElementById("block1");
    const block5 = document.getElementById("block5");

    // Сохраняем содержимое блоков
    const block1Content = block1.innerHTML;
    const block5Content = block5.innerHTML;

    // Меняем содержимое местами
    block1.innerHTML = block5Content;
    block5.innerHTML = block1Content;
}

// Выполняем замену при загрузке страницы
document.addEventListener("DOMContentLoaded", swapBlocks);



function calculatePentagonArea() {
    // Значение стороны пятиугольника
    const sideLength = 5; // Примерное значение

    // Проверяем, чтобы значение стороны было числом
    if (isNaN(sideLength) || sideLength <= 0) {
        console.error("Некорректное значение стороны пятиугольника.");
        return;
    }

    // Вычисляем площадь пятиугольника
    const area = (5 / 4) * Math.pow(sideLength, 2) * (1 / Math.tan(Math.PI / 5));

    // Находим блок с id "block4"
    const block4 = document.getElementById("block4");

    // Проверяем, найден ли блок
    if (block4) {
        // Проверяем, добавляли ли мы уже результат
        if (!block4.querySelector(".pentagon-area")) {
            // Добавляем результат в конец блока
            block4.innerHTML += `<p class="pentagon-area">Площа п'ятикутника зі стороною ${sideLength}: ${area.toFixed(2)}</p>`;
        }
    } else {
        console.error("Блок 'block4' не найден.");
    }
}

// Выполняем функцию при загрузке страницы
document.addEventListener("DOMContentLoaded", calculatePentagonArea);

// Функция для работы с cookies
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return value;
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}




// Основная функция
function handlePageLoad() {
    const savedNumber = getCookie('reversedNumber');

    if (savedNumber) {
        // Если есть cookie, показываем диалоговое окно
        if (confirm(`Значення з cookies: ${savedNumber}. Якщо натиснути "OK" cookies будуть видалені.`)) {
            deleteCookie('reversedNumber');
            alert('Cookies видалені. Сторінка буде перезавантажена.');
            location.reload();
        }
    } else {
        // Если cookies нет, добавляем обработчик на форму
        const form = document.getElementById('numberForm');
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault(); // Предотвращаем перезагрузку страницы

                const numberInput = document.getElementById('numberInput').value;
                if (numberInput && Number(numberInput) > 0) {
                    // Переворачиваем число
                    const reversedNumber = numberInput.split('').reverse().join('');

                    // Сохраняем результат в cookies
                    setCookie('reversedNumber', reversedNumber, 1);

                    // Показываем результат через диалоговое окно
                    alert(`Перевернуте число: ${reversedNumber}`);
                } else {
                    alert('Введить коректне натуральне число!');
                }
            });
        }
    }
}

// Выполняем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', handlePageLoad);





// Функция для установки цвета рамок всех блоков
function setBorderColor(color) {
    // Находим все блоки с id block1, block2, block3 и т.д.
    for (let i = 1; i <= 5; i++) {
        const block = document.getElementById(`block${i}`);
        if (block) {
            block.style.borderColor = color;
        }
    }
}

// Функция для сохранения цвета в localStorage
function saveBorderColor(color) {
    localStorage.setItem('borderColor', color);
}

// Функция для загрузки цвета из localStorage
function loadBorderColor() {
    const savedColor = localStorage.getItem('borderColor');
    if (savedColor) {
        setBorderColor(savedColor);
    }
}

// Основной обработчик
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем сохраненный цвет рамок
    loadBorderColor();

    // Обработчик на кнопку "Применить цвет"
    const applyColorButton = document.getElementById('applyColorButton');
    const colorInput = document.getElementById('borderColorInput');

    if (applyColorButton && colorInput) {
        applyColorButton.addEventListener('click', () => {
            const selectedColor = colorInput.value;
            setBorderColor(selectedColor); // Устанавливаем цвет рамок
            saveBorderColor(selectedColor); // Сохраняем цвет в localStorage
        });
    }
});







document.addEventListener('DOMContentLoaded', () => {
    const block5 = document.getElementById('block5');
    const block4 = document.getElementById('block4');

    block5.addEventListener('click', () => {
        if (!block4.querySelector('.dynamic-form')) {
            const form = document.createElement('form');
            form.classList.add('dynamic-form');

            // Формируем поля ввода
            form.innerHTML = `
                <div class="form-row">
                    <input type="text" id="cssSelector" placeholder="Елемент (li)" />
                </div>
                <div class="form-row">
                    <input type="text" id="cssProperty" placeholder="Властивість (color)" />
                </div>
                <div class="form-row">
                    <input type="text" id="cssValue" placeholder="Значення (#ff0000)" />
                </div>
                <div class="form-row button-container">
                    <button type="button" id="saveCss">Зберегти CSS</button>
                    <button type="button" id="clearCss">Очистити CSS</button>
                </div>
            `;

            block4.appendChild(form);

            const saveButton = form.querySelector('#saveCss');
            const clearButton = form.querySelector('#clearCss');

            // Регулярное выражение для проверки корректного значения цвета
            const colorRegex = /^(#([0-9A-Fa-f]{3}){1,2}|rgb(a)?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*(0(\.\d+)?|1))?\))$/;

            saveButton.addEventListener('click', () => {
                const selector = form.querySelector('#cssSelector').value;
                const property = form.querySelector('#cssProperty').value;
                const value = form.querySelector('#cssValue').value;

                // Проверяем, что свойство только color или background-color
                if (property !== 'color' && property !== 'background-color') {
                    alert('Помилка: Можна використовувати тільки властивості color або background-color.');
                    return;
                }

                // Проверка на правильный формат цвета
                if (!colorRegex.test(value)) {
                    alert('Помилка: Введіть правильний колір (наприклад, #ff0000, rgb(255, 0, 0)).');
                    return;
                }

                // Проверка, что все поля заполнены
                if (selector && property && value) {
                    const targetElements = document.querySelectorAll(selector);
                    if (targetElements.length > 0) {
                        targetElements.forEach((el) => {
                            el.style[property] = value;
                        });

                        let savedStyles = JSON.parse(localStorage.getItem('dynamicCss')) || [];
                        savedStyles.push({ selector, property, value });
                        localStorage.setItem('dynamicCss', JSON.stringify(savedStyles));

                        alert('CSS додано та збережено для всіх елементів!');
                    } else {
                        alert('Єлементи по заданому селектору не знайдені!');
                    }
                } else {
                    alert('Заповніть усі поля!');
                }
            });

            clearButton.addEventListener('click', () => {
                const savedStyles = JSON.parse(localStorage.getItem('dynamicCss'));
                if (savedStyles) {
                    savedStyles.forEach(({ selector, property }) => {
                        const targetElements = document.querySelectorAll(selector);
                        targetElements.forEach((el) => {
                            el.style[property] = '';
                        });
                    });

                    localStorage.removeItem('dynamicCss');
                    alert('Всі CSS-стилі видалено!');
                } else {
                    alert('Збережених CSS-стилей не знайдено.');
                }
            });
        }
    });

    const applySavedStyles = () => {
        const savedStyles = JSON.parse(localStorage.getItem('dynamicCss'));
        if (savedStyles) {
            savedStyles.forEach(({ selector, property, value }) => {
                const targetElements = document.querySelectorAll(selector);
                targetElements.forEach((el) => {
                    el.style[property] = value;
                });
            });
        }
    };

    applySavedStyles();
});

