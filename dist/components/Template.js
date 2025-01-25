import React, { useState, useEffect } from 'react';
import { Box, Newline, Spacer, Text } from 'ink';
const Template = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prev => !prev); // Toggle visibility
    }, 500); // Durasi berkedip (500ms)

    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);
  const users = [{
    id: 1,
    email: "gacoprotect@gmail.com",
    tier: 2,
    epoch: 3,
    points: 50786.45,
    today: 1190.76,
    earn: 8.21,
    proxy: "192.168.80.1:5485",
    uptime: "0day 12hr 32min",
    errors: ["Error Fetch Data", "Error Message Here"]
  }, {
    id: 2,
    email: "alpha@gmail.com",
    tier: 1,
    epoch: 3,
    points: 10786.45,
    today: 90.76,
    earn: 8.51,
    proxy: "192.168.67.287:21654",
    uptime: "0day 2hr 32min",
    errors: []
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Box, {
    width: 100,
    borderColor: "blue",
    borderStyle: 'round',
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Box, {
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "yellow"
  }, "DEPINED BOT")), /*#__PURE__*/React.createElement(Box, {
    justifyContent: "space-between"
  }, /*#__PURE__*/React.createElement(Text, {
    color: "green"
  }, "V1.1"), /*#__PURE__*/React.createElement(Text, {
    color: "green"
  }, "Author : gacoprotect"))), /*#__PURE__*/React.createElement(Box, {
    borderStyle: "bold",
    borderColor: "yellowBright",
    width: 100
  }, /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    width: 100
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    width: "30%"
  }, /*#__PURE__*/React.createElement(Text, null, "Account"), /*#__PURE__*/React.createElement(Text, {
    color: "yellow"
  }, "[Tier]"), /*#__PURE__*/React.createElement(Text, {
    color: "red"
  }, "[Epoch]")), /*#__PURE__*/React.createElement(Box, {
    width: "10%"
  }, /*#__PURE__*/React.createElement(Text, null, "Points")), /*#__PURE__*/React.createElement(Box, {
    width: "10%"
  }, /*#__PURE__*/React.createElement(Text, null, "Today")), /*#__PURE__*/React.createElement(Box, {
    width: "6%"
  }, /*#__PURE__*/React.createElement(Text, null, "Earn")), /*#__PURE__*/React.createElement(Box, {
    width: "25%"
  }, /*#__PURE__*/React.createElement(Text, null, "Proxy")), /*#__PURE__*/React.createElement(Box, {
    width: "19%"
  }, /*#__PURE__*/React.createElement(Text, null, "Uptime"))), /*#__PURE__*/React.createElement(Newline, null), users.map(user => /*#__PURE__*/React.createElement(Box, {
    key: user.id,
    flexDirection: "column"
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
    width: "30%"
  }, /*#__PURE__*/React.createElement(Text, {
    color: user.errors.length > 0 ? isVisible ? 'yellow' : 'red' : 'white'
  }, user.email), /*#__PURE__*/React.createElement(Text, {
    color: "yellow"
  }, "[", user.tier, "]"), /*#__PURE__*/React.createElement(Text, {
    color: "red"
  }, "[", user.epoch, "]")), /*#__PURE__*/React.createElement(Box, {
    width: "10%"
  }, /*#__PURE__*/React.createElement(Text, null, user.points)), /*#__PURE__*/React.createElement(Box, {
    width: "10%"
  }, /*#__PURE__*/React.createElement(Text, null, user.today)), /*#__PURE__*/React.createElement(Box, {
    width: "6%"
  }, /*#__PURE__*/React.createElement(Text, null, user.earn)), /*#__PURE__*/React.createElement(Box, {
    width: "25%"
  }, /*#__PURE__*/React.createElement(Text, null, user.proxy)), /*#__PURE__*/React.createElement(Box, {
    width: "19%"
  }, /*#__PURE__*/React.createElement(Text, null, user.uptime))), user.errors.length > 0 && /*#__PURE__*/React.createElement(Box, {
    borderColor: isVisible ? 'yellow' : 'red',
    borderStyle: "round",
    flexDirection: "column",
    borderDimColor: true
  }, user.errors.map((error, index) => /*#__PURE__*/React.createElement(Text, {
    key: index
  }, error))))))));
};
export default Template;