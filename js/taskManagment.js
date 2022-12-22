let l = console.log;

const difficulties = [
    '',
    'Easy',
    'Not so easy',
    'Medium',
    'Hard',
    'Hardcore'
];

// СОХРАНЕНИЕ ЗАДАЧ В ЛОКАЛ СТОРЕДЖ

let id = 0;
let users = {};
let tasks = [];
let activeUser;
let theme = true;

const createNewTaskForm = () => {
    closeAllTasks();

    document.getElementById('interface').remove();

    let newForm = elementCreator({ element: 'div', id: 'taskCreation', className: 'form' });
    let fieldSet = elementCreator({ element: 'div', className: 'fieldset' })
    fieldSet.htmlelement.style =
        `background-color: ${theme ? "rgb(226 220 255)" : "rgb(80 80 80)"};
        color: ${theme ? "black" : "white"};`;
    let newLegend = elementCreator({ element: 'legend' })
    newLegend.setText('Creating new task');

    let warningBox = elementCreator({ element: 'div', className: 'labelBox' });
    let exitButton = elementCreator({ element: 'button', type: 'button' })
    exitButton.setText('Close');
    exitButton.setOnClick(function () {
        document.getElementById('taskCreation').remove();
        createPage();
        showTasks();
    })

    let warningLabel = elementCreator({ element: 'label', id: 'warning' });
    warningBox.setChild([exitButton, warningLabel]);

    let lvlBox = elementCreator({ element: 'div', className: 'inputBox' });

    let lvllabel = elementCreator({ element: 'label' })
    lvllabel.setText('Select difficulty of task ');

    let lvlInput = elementCreator({ element: 'select', id: 'lvl', className: 'input' });
    difficulties.forEach((difficulty) => {
        let dif = elementCreator({ element: 'option' });
        dif.setText(difficulty)
        lvlInput.setChild([dif]);
    })
    lvlBox.setChild([lvllabel, lvlInput]);

    let timeBox = elementCreator({ element: 'div', className: 'inputBox' });

    let datelabel = elementCreator({ element: 'label' });
    datelabel.setText('Enter deadline ');

    let dateInput = elementCreator({ element: 'input', id: 'date', className: 'input', type: 'date' });
    timeBox.setChild([datelabel, dateInput]);

    let targetUserBox = elementCreator({ element: 'div', className: 'inputBox' });

    let targetUserlabel = elementCreator({ element: 'label' });
    targetUserlabel.setText('Enter recipients name ');

    let targetUserInput = elementCreator({ element: 'select', id: 'targetUser', className: 'input' });
    for (var user in users) {
        l(users)
        if(!users[user]) continue;
        let option = elementCreator({ element: 'option' });
        option.setText(user);
        targetUserInput.setChild([option]);
    }
    targetUserBox.setChild([targetUserlabel, targetUserInput]);

    let finishButton = elementCreator({ element: 'button', type: 'button' });
    finishButton.setOnClick(getData);
    finishButton.setText('Create task');

    fieldSet.setChild([
        newLegend,
        warningBox,
        container('inputBox', 'text', 'name', 'Enter name of task '),
        container('inputBox', 'text', 'text', 'Enter descriprion of the task '),
        lvlBox,
        timeBox,
        targetUserBox,
        finishButton
    ])

    newForm.setChild([fieldSet]);
    newForm.setParent(document.body);
}

const getData = () => {
    let name = document.getElementById('name').value;
    let textOfTask = document.getElementById('text').value;
    let lvl = document.getElementById('lvl').value;
    let timeOfEnding = document.getElementById('date').value;
    let targetUser = document.getElementById('targetUser').value;

    if (!name || !text || !lvl || !date) {
        warningToHTML('All fields must be filled');
        return;
    }

    createPage();

    let task = new Task(name, textOfTask, lvl, timeOfEnding, id, targetUser, activeUser);

    ++id;

    users[targetUser].tasks.push(task);

    let form = document.getElementById('taskCreation');
    document.body.removeChild(form);

    //сортировка задач по приоритету
    users[activeUser].tasks.sort((prev, next) => prev.priority() - next.priority());

    showTasks();
}

