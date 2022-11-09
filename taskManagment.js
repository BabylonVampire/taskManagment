let l = console.log;

let ID = 0;

const difficulties = [
    '',
    'Easy',
    'Not so easy',
    'Medium',
    'Hard',
    'Hardcore'
];

let users = {};

let tasks = [];

function createNewTaskForm() {
    createTaskButton.style.visibility = 'hidden';

    //создание новой формы
    let newForm = document.createElement('div');
    newForm.id = 'taskCreation';
    newForm.className = 'form';
    
    let fieldSet = document.createElement('div');
    fieldSet.className = 'fieldset';

    //создание новой легенды
    let newLegend = document.createElement('legend');
    newLegend.innerHTML = 'Создание новой задачи';
    fieldSet.appendChild(newLegend);

    //p1

    let p1 = document.createElement('p');

    //label для ввода названия
    let namelabel = document.createElement('label');
    namelabel.for = 'name';
    namelabel.innerHTML = 'Введите название задачи ';
    p1.appendChild(namelabel);

    //input для ввода названия
    let nameInput = document.createElement('input');
    nameInput.className = 'input';
    nameInput.type = 'text';
    nameInput.id = 'name';
    p1.appendChild(nameInput);

    fieldSet.appendChild(p1);

    //p2

    let p2 = document.createElement('p');

    //label для ввода текста
    let textlabel = document.createElement('label');
    namelabel.for = 'text';
    textlabel.innerHTML = 'Введите текст задачи ';
    p2.appendChild(textlabel);

    //input для ввода текста
    let textInput = document.createElement('input');
    textInput.className = 'input';
    textInput.type = 'text';
    textInput.id = 'text';
    p2.appendChild(textInput);

    fieldSet.appendChild(p2)

    //p3

    p3 = document.createElement('p');

    //label для ввода сложности
    let lvllabel = document.createElement('label');
    lvllabel.innerHTML = 'Выберете сложность задачи ';
    p3.appendChild(lvllabel);

    //выбор сложности
    let lvlInput = document.createElement('select');
    lvlInput.className = 'input'
    lvlInput.id = 'lvl';
    for (i = 0; i < difficulties.length; ++i) {
        let option = document.createElement('option');
        option.innerHTML = difficulties[i];
        lvlInput.appendChild(option);
    }
    p3.appendChild(lvlInput);

    fieldSet.appendChild(p3);

    //p4

    p4 = document.createElement('p');

    //label сроков
    let datelabel = document.createElement('label');
    datelabel.innerHTML = 'Введите крайний срок сдачи ';
    p4.appendChild(datelabel);

    //input сроков
    let dateInput = document.createElement('input');
    dateInput.className = 'input';
    dateInput.id = 'date';
    dateInput.type = 'date';
    p4.appendChild(dateInput);

    fieldSet.appendChild(p4);

    //кнопка завершения
    let finishButton = document.createElement('button');
    finishButton.type = 'button';
    finishButton.onclick = getData;
    finishButton.innerHTML = 'Создать задачу';
    fieldSet.appendChild(finishButton);

    newForm.appendChild(fieldSet);
    document.body.appendChild(newForm);
}

class Task {
    constructor(name, textOfTask, lvl, timeOfEnding, id) {
        this.name = name;
        this.textOfTask = textOfTask;
        this.lvl = lvl;
        this.timeOfEnding = timeOfEnding;
        this.id = id;
    }
    remainingTime() {
        let date = new Date();
        let endingDate = parseInt(this.timeOfEnding.split('-')[2], 10);
        return endingDate - date.getDate();
    }
    priority() {
        let timeLeft = this.remainingTime();
        return timeLeft * this.lvl;
    }
    createForm() {
        //создание новой формы
        let newForm = document.createElement('task');
        newForm.className = 'form';
        
        let fieldSet = document.createElement('div');
        fieldSet.className = 'fieldset';

        //создание новой легенды
        let newLegend = document.createElement('legend');
        newLegend.innerHTML = this.name;
        fieldSet.appendChild(newLegend);

        let labelBox = document.createElement('div');
        labelBox.className = 'labelBox';

        let timelabel = document.createElement('label');
        let remainingTime = this.remainingTime();
        timelabel.innerHTML = "Deadline: " + Math.abs(remainingTime) + " day" + (Math.abs(remainingTime) == 1 ? "" : "s") + (remainingTime > 0 ? " left" : " late");
        labelBox.appendChild(timelabel);

        let lvllabel = document.createElement('label');
        lvllabel.innerHTML = "Difficulty: " + this.lvl;
        labelBox.appendChild(lvllabel);

        let textlabel = document.createElement('label');
        textlabel.innerHTML = "Task description:<br><br>" + this.textOfTask;

        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerHTML = 'finish the task';
        deleteButton.id = this.id;
        deleteButton.onclick = this.removeTask;

        fieldSet.appendChild(labelBox);
        fieldSet.appendChild(textlabel);
        fieldSet.appendChild(deleteButton);

        newForm.appendChild(fieldSet);
        document.body.appendChild(newForm);
    }
    removeTask() {
        for (let i = 0; i < tasks.length; ++i) {
            if (tasks[i].id == +this.id) {
                tasks.splice(i, 1);
            }
        }
        showTasks();
    }
}

