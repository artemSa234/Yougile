document.addEventListener('DOMContentLoaded', () => {
  const kanbanBoard = document.getElementById('kanban-board');
  const columns = ['Запланированные задачи', 'Задачи в работе', 'Тестирование', 'Выполненные задачи'];

  // Пример данных
  const cardsData = [
    { id: 1, column: 'Запланированные задачи', title: 'Задача 1', description: 'Описание задачи 1', deadline: '2024-02-01' },
    // Добавьте еще карточек при необходимости
  ];

  const renderBoard = () => {
    kanbanBoard.innerHTML = '';

    columns.forEach(columnTitle => {
      const column = document.createElement('div');
      column.classList.add('column');
      column.innerHTML = `<h2>${columnTitle}</h2>`;

      const columnCards = cardsData.filter(card => card.column === columnTitle);
      columnCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (columnTitle === 'Выполненные задачи' && isCardOverdue(card.deadline)) {
          cardElement.classList.add('card-overdue');
        }
        cardElement.innerHTML = `
          <h3>${card.title}</h3>
          <p>${card.description}</p>
          <p>Дедлайн: ${card.deadline}</p>
        `;
        column.appendChild(cardElement);
      });

      kanbanBoard.appendChild(column);
    });
  };

  const isCardOverdue = (deadline) => {
    const today = new Date();
    const cardDeadline = new Date(deadline);
    return cardDeadline < today;
  };

  renderBoard();
});
// script.js
document.addEventListener('DOMContentLoaded', () => {
  const kanbanBoard = document.getElementById('kanban-board');
  const columns = ['Запланированные задачи', 'Задачи в работе', 'Тестирование', 'Выполненные задачи'];

  let cardsData = [
    { id: 1, column: 'Запланированные задачи', title: 'Задача 1', description: 'Описание задачи 1', deadline: '2024-02-01' },
    // Добавьте еще карточек при необходимости
  ];

  const renderBoard = () => {
    kanbanBoard.innerHTML = '';

    columns.forEach(columnTitle => {
      const column = document.createElement('div');
      column.classList.add('column');
      column.innerHTML = `<h2>${columnTitle}</h2>`;

      const columnCards = cardsData.filter(card => card.column === columnTitle);
      columnCards.forEach(card => {
        const cardElement = createCardElement(card);
        column.appendChild(cardElement);
      });

      // Добавление возможности создания карточек только в первом столбце
      if (columnTitle === 'Запланированные задачи') {
        const addCardButton = createAddCardButton(columnTitle);
        column.appendChild(addCardButton);
      }

      kanbanBoard.appendChild(column);
    });
  };

  const createCardElement = (card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    if (card.column === 'Выполненные задачи' && isCardOverdue(card.deadline)) {
      cardElement.classList.add('card-overdue');
    }
    cardElement.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <p>Дедлайн: ${card.deadline}</p>
      <button class="edit-button" onclick="editCard(${card.id})">Редактировать</button>
      <button class="delete-button" onclick="deleteCard(${card.id})">Удалить</button>
      ${card.column !== 'Выполненные задачи' ? `<button class="move-button" onclick="moveCard(${card.id}, '${card.column}')">Переместить</button>` : ''}
    `;
    return cardElement;
  };

  const createAddCardButton = (columnTitle) => {
    const addCardButton = document.createElement('button');
    addCardButton.innerText = 'Добавить задачу';
    addCardButton.onclick = () => {
      const newCard = {
        id: cardsData.length + 1,
        column: columnTitle,
        title: 'Новая задача',
        description: 'Описание новой задачи',
        deadline: '2024-03-01', // Установите срок дедлайна по умолчанию
      };
      cardsData.push(newCard);
      renderBoard();
    };
    return addCardButton;
  };

  const isCardOverdue = (deadline) => {
    const today = new Date();
    const cardDeadline = new Date(deadline);
    return cardDeadline < today;
  };

  window.editCard = (cardId) => {
    const cardIndex = cardsData.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      const updatedTitle = prompt('Введите новый заголовок', cardsData[cardIndex].title);
      const updatedDescription = prompt('Введите новое описание', cardsData[cardIndex].description);
      if (updatedTitle !== null && updatedDescription !== null) {
        cardsData[cardIndex] = {
          ...cardsData[cardIndex],
          title: updatedTitle,
          description: updatedDescription,
        };
        renderBoard();
      }
    }
  };

  window.deleteCard = (cardId) => {
    const confirmed = confirm('Вы уверены, что хотите удалить эту задачу?');
    if (confirmed) {
      cardsData = cardsData.filter(card => card.id !== cardId);
      renderBoard();
    }
  };

  window.moveCard = (cardId, currentColumn) => {
    const targetColumn = columns.indexOf(currentColumn) + 1;
    if (targetColumn < columns.length) {
      cardsData = cardsData.map(card => (
        card.id === cardId ? { ...card, column: columns[targetColumn] } : card
      ));
      renderBoard();
    }
  };

  renderBoard();
});