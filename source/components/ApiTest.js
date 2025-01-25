
import React, { useState, useEffect } from 'react'
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
        const responseData = await api.test(token,proxy); // Memanggil fungsi API
        setData(responseData); // Menyimpan data ke state
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      }
    };
    fetchData();
  }, []);
  return (
    <Box borderStyle="bold" flexDirection="column" padding={1} width={100}>
      <Text>TEST API RESPONSE</Text>
      {error ? (
        <Text color="red">Error: {error}</Text>
      ) : data ? (
        <Box flexDirection="column">
          {Array.isArray(data) ? (
            data.slice(0, 5).map((item, index) => ( // Menampilkan hanya 5 item pertama
              <Box key={index} marginBottom={1}>
                <Text color="green">[{item.id}] {item.title}</Text>
              </Box>
            ))
          ) : (
            <Text>{JSON.stringify(data, null, 2)}</Text> // Menampilkan data sebagai JSON jika tidak berupa array
          )}
        </Box>
      ) : (
        <Text color="yellow">Loading...</Text>
      )}
    </Box>
  )
}

export default ApiTest