class User {
    constructor(name, surname, username, email, password) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

function getData() {
    let name = document.getElementById('name').value;
    let text = document.getElementById('text').value;
    let lvl = document.getElementById('lvl').value;
    let date = document.getElementById('date').value;

    if (!name || !text || !lvl || !date) return;

    createTaskButton.style.visibility = 'visible';

    task = new Task(name, text, lvl, date, ID);

    ++ID;

    tasks.push(task);

    let form = document.getElementById('taskCreation');
    document.body.removeChild(form);

    task.createForm();
    //реализовать загрузку в бд
}

function createPage() {
    createTaskButton = document.createElement('button');
    createTaskButton.onclick = createNewTaskForm;
    createTaskButton.innerHTML = 'Create new task';
    document.body.appendChild(createTaskButton);
}

function getLoginData() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (!users[username]) {
        document.getElementById('warning').innerHTML = 'The user with the given name was not found. Check the entered data or register.';
        return;
    }

    if (users[username].password != password) {
        document.getElementById('warning').innerHTML = 'Invalid password';
        return;
    }

    document.getElementById('loginForm').remove();
    createPage();
}

function getRegisterData() {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;

    if (users[username]) {
        document.getElementById('warning').innerHTML = 'Selected login is already in use';
        return;
    }

    if (password != repeatPassword) {
        document.getElementById('warning').innerHTML = 'Passwords do not match';
        return;
    }

    let newUser = new User(name, surname, username, email, password);

    users[username] = newUser;

    return 1;
}

