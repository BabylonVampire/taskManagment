let l = console.log;

const difficulties = [
    '',
    'Easy',
    'Not so easy',
    'Medium',
    'Hard',
    'Hardcore'
]

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
    constructor(name, textOfTask, lvl, timeOfEnding) {
        this.name = name;
        this.textOfTask = textOfTask;
        this.lvl = lvl;
        this.timeOfEnding = timeOfEnding;
    }
    remainingTime() {
        let date = new Date();
        let endingDate = parseInt(this.timeOfEnding.split('-')[2], 10);
        return endingDate - date.getDay();
    }
    priority() {
        let timeLeft = this.remainingTime;
        return timeLeft * this.lvl;
    }
    createForm() {
        //создание новой формы
        let newForm = document.createElement('div');
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
        timelabel.innerHTML = this.remainingTime();
        labelBox.appendChild(timelabel);

        let lvllabel = document.createElement('label');
        lvllabel.innerHTML = this.lvl;
        labelBox.appendChild(lvllabel);

        let textlabel = document.createElement('label');
        textlabel.innerHTML = this.textOfTask;

        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerHTML = 'finish the task';
        deleteButton.onclick = this.removeTask;

        fieldSet.appendChild(labelBox);
        fieldSet.appendChild(textlabel);
        fieldSet.appendChild(deleteButton);

        newForm.appendChild(fieldSet);
        document.body.appendChild(newForm);
    }

    removeTask() {

    }
}

function getData() {
    let name = document.getElementById('name').value;
    let text = document.getElementById('text').value;
    let lvl = document.getElementById('lvl').value;
    let date = document.getElementById('date').value;

    if (!name || !text || !lvl || !date) return;

    createTaskButton.style.visibility = 'visible';

    task = new Task(name, text, lvl, date);

    let form = document.getElementById('taskCreation');
    document.body.removeChild(form);

    task.createForm();
    //реализовать загрузку в бд
}

function createPage() {
    let createTaskButton = document.createElement('button');
    createTaskButton.onclick = createNewTaskForm;
    createTaskButton.innerHTML = 'Create new task';
    document.body.appendChild(createTaskButton);
}

createPage();