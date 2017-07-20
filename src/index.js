const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const log = console;

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));

module.exports = app;
