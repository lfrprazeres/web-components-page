function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Webpack dev Server running with hot reload';

  return element;
}

document.body.appendChild(component());