const createPage = () => {

    let buttonBox = elementCreator({ element: 'div', id: 'interface', className: 'buttonBox' });
    let logoutButton = elementCreator({ element: 'button', id: 'intarface' });
    let changeThemeButton = elementCreator({ element: 'button', id: 'intarface' });

    logoutButton.setText('Log out');
    logoutButton.setOnClick(function () {
        localStorage.setItem('login', JSON.stringify(''));
        localStorage.setItem('password', JSON.stringify(''));
        closeAllTasks();
        document.getElementById('interface').remove();
        loginPage();
    });

    changeThemeButton.setText('Change theme');
    changeThemeButton.setOnClick(function () {
        theme = !theme;
        document.getElementById("body").style = `background-color: ${theme ? "rgb(199 186 186)" : "rgb(36 36 36)"}`;
    })

    let createTaskButton = elementCreator({ element: 'button', id: 'taskcreation' });

    createTaskButton.setText('Create new task');
    createTaskButton.setOnClick(createNewTaskForm);

    buttonBox.setChild([logoutButton, createTaskButton, changeThemeButton]);
    buttonBox.setParent(document.body);
}

const getLoginData = () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let checkbox = document.querySelector('#checkbox').checked;

    if (!users[username]) {
        warningToHTML('The user with the given name was not found. Check the entered data or register!');
        return;
    }

    if (users[username].password != password) {
        warningToHTML('Invalid password!');
        return;
    }

    document.getElementById('loginForm').remove();
    activeUser = username;

    if (checkbox) {
        localStorage.setItem('login', JSON.stringify(username));
        localStorage.setItem('password', JSON.stringify(password));
    }

    createPage();
    showTasks();
}

