function createChild(parent:HTMLElement, type:string, text:string='', classes: string[] = []) {    
    const element = document.createElement(type);    
    element.innerText = text;
    classes.forEach((c) => {
        element.classList.add(c)
    })
    parent.appendChild(element)
}