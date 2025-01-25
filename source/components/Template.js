import React, { useState, useEffect } from 'react'
import { Box, Newline, Spacer, Text } from 'ink';

const Template = () => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev); // Toggle visibility
    }, 500); // Durasi berkedip (500ms)

    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);
  
  
  const users = [
    {
      id: 1,
      email: "gacoprotect@gmail.com",
      tier: 2,
      epoch: 3,
      points: 50786.45,
      today: 1190.76,
      earn: 8.21,
      proxy: "192.168.80.1:5485",
      uptime: "0day 12hr 32min",
      errors: [
        "Error Fetch Data",
        "Error Message Here",
      ]
    },
    {
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
    }
  ]
  return (
    <>
      <Box width={100} borderColor="blue" borderStyle={'round'} flexDirection="column">
        <Box justifyContent="center">
          <Text color="yellow">DEPINED BOT</Text>
        </Box>
        <Box justifyContent='space-between'>
          <Text color="green">V1.1</Text>
          <Text color="green">Author : gacoprotect</Text>
        </Box>

      </Box>

      <Box borderStyle="bold" borderColor="yellowBright" width={100}>
        <Box flexDirection="column" width={100}>
          <Box>
            <Box width="30%">
              <Text>Account</Text>
              <Text color='yellow'>[Tier]</Text>
              <Text color='red'>[Epoch]</Text>
            </Box>

            <Box width="10%">
              <Text>Points</Text>
            </Box>

            <Box width="10%">
              <Text>Today</Text>
            </Box>
            <Box width="6%">
              <Text>Earn</Text>
            </Box>
            <Box width="25%">
              <Text>Proxy</Text>
            </Box>
            <Box width="19%">
              <Text>Uptime</Text>
            </Box>
          </Box>
          <Newline />
          {users.map(user => (
            <Box key={user.id} flexDirection='column'>
              <Box>
                <Box width="30%">
                  <Text color={user.errors.length > 0 ? (isVisible ? 'yellow' : 'red') : 'white'}>
                    {user.email}
                  </Text>
                  <Text color='yellow'>[{user.tier}]</Text>
                  <Text color='red'>[{user.epoch}]</Text>
                </Box>

                <Box width="10%">
                  <Text>{user.points}</Text>
                </Box>

                <Box width="10%">
                  <Text>{user.today}</Text>
                </Box>
                <Box width="6%">
                  <Text>{user.earn}</Text>
                </Box>
                <Box width="25%">
                  <Text>{user.proxy}</Text>
                </Box>
                <Box width="19%">
                  <Text>{user.uptime}</Text>
                </Box>
              </Box>
              {user.errors.length > 0 && (
                <Box borderColor={isVisible ? 'yellow' : 'red'} borderStyle="round" flexDirection="column" borderDimColor>
                  {user.errors.map((error, index) => (
                    <Text key={index}>{error}</Text>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Template
