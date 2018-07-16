/*
import { JwtTokenProcessorClient, IJwtTokenProcessorClient } from "./gwt/JwtTokenProcessorClient";

const fork = require('child_process').fork;
const path = require('path');

// const program = path.resolve('JwtTokenProcessor.js');
const program = './JwtTokenProcessor';
const parameters = [];
const options = {
	stdio: ['pipe', 'pipe', 'pipe', 'ipc']
};

const child = fork(program, parameters, options);

const gwtTokenProcessor: IJwtTokenProcessorClient = new JwtTokenProcessorClient(child);
*/
