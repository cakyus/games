
document.addEventListener('DOMContentLoaded', function() {
  let values = get_values();
  add_items(values);
});

function array_sum(values) {
  let total = 0;
  for (value of values) {
    total += value;
  }
  return total;
}

function array_max(values) {
  let max = 0;
  for (value of values) {
    if (max < value) {
      max = value;
    }
  }
  return max;
}

function shuffle(values) {
  return values.sort(() => Math.random() - 0.5);
}

function get_values() {
  let values = [8, 2, 3, 4, 5, 6, 7, 1, 9, 10];
  // let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  values = shuffle(values);
  return values;
}

function add_items(values) {
  let value_max = array_max(values);
  let min_height = 0;
  let e = document.getElementById('chart');
  for (let i = 0; i < values.length ; i++) {
    let e1 = document.createElement('div');
    let x = 0;
    x = values[i] / value_max;
    x = ( 100 - min_height ) * x;
    x = parseInt(x);
    x = min_height + x;
    e1.style.height = x + '%';
    x = 100 * ( 1 / values.length );
    x = parseInt(x);
    e1.style.width = x + '%';
    e1.innerHTML = values[i];
    e.appendChild(e1);
  }
}

