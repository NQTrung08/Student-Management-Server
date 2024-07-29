const mongoose = require('mongoose');
require('dotenv').config();

// Lấy URL kết nối MongoDB từ biến môi trường
const mongoUrlOnline = process.env.MONGO_URL_ONLINE;
const mongoUrlOffline = process.env.MONGO_URL_OFFLINE;

// Hàm kết nối tới MongoDB
const connect = async () => {
    try {
        // Cố gắng kết nối với URL online trước
        await mongoose.connect(mongoUrlOnline);
        console.log('Connected to MongoDB online successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB online:', err);
        console.log('Switching to offline MongoDB URL...');

        try {
            // Nếu kết nối online thất bại, cố gắng kết nối với URL offline
            await mongoose.connect(mongoUrlOffline);
            console.log('Connected to MongoDB offline successfully');
        } catch (offlineErr) {
            console.error('Failed to connect to MongoDB offline:', offlineErr);
            process.exit(1); // Kết thúc ứng dụng nếu không thể kết nối
        }
    }
};

// Xuất hàm kết nối
module.exports = connect;
