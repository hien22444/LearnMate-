# 🎓 LearnMate - Hệ Thống Gia Sư Trực Tuyến

## 📋 Tổng Quan

LearnMate là một nền tảng kết nối học sinh với gia sư chất lượng cao, cung cấp các tính năng:

- 🔍 Tìm kiếm và lọc gia sư theo môn học, lớp, giá cả
- 📅 Đặt lịch học linh hoạt
- 💬 Chat real-time với gia sư
- 💳 Thanh toán trực tuyến (VNPay)
- ⭐ Đánh giá và review
- 👨‍💼 Quản lý admin

## 🏗️ Kiến Trúc Hệ Thống

### Backend (Node.js + Express)
- **Framework**: Express.js
- **Database**: MongoDB (Atlas/Local)
- **Authentication**: JWT + Passport.js
- **Real-time**: Socket.IO
- **Payment**: VNPay integration
- **File Upload**: Cloudinary

### Frontend (React)
- **Framework**: React 18
- **State Management**: Redux + Redux Persist
- **UI Libraries**: Ant Design, Material-UI, Bootstrap
- **Styling**: SCSS, Tailwind CSS
- **Routing**: React Router DOM

## 🚀 Cài Đặt Nhanh

### Yêu Cầu Hệ Thống
- Node.js (v16+)
- MongoDB (Local hoặc Atlas)
- Git

### Cách 1: Sử dụng Script Tự Động

**Windows:**
```bash
# Chạy file setup.bat
setup.bat
```

**Linux/Mac:**
```bash
# Cấp quyền và chạy
chmod +x setup.sh
./setup.sh
```

### Cách 2: Cài Đặt Thủ Công

**1. Clone repository:**
```bash
git clone https://github.com/hien22444/LearnMate-.git
cd LearnMate-
```

**2. Setup Backend:**
```bash
cd LearnMateBe
npm install
cp .env.example .env
# Cập nhật .env với thông tin database
npm start
```

**3. Setup Frontend:**
```bash
cd LearnMateFe
npm install
npm start
```

## 📊 Cấu Hình Database

### MongoDB Atlas (Khuyến nghị)
1. Tạo cluster tại [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Lấy connection string
3. Cập nhật `DB_HOST` trong file `.env`

### MongoDB Local
1. Cài đặt MongoDB Community Server
2. Start service
3. Sử dụng: `mongodb://localhost:27017/learnmate`

## 🎯 Thêm Dữ Liệu Mẫu

```bash
# Trong thư mục LearnMateBe
node seedData.js
```

## 📱 Truy Cập Ứng Dụng

- **Frontend**: http://localhost:6161
- **Backend API**: http://localhost:8888
- **API Docs**: http://localhost:8888/tutors

## 🔧 Cấu Hình Environment

### Backend (.env)
```env
DB_HOST=mongodb://localhost:27017/learnmate
PORT=8888
CLIENT_URL=http://localhost:6161
JWT_SECRET=your-secret-key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8888
```

## 📚 API Endpoints

### Authentication
- `POST /login` - Đăng nhập
- `POST /register` - Đăng ký
- `POST /verify-otp` - Xác thực OTP

### Tutors
- `GET /tutors` - Lấy danh sách gia sư
- `GET /tutors/:id` - Lấy thông tin gia sư
- `POST /tutor/application` - Nộp đơn gia sư

### Bookings
- `POST /booking/:tutorId` - Đặt lịch học
- `GET /bookings/user/:userId` - Lịch sử đặt lịch

### Payments
- `POST /payment/create-vnpay` - Tạo thanh toán VNPay
- `GET /payment/vnpay_return` - Callback VNPay

## 🛠️ Development

### Chạy Development Mode
```bash
# Backend
cd LearnMateBe
npm run dev

# Frontend
cd LearnMateFe
npm start
```

### Build Production
```bash
# Frontend
cd LearnMateFe
npm run build
```

## 🚀 Deployment

### Vercel (Frontend + Backend)
1. Connect GitHub repository với Vercel
2. Set environment variables
3. Deploy tự động

### Manual Deployment
1. Build frontend: `npm run build`
2. Deploy backend lên server
3. Cấu hình reverse proxy

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **Port đã được sử dụng:**
   - Thay đổi PORT trong .env
   - Hoặc kill process đang sử dụng port

2. **Database connection failed:**
   - Kiểm tra connection string
   - Đảm bảo MongoDB đang chạy
   - Kiểm tra network/firewall

3. **Dependencies không cài được:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📞 Hỗ Trợ

- 📧 Email: support@learnmate.com
- 📱 GitHub Issues: [Create Issue](https://github.com/hien22444/LearnMate-/issues)
- 📖 Documentation: [Wiki](https://github.com/hien22444/LearnMate-/wiki)

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Contributors

- **Developer**: Hien Nguyen
- **Design**: LearnMate Team
- **Testing**: QA Team

---

**🎉 Chúc bạn sử dụng LearnMate thành công!**
