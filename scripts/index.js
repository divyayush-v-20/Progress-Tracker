const showLogin = () => {
    document.getElementById('login-form-section').style.display = 'block';
    document.getElementById('signup-form-section').style.display = 'none';
    document.getElementById('login-btn').style.backgroundColor = '#1db954';
    document.getElementById('register-btn').style.backgroundColor = 'transparent';
}
const showSignup = () => {
    document.getElementById('login-form-section').style.display = 'none';
    document.getElementById('signup-form-section').style.display = 'block';
    document.getElementById('register-btn').style.backgroundColor = '#1db954';
    document.getElementById('login-btn').style.backgroundColor = 'transparent';
}

const togglePasswordVisibility = (passwordID, checkboxID) => {
    const password = document.getElementById(passwordID);
    const showPass = document.getElementById(checkboxID);
    if(showPass.checked){
        password.type = 'text';
    }
    else{
        password.type = 'password';
    }
}

const saveData = (username, password) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.some(user => user.username === username)){
        alert('User already exists!');
        return;
    }

    users.push({username : username, password : password, tasks : []});
    localStorage.setItem('users', JSON.stringify(users));
    console.log('users after saving:', users);    
    alert('User registered successfully!');
    showLogin();
}

const authenticateUser = (username, password) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('users for authentication:', users);
    let user = users.find(user => user.username === username && user.password === password);
    if(user){
        alert('Login successful!');
    }
    else{
        alert('Invalid username or password');
    }
}

document.getElementById('login-form').addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    authenticateUser(username, password);
});

document.getElementById('signup-form').addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    saveData(username, password);
});