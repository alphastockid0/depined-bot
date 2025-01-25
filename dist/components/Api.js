import randomUseragent from 'random-useragent';
import axios from 'axios';
import { newAgent } from './Helper.js';
import chalk from 'chalk';
import { aborted } from 'util';
import { countryCode } from '../data/countryCode.js';
const userAgent = randomUseragent.getRandom();
const headers = {
  "Accept": "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent": userAgent
};
const errorMsg = ["aborted", "Request failed with status code 405", "Proxy connection ended before receiving CONNECT response", "IP is not added to the whitelist"];
export const addIpToWhitelist = async () => {
  try {
    const ipPublic = await getPublicIp();
    const ip = ipPublic.data;
    console.log(ip.data);

    // Memanggil API untuk menambahkan IP ke whitelist
    const response = await axios.get(`https://api.922proxy.com/api/add_ip`, {
      params: {
        user: '29562882',
        // Ganti dengan user Anda
        user_key: '490d52cc9d374854d70b6e28c5016779',
        // Ganti dengan user_key Anda
        ip: ip
      }
    });
    if (response.data.code === 0) {
      return {
        success: true,
        msg: response.data.msg,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        msg: response.data.msg,
        data: response.data.data
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.response?.data?.msg || error.message || '[Add IP Whitelist] Terjadi kesalahan',
      data: error.response?.data?.data || null
    };
  }
  ;
};
// Fungsi untuk mendapatkan IP publik (contoh menggunakan API lain)

export const getPublicIp = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    if (response.status === 200) {
      return {
        success: true,
        msg: 'Berhasil Mendapatkan IP Public',
        data: response.data.ip
      };
    } else {
      return {
        success: false,
        msg: 'Gagal Mendapatkan IP Public',
        data: null
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message || 'Terjadi kesalahan',
      data: null
    };
  }
};
export const getUserInfo = async (token, proxy) => {
  const agent = newAgent(proxy);
  try {
    const response = await axios.get('https://api.depined.org/api/user/details', {
      headers: {
        ...headers,
        'Authorization': 'Bearer ' + token
      },
      httpsAgent: agent,
      httpAgent: agent
    });
    // return response.status
    const data = response.data.data || null;
    return {
      success: true,
      msg: response.data.message || "Berhasil Mendapatkan User Details",
      data: {
        email: data.email,
        username: data.username,
        points: data.points_balance,
        tier: data.current_tier,
        widget: data.widget_connected
      } || null
    };
  } catch (error) {
    if (error.message === 'Proxy connection ended before receiving CONNECT response') {
      const whitelistResult = await addIpToWhitelist();
      return {
        success: false,
        msg: `Proxy error:Add To whitelist >> ${whitelistResult.msg}`,
        data: whitelistResult.data
      };
    } else if (errorMsg.includes(error.message)) {}
    return {
      success: false,
      msg: error.response?.data?.msg || error.message || 'Terjadi kesalahan',
      data: error.response?.data?.data || null
    };
  }
};
export async function getEarnings(token, proxy) {
  const agent = newAgent(proxy);
  try {
    const response = await axios.get('https://api.depined.org/api/stats/epoch-earnings', {
      headers: {
        ...headers,
        'Authorization': 'Bearer ' + token
      },
      httpsAgent: agent,
      httpAgent: agent
    });

    // return response;

    if (response.data.code === 200) {
      return {
        success: true,
        msg: response.data.message,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        msg: response.data.message,
        data: response.data.data
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.response?.data?.message || error.message || '[Add IP Whitelist] Terjadi kesalahan',
      data: error.response?.data?.data || null
    };
  }
  ;
}
export async function connect(token, proxy) {
  const agent = newAgent(proxy);
  try {
    const payload = {
      connected: true
    };
    const response = await axios.post('https://api.depined.org/api/user/widget-connect', payload, {
      headers: {
        ...headers,
        'Authorization': 'Bearer ' + token
      },
      httpsAgent: agent,
      httpAgent: agent
    });

    // return response.data;
    if (response.data.code === 200) {
      return {
        success: true,
        msg: response.data.message,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        msg: response.data.message,
        data: response.data.data
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.response?.data?.message || error.message || '[Add IP Whitelist] Terjadi kesalahan',
      data: error.response?.data?.data || null
    };
  }
  ;
}
export async function status(token, proxy) {
  const agent = newAgent(proxy);
  try {
    const payload = {
      connected: true
    };
    const response = await axios.post('https://api.depined.org/api/user/widget-status', payload, {
      headers: {
        ...headers,
        'Authorization': 'Bearer ' + token
      },
      httpsAgent: agent,
      httpAgent: agent
    });

    // Memeriksa status kode respons
    if (response.data.code === 200) {
      return {
        success: true,
        msg: response.data.message,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        msg: response.data.message,
        data: response.data.data
      };
    }
  } catch (error) {
    // if (error.message === 'Request failed with status code 405' || 'aborted') {
    //   // Ganti proxy dan ulangi proses
    //   const newProxy = randomUseragent.getRandom(); // Ganti dengan proxy baru
    //   return status(token, newProxy); // Panggil ulang fungsi dengan proxy baru
    // }
    return {
      success: false,
      msg: error.response?.data?.message || error.message || '[Add IP Whitelist] Terjadi kesalahan',
      data: error.response?.data?.data || null
    };
  }
}
export async function logWidgetStatus(token, proxy) {
  const agent = newAgent(proxy); // Membuat agent proxy jika diperlukan

  try {
    const response = await axios.get('https://api.depined.org/api/user/widget-status', {
      headers: {
        'Authorization': `Bearer ${token}`,
        // Menambahkan header Authorization dengan Bearer Token
        'Accept': 'application/json',
        // Menambahkan header Accept
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Origin': 'https://app.depined.org',
        'Referer': 'https://app.depined.org/'
      },
      httpsAgent: agent,
      // Menggunakan agent https jika menggunakan proxy atau pengaturan SSL
      httpAgent: agent // Menggunakan agent http jika diperlukan
    });
    const responseData = response.data;

    // Evaluasi respons
    // Memeriksa status kode respons
    if (response.data.code === 200) {
      return {
        success: true,
        msg: response.data.message,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        msg: response.data.message,
        data: response.data.data
      };
    }
  } catch (error) {
    // if (error.message === 'Request failed with status code 405' || 'aborted') {
    //   // Ganti proxy dan ulangi proses
    //   const newProxy = randomUseragent.getRandom(); // Ganti dengan proxy baru
    //   return status(token, newProxy); // Panggil ulang fungsi dengan proxy baru
    // }
    return {
      success: false,
      msg: error.response?.data?.message || error.message || '[Add IP Whitelist] Terjadi kesalahan',
      data: error.response?.data?.data || null
    };
  }
}
export async function getEarningsData(token, proxy) {
  try {
    const agent = newAgent(proxy); // Ganti dengan implementasi proxy Anda
    const response = await axios.get('https://api.depined.org/api/stats/earnings', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      httpsAgent: agent,
      httpAgent: agent
    });
    const data = response.data.data;
    // Memeriksa status kode respons
    if (response.data.code === 200) {
      return {
        success: true,
        msg: response.data.message,
        data: {
          today: data.total_points_today,
          points: data.total_points_balance,
          tier: data.current_tier,
          reff: data.total_referrals,
          epoch: data.current_epoch,
          uptime: data.uptime_epoch
        }
      };
    } else {
      return {
        success: false,
        msg: response.data.message,
        data: response.data.data
      };
    }
  } catch (error) {
    // if (error.message === 'Request failed with status code 405' || 'aborted') {
    //   // Ganti proxy dan ulangi proses
    //   const newProxy = randomUseragent.getRandom(); // Ganti dengan proxy baru
    //   return status(token, newProxy); // Panggil ulang fungsi dengan proxy baru
    // }
    return {
      success: false,
      msg: error.response?.data?.message || error.message || '[Add IP Whitelist] Terjadi kesalahan',
      data: error.response?.data?.data || null
    };
  }
}
// ############################################################################

const TEST_URL = 'https://ipinfo.io';
export async function testProxy(host, port) {
  const proxy = `http://${host}:${port}`;
  try {
    // Mengirim permintaan menggunakan proxy
    const response = await axios.get(TEST_URL, {
      proxy: {
        host,
        port
      },
      timeout: 5000 // Timeout untuk membatasi waktu pengujian
    });

    // Memastikan respons berhasil
    if (response.status === 200) {
      return {
        success: true,
        msg: 'Proxy test passed',
        data: response.data // Data respons
      };
    } else {
      return {
        success: false,
        msg: `Unexpected response status: ${response.status}`,
        data: null
      };
    }
  } catch (error) {
    // Menangani berbagai jenis kesalahan
    let errorMessage = '[Proxy Test] Unknown error occurred';
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Connection timed out';
    } else if (error.response) {
      errorMessage = `HTTP error: ${error.response.status}`;
    } else if (error.message.includes('certificate')) {
      errorMessage = 'Certificate error';
    } else if (error.message.includes('connect')) {
      errorMessage = 'Connection error';
    }
    return {
      success: false,
      msg: errorMessage,
      data: null
    };
  }
}
export async function fetchProxies() {
  try {
    const EXTRACT_URL = `https://api.922proxy.com/api/extract_ip?regions=&num=1&protocol=http&type=json&lt=1`;
    const response = await axios.get(EXTRACT_URL, {
      timeout: 5000
    });
    const data = response.data;
    if (data.code === 0) {
      return {
        success: true,
        msg: data.msg,
        data: data.data
      };
    } else if (data.msg === "IP is not added to the whitelist") {
      const whitelistResult = await addIpToWhitelist();
      return {
        success: false,
        msg: `Proxy error: Add To whitelist >> ${whitelistResult.msg}`,
        data: whitelistResult.data
      };
    } else {
      return {
        success: false,
        msg: data.msg || "Unknown error",
        data: null
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message || '[Extract IP] Error occurred',
      data: null
    };
  }
}
export async function getProxy() {
  try {
    const proxies = await fetchProxies();
    // Pastikan respons fetchProxies berhasil
    if (!proxies.success || !proxies.data) {
      console.log("Failed to fetch proxies, retrying...");
    }
    const {
      ip,
      port
    } = proxies.data;

    // Uji proxy menggunakan testProxy
    const test = await testProxy(ip, port);
    if (test.success) {
      return {
        success: true,
        msg: "Found a valid proxy",
        data: {
          ip,
          port
        }
      };
    } else {
      return {
        success: false,
        msg: test.msg || "Not Found a valid proxy",
        data: {
          ip,
          port
        }
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message,
      data: {
        ip,
        port
      }
    };
  }
}
export const test = async (token, proxy) => {
  const A = await getUserInfo(token, proxy);
  const B = await getEarningsData(token, proxy);
  const C = await logWidgetStatus(token, proxy);
  return {
    // A,
    B
    // C
  };
};