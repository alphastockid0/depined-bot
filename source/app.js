import React from 'react';
import { Box } from 'ink';
import Template from './components/Template.js';
import ApiTest from './components/ApiTest.js';
import Main from './components/Main.js';

export default function App() {
	const TOKEN_PATH = "./source/config/tokens.txt";
	const PROXY_PATH = "./source/config/proxy.txt";

	return (
		<Box flexDirection="column">
			{/* <Template /> */}
			<Main tokenPath={TOKEN_PATH} proxyPath={PROXY_PATH} />

			{/* <ApiTest /> */}

		</Box>
	);
}
