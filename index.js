    const cron = require('node-cron');
    const axios = require('axios');
    const os = require('os');

    const fetchLink = async (url, name) => {
    const currentTime = new Date().toLocaleTimeString(); // Waktu saat ini
    const hostname = os.hostname(); // Nama host server
    const platform = os.platform(); // Platform sistem operasi

    try {
        const response = await axios.get(url);

        if (response.status === 200) {
        console.log(`[${currentTime}] Request berhasil dari ${name} server ${hostname} (${platform})`);
        } else {
        console.log(`[${currentTime}] Gagal melakukan request dari ${name} server ${hostname} (${platform})`);
        }
    } catch (error) {
        console.error(`[${currentTime}] Terjadi kesalahan dari ${name} server ${hostname} (${platform}):`, error.message);
    }
    };

    // Jadwal setiap 0.5 detik (500 ms) untuk Link 1
    const jobEvery500msLink1 = cron.schedule('*/0.5 * * * * *', () => {
    fetchLink('https://claymorestore.shop/tools/cek_vip.php', 'Cek Status VIP');
    }, {
    scheduled: false, // Mulai secara manual, akan dijalankan saat Anda memanggil `jobEvery500msLink1.start()`
    });

    // Jadwal setiap 5 jam (300 menit) untuk Link 2
    const jobEvery5HoursLink2 = cron.schedule('0 */5 * * *', () => {
    fetchLink('https://claymorestore.shop/tools/product_vip.php', 'Update Product VIP');
    }, {
    scheduled: false, // Mulai secara manual, akan dijalankan saat Anda memanggil `jobEvery5HoursLink2.start()`
    });

    jobEvery500msLink1.start(); // Mulai Cron Job setiap 500 ms untuk Link 1
    jobEvery5HoursLink2.start(); // Mulai Cron Job setiap 5 jam untuk Link 2
