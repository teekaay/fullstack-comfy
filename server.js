#!/usr/bin/env node

const path = require('path');
const express = require('express');
const app = require('./src');

const config = {
  port: process.env.PORT || 9000,
  publicPath: path.resolve(__dirname, 'public'),
};

app.use(express.static(config.publicPath));

app.listen(config.port, () => {
  console.info(`Server listening @ http://localhost:${config.port}`);
});
