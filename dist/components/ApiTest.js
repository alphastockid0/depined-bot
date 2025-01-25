import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import * as api from './Api.js';
const ApiTest = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjUxdnY2QHRvaHJ1Lm9yZyIsImlkIjoiMDJmZmQxOWYtMTE5Yy00MjEzLWE1MjQtMzhmZGY0YWZjYWIwIn0.g6MAW9FgJqkkL3hXNEeZFbbZ4hsJZ3swd7x-cn6fIHQ";
  const proxy = "http://152.32.129.222:2827";
  const [data, setData] = useState(null); // Untuk menyimpan response.data
  const [error, setError] = useState(null); // Untuk menangani error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.test(token, proxy); // Memanggil fungsi API
        setData(responseData); // Menyimpan data ke state
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      }
    };
    fetchData();
  }, []);
  return /*#__PURE__*/React.createElement(Box, {
    borderStyle: "bold",
    flexDirection: "column",
    padding: 1,
    width: 100
  }, /*#__PURE__*/React.createElement(Text, null, "TEST API RESPONSE"), error ? /*#__PURE__*/React.createElement(Text, {
    color: "red"
  }, "Error: ", error) : data ? /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column"
  }, Array.isArray(data) ? data.slice(0, 5).map((item, index) =>
  /*#__PURE__*/
  // Menampilkan hanya 5 item pertama
  React.createElement(Box, {
    key: index,
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "green"
  }, "[", item.id, "] ", item.title))) : /*#__PURE__*/React.createElement(Text, null, JSON.stringify(data, null, 2)) // Menampilkan data sebagai JSON jika tidak berupa array
  ) : /*#__PURE__*/React.createElement(Text, {
    color: "yellow"
  }, "Loading..."));
};
export default ApiTest;