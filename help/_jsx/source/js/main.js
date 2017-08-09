const
    _jsx = require('./module/_jsx'),
    ReactDOM = require('react-dom');

let div = document.createElement('div');
div.id = 'root';
document.body.appendChild(div);
ReactDOM.render(_jsx('zoeDylan'), document.getElementById('root'));