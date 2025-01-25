import React from 'react';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';
import fs from 'fs/promises';
// import log from './logger.js';
import chalk from 'chalk';
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

// Save data to a file
export async function saveToFile(filename, data) {
  try {
    await fs.appendFile(filename, `${data}\n`, 'utf-8');
    // log.info(`Data saved to ${filename}`);
  } catch (error) {
    // log.error(`Failed to save data to ${filename}: ${error.message}`);
  }
}

// Read the file
export async function readFile(pathFile) {
  try {
    const datas = await fs.readFile(pathFile, 'utf8');
    return datas.split('\n').map(data => data.trim()).filter(data => data.length > 0);
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return [];
  }
}

// Create an agent
export const newAgent = (proxy = null) => {
  if (proxy) {
    if (proxy.startsWith('http://')) {
      return new HttpsProxyAgent(proxy);
    } else if (proxy.startsWith('socks4://') || proxy.startsWith('socks5://')) {
      return new SocksProxyAgent(proxy);
    } else {
      // log.warn(`Unsupported proxy type: ${proxy}`);
      return null;
    }
  }
  return null;
};
export async function getRandomProxy(proxyPath) {
  try {
    // Baca file yang berisi daftar proxy
    const proxies = await fs.readFile(proxyPath, 'utf-8');
    // Pisahkan berdasarkan baris baru untuk mendapatkan array
    const proxyArray = proxies.split('\n').map(proxy => proxy.trim()).filter(Boolean);

    // Cek jika array tidak kosong
    if (proxyArray.length === 0) {
      throw new Error('Proxy list is empty.');
    }

    // Pilih proxy secara acak
    const randomProxy = proxyArray[Math.floor(Math.random() * proxyArray.length)];
    return randomProxy;
  } catch (error) {
    console.error('Error while fetching random proxy:', error.message);
    throw error;
  }
}