function registerPage() {
    let regFrom = document.createElement('div');
    regFrom.className = 'form';
    regFrom.id = 'regForm';

    let fieldSet = document.createElement('div');
    fieldSet.className = 'fieldset';

    let warningLabel = document.createElement('label');
    warningLabel.id = 'warning';
    fieldSet.appendChild(warningLabel);



    let nameBox = document.createElement('div');
    nameBox.className = 'labelBox';

    let nameLabel = document.createElement('label');
    nameLabel.innerHTML = "Name: ";
    nameBox.appendChild(nameLabel);

    let nameInput = document.createElement('input');
    nameInput.className = 'input';
    nameInput.type = 'name';
    nameInput.id = 'name';
    nameBox.appendChild(nameInput);



    let surnameBox = document.createElement('div');
    surnameBox.className = 'labelBox';

    let surnameLabel = document.createElement('label');
    surnameLabel.innerHTML = "Surname: ";
    surnameBox.appendChild(surnameLabel);

    let surnameInput = document.createElement('input');
    surnameInput.className = 'input';
    surnameInput.type = 'name';
    surnameInput.id = 'surname';
    surnameBox.appendChild(surnameInput);



    let usernameBox = document.createElement('div');
    usernameBox.className = 'labelBox';

    let usernameLabel = document.createElement('label');
    usernameLabel.innerHTML = "Username: ";
    usernameBox.appendChild(usernameLabel);

    let usernameInput = document.createElement('input');
    usernameInput.className = 'input';
    usernameInput.type = 'name';
    usernameInput.id = 'username';
    usernameBox.appendChild(usernameInput);



    let emailBox = document.createElement('div');
    emailBox.className = 'labelBox';

    let emailLabel = document.createElement('label');
    emailLabel.innerHTML = "Email: ";
    emailBox.appendChild(emailLabel);

    let emailInput = document.createElement('input');
    emailInput.className = 'input';
    emailInput.type = 'text';
    emailInput.id = 'email';
    emailBox.appendChild(emailInput);



    let passwordBox = document.createElement('div');
    passwordBox.className = 'labelBox'

    let passwordLabel = document.createElement('label');
    passwordLabel.innerHTML = "Password: ";
    passwordBox.appendChild(passwordLabel);

    let passwordInput = document.createElement('input');
    passwordInput.className = 'input';
    passwordInput.type = 'text';
    passwordInput.id = 'password';
    passwordBox.appendChild(passwordInput);



    let repeatPasswordBox = document.createElement('div');
    repeatPasswordBox.className = 'labelBox'

    let repeatPasswordLabel = document.createElement('label');
    repeatPasswordLabel.innerHTML = "Password: ";
    repeatPasswordBox.appendChild(repeatPasswordLabel);

    let repeatPasswordInput = document.createElement('input');
    repeatPasswordInput.className = 'input';
    repeatPasswordInput.type = 'text';
    repeatPasswordInput.id = 'repeatPassword';
    repeatPasswordBox.appendChild(repeatPasswordInput);



    let buttonBox = document.createElement('div');
    buttonBox.className = 'buttonBox';

    let regButton = document.createElement('button');
    regButton.type = 'button';
    regButton.innerHTML = 'Register';
    regButton.onclick = function() {
        if (getRegisterData()) {
            document.getElementById('regForm').remove();
            loginPage();
        }
    }
    buttonBox.appendChild(regButton);
    
    fieldSet.appendChild(nameBox);
    fieldSet.appendChild(surnameBox);
    fieldSet.appendChild(usernameBox);
    fieldSet.appendChild(emailBox);
    fieldSet.appendChild(passwordBox);
    fieldSet.appendChild(repeatPasswordBox);
    fieldSet.appendChild(buttonBox);

    regFrom.appendChild(fieldSet);

    document.body.appendChild(regFrom);
}

function loginPage() {
    let loginFrom = document.createElement('div');
    loginFrom.className = 'form';
    loginFrom.id = 'loginForm';

    let fieldSet = document.createElement('div');
    fieldSet.className = 'fieldset';

    let warningLabel = document.createElement('label');
    warningLabel.id = 'warning';
    fieldSet.appendChild(warningLabel);

    let usernameBox = document.createElement('div');
    usernameBox.className = 'labelBox'

    let usernameLabel = document.createElement('label');
    usernameLabel.innerHTML = "Username: ";
    usernameBox.appendChild(usernameLabel);

    let usernameInput = document.createElement('input');
    usernameInput.className = 'input';
    usernameInput.type = 'name';
    usernameInput.id = 'username';
    usernameBox.appendChild(usernameInput);

    let passwordBox = document.createElement('div');
    passwordBox.className = 'labelBox'

    let passwordLabel = document.createElement('label');
    passwordLabel.innerHTML = "Username: ";
    passwordBox.appendChild(passwordLabel);

    let passwordInput = document.createElement('input');
    passwordInput.className = 'input';
    passwordInput.type = 'text';
    passwordInput.id = 'password';
    passwordBox.appendChild(passwordInput);

    let buttonBox = document.createElement('div');
    buttonBox.className = 'buttonBox';

    let loginButton = document.createElement('button');
    loginButton.type = 'button';
    loginButton.innerHTML = 'Login';
    loginButton.onclick = getLoginData;
    buttonBox.appendChild(loginButton);

    let regButton = document.createElement('button');
    regButton.type = 'button';
    regButton.innerHTML = 'Register';
    regButton.onclick = function() {
        document.getElementById('loginForm').remove();
        registerPage();
    };
    buttonBox.appendChild(regButton);

    fieldSet.appendChild(usernameBox);
    fieldSet.appendChild(passwordBox);
    fieldSet.appendChild(buttonBox);

    loginFrom.appendChild(fieldSet);

    document.body.appendChild(loginFrom);
}

function showTasks() {
    document.querySelectorAll('task').forEach((task) => task.remove());
    tasks.forEach((task) => {
        task.createForm();
    })
}

loginPage();
