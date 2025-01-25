import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import * as api from './Api.js'; // Pastikan path utils benar

const Account = ({
  token,
  proxy,
  index
}) => {
  const [data, setData] = useState({
    email: '-',
    points: 0,
    today: 0,
    uptime: '-',
    currentTier: 0,
    epoch: 0,
    widget: null,
    earn: 0,
    status: 'Processing...'
  });
  useEffect(() => {
    let currentPoint = 0;
    const fetchAccountData = async () => {
      try {
        const userData = await api.getUserInfo(token, proxy);
        const earningsData = await api.getEarningsData(token, proxy);
        const widget = await api.logWidgetStatus(token, proxy);
        if (earningsData && userData?.data) {
          const {
            email,
            current_tier
          } = userData.data;
          const {
            points,
            today,
            uptime,
            epoch
          } = earningsData;
          const earn = points > currentPoint ? points - currentPoint : 0;
          currentPoint = points;
          setData({
            email,
            points,
            today,
            uptime,
            currentTier: current_tier,
            epoch,
            widget,
            earn,
            status: 'Active'
          });
        }
      } catch (error) {
        setData(prev => ({
          ...prev,
          status: `Error: ${error.message}`
        }));
        console.error(`Error updating account ${index}: ${error.message}`);
      }
    };
    const interval = setInterval(fetchAccountData, 60000 * 3); // Setiap 3 menit
    fetchAccountData();
    return () => clearInterval(interval); // Bersihkan interval
  }, [token, proxy, index]);
  return /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, data.email || 'Loading...'), /*#__PURE__*/React.createElement(Text, null, data.points.toFixed(2)), /*#__PURE__*/React.createElement(Text, null, data.today.toFixed(2)), /*#__PURE__*/React.createElement(Text, null, data.earn.toFixed(2)), /*#__PURE__*/React.createElement(Text, null, data.uptime), /*#__PURE__*/React.createElement(Text, {
    color: "yellow"
  }, data.status));
};
export default Account;