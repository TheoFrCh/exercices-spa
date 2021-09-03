import {Element} from './frameworkTypes';

// parent class for components
abstract class Component {
    abstract render(): Element
}

function createElement(name, attributes, children) {
    return {
        name,
        attributes,
        children
    };
};


function getHTMLforElement(element) {
    let HTMLtoReturn;
    if (typeof element === 'string') {
        HTMLtoReturn = element;
    } else {
        const tag = document.createElement(element.name)
        for (const key in element.attributes) {
            tag.setAttribute(key, element.attributes[key])
        }
        element.children.forEach(child => {
            const res = getHTMLforElement(child)
            if (typeof res === "string") {
                tag.innerHTML = res
            } else {
                tag.appendChild(res)
            }
        });
        HTMLtoReturn = tag;
    }


    return HTMLtoReturn;
}

function elementsToHTML(virtualDom) {
    return getHTMLforElement(virtualDom)
}

function getElement(element) {
    let elementToReturn;
    if (typeof element === 'string') {
        elementToReturn = element;
    } else if (typeof element.name === 'string') {
        const childrenCol = [];
        element.children.forEach(e => {
            childrenCol.push(getElement(e));
        });
        element.children = childrenCol;
        elementToReturn = element;
    } else {
        const instance = new element.name();
        const render = instance.render();
        elementToReturn = getElement(render);
    }

    return elementToReturn;
}


function getVirtualDom(element) {
    return getElement(element);
}

function start(rootComponent, rootHtml: HTMLElement): void {
    const rootInstance = new rootComponent();
    const rootRender = rootInstance.render();
    const virtualDom = getVirtualDom(rootRender);
    const site = elementsToHTML(virtualDom);
    rootHtml.appendChild(site)
    console.log(virtualDom);
}

export {
    Component,
    start,
    createElement
};