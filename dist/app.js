import React from 'react';
import { Box } from 'ink';
import Template from './components/Template.js';
import ApiTest from './components/ApiTest.js';
import Main from './components/Main.js';
export default function App() {
  const TOKEN_PATH = "./source/config/tokens.txt";
  const PROXY_PATH = "./source/config/proxy.txt";
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Main, {
    tokenPath: TOKEN_PATH,
    proxyPath: PROXY_PATH
  }));
}