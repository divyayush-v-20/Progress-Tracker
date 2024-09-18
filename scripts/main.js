let currentUser = localStorage.getItem('currentUser');
let users = JSON.parse(localStorage.getItem('users')) || [];
let tasks = [];

function loadTasks() {
    if (currentUser) {
        const user = users.find(u => decrypt(u.username) === currentUser);
        if (user) {
            tasks = user.tasks || [];
            renderTasks();
            updateProgress();
        } 
        else {
            console.error('No user found');
        }
    }
    else {
        console.error('No current user found.');
    }
}

function saveTasks() {
    if (currentUser) {
        const userIndex = users.findIndex(u => decrypt(u.username) === currentUser);
        if (userIndex !== -1) {
            users[userIndex].tasks = tasks;
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            console.error('User index not found.');
        }
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})" style = "background-color : #c62828">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
        updateProgress();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
    updateProgress();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    updateProgress();
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    progressCircle.set(progressPercentage / 100)
    document.getElementById('progress-text').textContent = `${Math.round(progressPercentage)}% Complete`;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

function encrypt(str) {
    return str.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode((charCode + 7) % 128);
    }).join('');
}

function decrypt(str) {
    return str.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode((charCode - 7 + 128) % 128);
    }).join('');
}

let progressCircle = new ProgressBar.Circle('#progress-circle', {
    color: '#1db954',
    strokeWidth: 10,
    trailWidth: 1,
    trailColor: '#333',
    easing: 'easeInOut',
    duration: 0  
});

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});
document.getElementById('logout-btn').addEventListener('click', logout);

let greeting = document.getElementById('greeting');
greeting.innerText = `Welcome ${currentUser}`;

loadTasks();