#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './app.js';
const cli = meow(`
		Usage
		  $ depined

		Options
			--name  Your name

		Examples
		  $ depined --name=Jane
		  Hello, Jane
	`, {
  importMeta: import.meta
});
render(/*#__PURE__*/React.createElement(App, {
  name: cli.flags.name
}));