import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { readFile, delay } from './Helper.js';
import * as api from './Api.js';

const Main = ({ tokenPath, proxyPath }) => {
  const [accounts, setAccounts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      await delay(3);

      const tokens = await readFile(tokenPath);
      const proxies = await readFile(proxyPath);

      const accountsData = tokens.map((token, index) => ({
        id: index + 1,
        email: `Loading... Account (${index + 1})`,
        tier: 0,
        epoch: 0,
        points: 0,
        today: 0,
        earn: 0,
        proxy: proxies.length > 0 ? proxies[Math.floor(Math.random() * proxies.length)] : 'No Proxy',
        uptime: 'Loading...',
        errors: [],
        token,
      }));

      setAccounts(accountsData);
    };

    fetchAccounts();

    const blinkInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500); // Durasi berkedip

    return () => clearInterval(blinkInterval); // Bersihkan interval
  }, [tokenPath, proxyPath]);

  useEffect(() => {
    const updateAccounts = async () => {
      const proxies = await readFile(proxyPath);

      const updatedAccounts = await Promise.all(
        accounts.map(async (account) => {
          try {
            const userData = await api.getUserInfo(account.token, account.proxy);
            const earningsData = await api.getEarningsData(account.token, account.proxy);
            const getWidgetStatus = await api.logWidgetStatus(account.token, account.proxy);

            // Periksa jika data berhasil diperoleh
            if (userData?.data && earningsData?.data && getWidgetStatus?.data) {
              const { email, tier, points, widget } = userData.data;
              const { today, epoch, uptime } = earningsData.data;

              const earn = points > account.points ? points - account.points : 0;

              return {
                ...account,
                email,
                tier,
                epoch,
                points,
                today,
                earn,
                uptime,
                widget,
                errors: [], // Reset errors jika berhasil
              };
            }

            // Tambahkan pesan error jika userData atau earningsData tidak valid
            return {
              ...account,
              errors: [
                ...account.errors,
                userData?.msg || earningsData?.msg || "Failed to fetch data.",
              ],
            };
          } catch (error) {
            try {
              return {
                ...account,
                errors: [...account.errors, `Error: ${error.message}`],
                proxy: proxies.length > 0 ? proxies[Math.floor(Math.random() * proxies.length)] : 'No Proxy', // Set proxy baru
                widget: false, // Update widget status jika diperlukan
              };
            } catch (proxyError) {
              // Jika pengambilan proxy juga gagal
              return {
                ...account,
                proxy: proxies.length > 0 ? proxies[Math.floor(Math.random() * proxies.length)] : 'No Proxy', // Set proxy baru
                errors: [
                  ...account.errors,
                  `Error: ${error.message}`,
                  `Proxy Error: ${proxyError.message}`,
                ],
              };
            }
          }
        })
      );

      // Perbarui state accounts dengan data yang baru
      setAccounts(updatedAccounts);
    };


    // Connect and fetch earnings periodically
    const connectAndFetchEarnings = async () => {
      const updatedAccounts = await Promise.all(
        accounts.map(async (account, index) => {
          try {
            // Coba koneksi dan pengambilan data pendapatan
            const conn = await api.connect(account.token, account.proxy);
            const getEarnings = await api.getEarnings(account.token, account.proxy);

            // Periksa jika koneksi atau pengambilan gagal
            if (!conn.success || !getEarnings.success) {
              return {
                ...account,
                errors: [
                  ...account.errors,
                  conn.msg || getEarnings.msg || "Unknown error occurred",
                ],
              };
            }

            // Jika berhasil, hapus error sebelumnya
            return {
              ...account,
              errors: [],
            };
          } catch (error) {
            try {
              return {
                ...account,
                errors: [...account.errors, `Error: ${error.message}`],
                proxy: proxies.length > 0 ? proxies[Math.floor(Math.random() * proxies.length)] : 'No Proxy', // Set proxy baru
                widget: false, // Update widget status jika diperlukan
              };
            } catch (proxyError) {
              // Jika pengambilan proxy juga gagal
              return {
                ...account,
                proxy: proxies.length > 0 ? proxies[Math.floor(Math.random() * proxies.length)] : 'No Proxy', // Set proxy baru
                errors: [
                  ...account.errors,
                  `Error: ${error.message}`,
                  `Proxy Error: ${proxyError.message}`,
                ],
              };
            }
          }
        })
      );

      // Perbarui state akun dengan hasil yang baru
      setAccounts(updatedAccounts);
    };


    const accountUpdateInterval = setInterval(updateAccounts, 60000 * 1); // Update data setiap 3 menit
    const connectFetchInterval = setInterval(connectAndFetchEarnings, 1000 * 1./.0); // Connect & fetch setiap 30 detik

    return () => {
      clearInterval(accountUpdateInterval);
      clearInterval(connectFetchInterval);
    };
  }, [accounts]);

  return (
    <Box flexDirection="column" width={100}>
      <Box borderColor="blue" borderStyle="round" flexDirection="column">
        <Box justifyContent="center">
          <Text color="yellow">DEPINED BOT</Text>
        </Box>
        <Box justifyContent="space-between">
          <Text color="green">V1.1</Text>
          <Text color="green">Author: gacoprotect</Text>
        </Box>
      </Box>

      <Box borderStyle="bold" borderColor="yellowBright" width={100} flexDirection="column">
        <Box>
          <Box width="30%">
            <Text>Account</Text>
            <Text color="yellow">[Tier]</Text>
            <Text color="red">[Epoch]</Text>
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

        {accounts.map((account) => (
          <Box key={account.id} flexDirection="column">
            <Box>
              <Box width="30%">
                <Text color={account.errors.length > 0 ? (isVisible ? 'yellow' : 'red') : 'white'}>
                  {account.email || 'Loading...'}
                </Text>
                <Text color="yellow">[{account.tier || 0}]</Text>
                <Text color="red">[{account.epoch || 0}]</Text>
              </Box>
              <Box width="10%">
                <Text>{(account.points || 0).toFixed(2)}</Text>
              </Box>
              <Box width="10%">
                <Text>{(account.today || 0).toFixed(2)}</Text>
              </Box>
              <Box width="6%">
                <Text>{(account.earn || 0).toFixed(2)}</Text>
              </Box>
              <Box width="25%">
                <Text color={account.widget ? "green" : "red"}>{(account.proxy || '').replace(/^(https?:\/\/)/, '') || 'No Proxy'}</Text>
              </Box>

              <Box width="19%">
                <Text>{account.uptime}</Text>
              </Box>
            </Box>

            {account.errors.length > 0 && (
              <Box borderColor={isVisible ? 'yellow' : 'red'} borderStyle="round" flexDirection="column">
                {account.errors.map((error, index) => (
                  <Text key={index}>{error}</Text>
                ))}
              </Box>
            )}
          </Box>

        ))}
      </Box>
    </Box>
  );
};


export default Main;
