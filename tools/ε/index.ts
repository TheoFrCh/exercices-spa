import { Element } from './frameworkTypes';

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

function elementsToHTML(virtualDom) {
  // TODO
}

function getElement(element) {
  let elementToReturn;
  if (typeof element === 'string') {
    elementToReturn = element;
  } else if(typeof element.name === 'string') {
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
  console.log(site);
}

export {
  Component,
  start,
  createElement
};