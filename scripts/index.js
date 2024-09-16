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

const encrypt = (str) => {
    return str.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode((charCode + 7) % 128);
    }).join('');
}

const decrypt = (str) => {
    return str.split('').map(char =>{
        const charCode = char.charCodeAt(0);
        return String.fromCharCode((charCode - 7 + 128) % 128);
    }).join('');
}

const saveData = (username, password) => {

    if(/\s/.test(username)){
        alert('Username cannot contain spaces!');
        return;
    }
    if(/\s/.test(password)){
        alert('Password cannot contain spaces!');
        return;
    }
    if(password.length < 6 || password.length > 20){
        alert('Password should be between 6 and 20 characters!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.some(user => user.username === username)){
        alert('User already exists!');
        return;
    }

    users.push({username : encrypt(username), password : encrypt(password), tasks : []});
    localStorage.setItem('users', JSON.stringify(users));
    console.log('users after saving:', users);    
    alert('User registered successfully!');
    showLogin();
}

const authenticateUser = (username, password) => {
    // encrypting the current username and password as they are stored in encrypted form in the storage
    username = encrypt(username);
    password = encrypt(password);
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