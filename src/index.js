function component() {
  const element = document.createElement('div');
  $(element)
    .append('Webpack dev Server running with hot reload');

  return element;
}

$('body').append(component());