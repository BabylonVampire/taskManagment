class Task {
    constructor(name, textOfTask, lvl, timeOfEnding, id, targetUser, author) {
        this.name = name;
        this.textOfTask = textOfTask;
        this.lvl = lvl;
        this.timeOfEnding = timeOfEnding;
        this.id = id;
        this.author = author;
        this.targetUser = targetUser;
    }
    remainingTime() {
        let date = new Date();
        let endingDate = parseInt(this.timeOfEnding.split('-')[2], 10);
        return endingDate - date.getDate();
    }
    priority() {
        let timeLeft = this.remainingTime();
        let difficultyNumber = difficulties.length - difficulties.indexOf(this.lvl);
        return timeLeft * difficultyNumber;
    }
    createForm() {
        //создание новой формы
        let newForm = elementCreator({ element: 'task', className: 'form' });

        let fieldSet = elementCreator({ element: 'div', className: 'fieldset' });

        //создание новой легенды
        let newLegend = elementCreator({ element: 'legend' });

        newLegend.setText(this.name);

        let authorBox = elementCreator({ element: 'div', className: 'labelBox' });

        let authorLabel = elementCreator({ element: 'label' });

        authorLabel.setText(`appointed by: ${this.author}`);

        authorBox.setChild([authorLabel]);

        let labelBox = elementCreator({ element: 'div', className: 'labelBox' });

        let timelabel = elementCreator({ element: 'label' });

        let remainingTime = this.remainingTime();

        timelabel.setText(`Deadline: ${Math.abs(remainingTime)} day ${(Math.abs(remainingTime) == 1 ? "" : "s")} ${(remainingTime >= 0 ? " left" : " late")}`);

        let lvllabel = elementCreator({ element: 'label' });
        lvllabel.setText(`Difficulty: ${this.lvl}`);
        labelBox.setChild([timelabel, lvllabel]);

        let textlabel = elementCreator({ element: 'label' });
        textlabel.setText(`Task description:<br><br> ${this.textOfTask}`);

        let deleteButton = elementCreator({ element: 'button', type: 'button', id: this.id });
        deleteButton.setText('finish the task');
        deleteButton.setOnClick(this.removeTask);

        fieldSet.setChild([
            newLegend,
            authorBox,
            labelBox,
            textlabel,
            deleteButton
        ])

        newForm.setChild([fieldSet]);

        newForm.setParent(document.body);
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