const getRegisterData = () => {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    const validatePassword = (password) => {
        return String(password)
            .match(
                /(?=.*[0-9])(?=.*[!@#$%^-_&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&-_*]{6,}/
            );
    }

    if (!name || !surname || !username || !email || !password || !repeatPassword) {
        warningToHTML('All fields must be filled!');
        return;
    }

    if (users[username]) {
        warningToHTML('Selected login is already in use!');
        return;
    }

    if (!validateEmail(email)) {
        warningToHTML('Email is incorrect!');
        return;
    }

    if (!validatePassword(password)) {
        warningToHTML('Password must be at least 6 symbols including numbers, uppercase letters and special symbols!');
        return;
    }

    if (password != repeatPassword) {
        warningToHTML('Passwords do not match!');
        return;
    }

    let newUser = new User(name, surname, username, email, password);

    users[username] = newUser;

    localStorage.setItem('users', JSON.stringify(users));

    return 1;
}

const registerPage = () => {

    let regForm = elementCreator({ element: 'div', id: 'regForm', className: 'form' });
    let fieldSet = elementCreator({ element: 'div', className: 'fieldset' });
    fieldSet.htmlelement.style =
        `background-color: ${theme ? "rgb(226 220 255)" : "rgb(80 80 80)"};
        color: ${theme ? "black" : "white"};`;
    let warningBox = elementCreator({ element: 'div', className: 'labelBox' });
    let backButton = elementCreator({ element: 'button', type: 'button' });

    backButton.setText('back to login');
    backButton.setOnClick(function () {
        document.getElementById('regForm').remove();
        loginPage();
    });

    backButton.setParent(document.body);

    let warningLabel = elementCreator({ element: 'label', id: 'warning' });
    warningBox.setChild([backButton, warningLabel]);

    let buttonBox = elementCreator({ element: 'div', className: 'buttonBox' });
    let regButton = elementCreator({ element: 'button', type: 'button' });

    regButton.setText('Register');
    regButton.setOnClick(function () {
        if (getRegisterData()) {
            document.getElementById('regForm').remove();
            loginPage();
        };
    })
    buttonBox.setChild([regButton]);

    fieldSet.setChild([warningBox,
        container('labelBox', 'name', 'name', 'Name: '),
        container('labelBox', 'name', 'surname', 'Surname: '),
        container('labelBox', 'name', 'username', 'Username: '),
        container('labelBox', 'email', 'email', 'Email: '),
        container('labelBox', 'password', 'password', 'Password: '),
        container('labelBox', 'password', 'repeatPassword', 'Repeat password: '),
        buttonBox
    ]);

    regForm.setChild([fieldSet]);
    regForm.setParent(document.body);
}

const loginPage = () => {

    let loginForm = elementCreator({ element: 'div', id: 'loginForm', className: 'form' });
    let fieldSet = elementCreator({ element: 'div', className: 'fieldset' });
    fieldSet.htmlelement.style =
        `background-color: ${theme ? "rgb(226 220 255)" : "rgb(80 80 80)"};
        color: ${theme ? "black" : "white"};`;

    let warningLabel = elementCreator({ element: 'label', id: 'warning' });
    let buttonBox = elementCreator({ element: 'div', className: 'buttonBox' });
    let loginButton = elementCreator({ element: 'button', type: 'button' });

    loginButton.setText('Sign In');
    loginButton.setOnClick(getLoginData);

    let regButton = elementCreator({ element: 'button', type: 'button' });

    regButton.setText('Sign Up');
    regButton.setOnClick(function () {
        document.getElementById('loginForm').remove();
        registerPage();
    })

    let box = elementCreator({ element: 'div', id: 'box' });
    let checkBox = elementCreator({ element: 'div', className: 'checkbox' });
    let checkBoxLabel = elementCreator({ element: 'label' });
    checkBoxLabel.setText('Remember me ');

    let checkBoxInput = elementCreator({ element: 'input', id: 'checkbox', type: 'checkbox' });

    checkBox.setChild([checkBoxInput]);
    box.setChild([checkBoxLabel, checkBox]);
    buttonBox.setChild([loginButton, regButton]);
    fieldSet.setChild([
        warningLabel,
        container('labelBox', 'name', 'username', 'Username: '),
        container('labelBox', 'password', 'password', 'Password: '),
        box,
        buttonBox
    ]);
    loginForm.setChild([fieldSet]);
    loginForm.setParent(document.body);
}

const showTasks = () => {
    closeAllTasks();
    users[activeUser].tasks.forEach((task) => task.createForm());
    localStorage.setItem('users', JSON.stringify(users));
}

const closeAllTasks = () => {
    document.querySelectorAll('task').forEach((task) => task.remove());
}

const warningToHTML = (errText) => {
    document.getElementById('warning').innerHTML = errText;
    console.error(errText);
}

const objToTask = (obj) => {
    let task = new Task(obj.name, obj.textOfTask, obj.lvl, obj.timeOfEnding, obj.id, obj.targetUser, obj.author);
    return task;
}

document.getElementById("body").style = `background-color: ${theme ? "rgb(199 186 186)" : "rgb(36 36 36)"}`;

let log = JSON.parse(localStorage.getItem('login'));
let paswd = JSON.parse(localStorage.getItem('password'));
let us = JSON.parse(localStorage.getItem('users'));

if (us) {
    Object.keys(us).forEach(key => {
        if (!us[key]) {
            return;
        }
        us[key].tasks = us[key].tasks.map((task) => {
            return objToTask(task)
        })
    })
}

if (!us) {
    users = [];
    loginPage();
}

if (log && paswd) {
    users = us;
    activeUser = log;
    createPage();
    showTasks();
}

if (us && !(log && paswd)) {
    users = us;
    localStorage.setItem('login', JSON.stringify(''));
    localStorage.setItem('password', JSON.stringify(''));
    loginPage();
}