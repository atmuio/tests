// Seleziona gli elementi del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterButtons = document.querySelectorAll('.filter-btn');

// Array per memorizzare i compiti
let tasks = [];

// Carica i compiti dal localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Salva i compiti nel localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Aggiunge un nuovo compito
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        return; // Non aggiungere compiti vuoti
    }
    
    const newTask = {
        id: Date.now(), // Usa il timestamp come ID univoco
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = ''; // Pulisce l'input
    
    saveTasks();
    renderTasks();
}

// Elimina un compito
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Cambia lo stato completato/non completato
function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

// Cancella tutti i compiti completati
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// Filtra i compiti (tutti, attivi, completati)
function filterTasks(filterType) {
    // Aggiorna la classe active sui pulsanti di filtro
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filterType) {
            btn.classList.add('active');
        }
    });
    
    // Filtra i compiti in base al tipo selezionato
    const taskItems = document.querySelectorAll('.todo-item');
    taskItems.forEach(item => {
        switch (filterType) {
            case 'all':
                item.style.display = 'flex';
                break;
            case 'active':
                item.classList.contains('completed') 
                    ? item.style.display = 'none' 
                    : item.style.display = 'flex';
                break;
            case 'completed':
                item.classList.contains('completed') 
                    ? item.style.display = 'flex' 
                    : item.style.display = 'none';
                break;
        }
    });
}

// Renderizza i compiti nella lista
function renderTasks() {
    taskList.innerHTML = ''; // Pulisce la lista
    
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        taskItem.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="todo-text">${task.text}</span>
            <button class="delete-btn">×</button>
        `;
        
        // Aggiungi gli event listener per ogni elemento del compito
        const checkbox = taskItem.querySelector('.todo-checkbox');
        const deleteBtn = taskItem.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(taskItem);
    });
    
    // Aggiorna il conteggio dei compiti attivi
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${activeTasks} compiti rimasti`;
    
    // Ottieni il filtro attivo corrente e applica nuovamente il filtro
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    filterTasks(activeFilter);
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Aggiungi event listener ai pulsanti di filtro
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterType = btn.getAttribute('data-filter');
        filterTasks(filterType);
    });
});

// Carica i compiti al caricamento della pagina
document.addEventListener('DOMContentLoaded', loadTasks);