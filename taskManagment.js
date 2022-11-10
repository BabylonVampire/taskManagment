let l = console.log;

const difficulties = [
    '',
    'Easy',
    'Not so easy',
    'Medium',
    'Hard',
    'Hardcore'
];

let ID = 0;

let users = {};

let tasks = [];

let activeUser;

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
    newLegend.innerHTML = 'Creating new task';
    fieldSet.appendChild(newLegend);

    //nameBox

    let nameBox = document.createElement('p');

    //label для ввода названия
    let namelabel = document.createElement('label');
    namelabel.for = 'name';
    namelabel.innerHTML = 'Enter name of task ';
    nameBox.appendChild(namelabel);

    //input для ввода названия
    let nameInput = document.createElement('input');
    nameInput.className = 'input';
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameBox.appendChild(nameInput);

    fieldSet.appendChild(nameBox);

    //textBox

    let textBox = document.createElement('p');

    //label для ввода текста
    let textlabel = document.createElement('label');
    namelabel.for = 'text';
    textlabel.innerHTML = 'Enter descriprion of the task ';
    textBox.appendChild(textlabel);

    //input для ввода текста
    let textInput = document.createElement('input');
    textInput.className = 'input';
    textInput.type = 'text';
    textInput.id = 'text';
    textBox.appendChild(textInput);

    fieldSet.appendChild(textBox)

    //lvlBox

    let lvlBox = document.createElement('p');

    //label для ввода сложности
    let lvllabel = document.createElement('label');
    lvllabel.innerHTML = 'Select difficulty of task ';
    lvlBox.appendChild(lvllabel);

    //выбор сложности
    let lvlInput = document.createElement('select');
    lvlInput.className = 'input';
    lvlInput.id = 'lvl';
    for (i = 0; i < difficulties.length; ++i) {
        let option = document.createElement('option');
        option.innerHTML = difficulties[i];
        lvlInput.appendChild(option);
    }
    lvlBox.appendChild(lvlInput);

    fieldSet.appendChild(lvlBox);

    //timeBox

    timeBox = document.createElement('p');

    //label сроков
    let datelabel = document.createElement('label');
    datelabel.innerHTML = 'Enter deadline ';
    timeBox.appendChild(datelabel);

    //input сроков
    let dateInput = document.createElement('input');
    dateInput.className = 'input';
    dateInput.id = 'date';
    dateInput.type = 'date';
    timeBox.appendChild(dateInput);

    fieldSet.appendChild(timeBox);

    targetUserBox = document.createElement('p');

    //label сроков
    let targetUserlabel = document.createElement('label');
    targetUserlabel.innerHTML = 'Enter recipients name ';
    targetUserBox.appendChild(targetUserlabel);

    //input сроков
    let targetUserInput = document.createElement('select');
    targetUserInput.className = 'input';
    targetUserInput.id = 'targetUser';
    targetUserInput.type = 'name';
    for (var user in users) {
        let option = document.createElement('option');
        option.innerHTML = user;
        targetUserInput.appendChild(option);
    }
    targetUserBox.appendChild(targetUserInput);

    fieldSet.appendChild(targetUserBox);

    //кнопка завершения
    let finishButton = document.createElement('button');
    finishButton.type = 'button';
    finishButton.onclick = getData;
    finishButton.innerHTML = 'Create task';
    fieldSet.appendChild(finishButton);

    newForm.appendChild(fieldSet);
    document.body.appendChild(newForm);
}

class Task {
    constructor(name, textOfTask, lvl, timeOfEnding, id, targetUser) {
        this.name = name;
        this.textOfTask = textOfTask;
        this.lvl = lvl;
        this.timeOfEnding = timeOfEnding;
        this.id = id;
        this.author = activeUser;
        this.targetUser = targetUser;
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

        let authorBox = document.createElement('div');
        authorBox.className = 'labelBox';

        let authorLabel = document.createElement('label');
        authorLabel.innerHTML = "appointed by: " + this.author;
        authorBox.appendChild(authorLabel);

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

        fieldSet.appendChild(authorBox);
        fieldSet.appendChild(labelBox);
        fieldSet.appendChild(textlabel);
        fieldSet.appendChild(deleteButton);

        newForm.appendChild(fieldSet);
        document.body.appendChild(newForm);
    }
    removeTask() {
        users[activeUser].tasks.forEach((task) => {
            if (task.id == +this.id) {
                users[activeUser].tasks.splice(users[activeUser].tasks.indexOf(task), 1);
            }
            showTasks();
        })
    }
}

class User {
    constructor(name, surname, username, email, password) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.tasks = [];
    }
}


let testUser1 = new User(1, 1, 1, 1, 1);
users[1] = testUser1;

let testUser2 = new User(2, 2, 2, 2, 2);
users[2] = testUser2;


function getData() {
    let name = document.getElementById('name').value;
    let text = document.getElementById('text').value;
    let lvl = document.getElementById('lvl').value;
    let date = document.getElementById('date').value;
    let targetUser = document.getElementById('targetUser').value;
    l(targetUser, users[targetUser]);

    if (!name || !text || !lvl || !date) return;

    createTaskButton.style.visibility = 'visible';

    task = new Task(name, text, lvl, date, ID);

    ++ID;

    users[targetUser].tasks.push(task);

    let form = document.getElementById('taskCreation');
    document.body.removeChild(form);

    showTasks();
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
    activeUser = username;
    createPage();
}

function getRegisterData() {
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;

    if (!name || !surname || !username || !email || !password || !repeatPassword) {
        document.getElementById('warning').innerHTML = 'all fields must be filled!';
        return;
    }

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
    passwordLabel.innerHTML = "Password: ";
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
    users[activeUser].tasks.forEach((task) => {
        task.createForm();
    })
}

loginPage();
