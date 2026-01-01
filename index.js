'use strict';

// frame per milisecond
const FPS = 1000;

document.addEventListener('DOMContentLoaded', function() {
  let values = get_values();
  let dataset = dataset_load(values);
  dataset_switch(dataset, 0, 1);
});

function array_sum(values) {
  let total = 0;
  for (let value of values) {
    total += value;
  }
  return total;
}

function array_max(values) {
  let max = 0;
  for (let value of values) {
    if (max < value) {
      max = value;
    }
  }
  return max;
}

// Randomly shuffle the elements of an array.

function shuffle(values) {
  return values.sort(() => Math.random() - 0.5);
}

function get_values() {
  let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  values = shuffle(values);
  return values;
}

function Dataset() {
  this.data = [];
  this.length = 0;
  this.value_max = 0;
  this.min_height = 0;
}

function Data() {
  this.node = undefined;
  this.value = undefined;
}

function dataset_load(values) {

  let e = document.getElementById('chart');

  let dataset = new Dataset();
  dataset.value_max = array_max(values);
  dataset.length = values.length;

  for (let i = 0; i < values.length ; i++) {

    let e1 = document.createElement('div');
    e.appendChild(e1);

    let data = new Data();
    data.node = e1;
    dataset.data.push(data);
    dataset_set_value(dataset, i, values[i]);
  }

  return dataset;
}

function dataset_set_value(dataset, index, value) {

  let data = dataset.data[index]

  data.value = value;

  let x = 0;
  x = value / dataset.value_max;
  x = ( 100 - dataset.min_height ) * x;
  x = parseInt(x);
  x = dataset.min_height + x;
  data.node.style.height = x + '%';

  let y = 0;
  y = 100 * ( 1 / dataset.length );
  y = parseInt(y);
  data.node.style.width = y + '%';
  data.node.innerHTML = value;
}

// Switch position

function dataset_switch(dataset, index1, index2) {

  window.setTimeout(function() {

    dataset_select_begin(dataset, index1, index2);

    window.setTimeout(function() {

      let height1 = dataset.data[index1].node.style.height;
      let height2 = dataset.data[index2].node.style.height;

      dataset.data[index1].node.style.height = height2;
      dataset.data[index2].node.style.height = height1;

      window.setTimeout(function() {
        dataset_select_end(dataset, index1, index2);
      }, FPS);

    }, FPS);

  }, FPS);
}

function dataset_select_begin(dataset, index1, index2) {
  dataset.data[index1].node.style.backgroundColor = '#f00';
  dataset.data[index2].node.style.backgroundColor = '#f00';
}

function dataset_select_end(dataset, index1, index2) {
  dataset.data[index1].node.style.backgroundColor = '#fff';
  dataset.data[index2].node.style.backgroundColor = '#fff';
}

