class elemCreator {
    constructor(element) {
        this.htmlelement = document.createElement(element);
    }
    setId(id) {
        this.htmlelement.id = id;
    }
    setClassName(className) {
        this.htmlelement.className = className;
    }
    setType(type) {
        this.htmlelement.type = type;
    }
    setText(text) {
        this.htmlelement.innerHTML = text;
    }
    setOnClick(func) {
        this.htmlelement.onclick = func;
    }
    setChild(childArr) {
        childArr.forEach((child) => {
            this.htmlelement.appendChild(child.htmlelement);
        })
    }
    setParent(parent) {
        parent.appendChild(this.htmlelement);
    }
}

const elementCreator = (obj) => {
    let elem = new elemCreator(obj.element);
    if (obj.id) elem.setId(obj.id);
    if (obj.className) elem.setClassName(obj.className);
    if (obj.type) elem.setType(obj.type);
    return elem;
}

const container = (contClassName, type, id, labelValue) => {
    let Box = elementCreator({ element: 'div', className: contClassName });
    let Label = elementCreator({ element: 'label' });
    Label.setText(labelValue);

    let Input = elementCreator({ element: 'input', id: id, className: 'input', type: type });
    Box.setChild([Label, Input]);

    return Box;
}