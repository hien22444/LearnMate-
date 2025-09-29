# 🚀 HƯỚNG DẪN CHẠY LEARNMATE TRÊN LOCALHOST

## 📋 YÊU CẦU HỆ THỐNG

### Cần cài đặt:
- ✅ Node.js (v16 trở lên) - [Download](https://nodejs.org/)
- ✅ MongoDB (local hoặc MongoDB Atlas)
- ✅ Git - [Download](https://git-scm.com/)

## 📥 BƯỚC 1: TẢI CODE VỀ

### Option 1: Clone từ GitHub
```bash
git clone https://github.com/hien22444/LearnMate-.git
cd LearnMate-
```

### Option 2: Download ZIP
1. Vào: https://github.com/hien22444/LearnMate-
2. Click "Code" → "Download ZIP"
3. Giải nén vào thư mục mong muốn

## 🗄️ BƯỚC 2: CẤU HÌNH DATABASE

### Option A: Sử dụng MongoDB Atlas (Khuyến nghị)
1. Tạo tài khoản tại: https://www.mongodb.com/atlas
2. Tạo cluster miễn phí
3. Lấy connection string
4. Cập nhật file `.env` trong thư mục `LearnMateBe`

### Option B: Cài MongoDB Local
1. Download MongoDB Community Server
2. Cài đặt và start service
3. Sử dụng connection string: `mongodb://localhost:27017/learnmate`

## ⚙️ BƯỚC 3: CẤU HÌNH BACKEND

```bash
# Vào thư mục backend
cd LearnMateBe

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env
```

### Cập nhật file .env:
```env
# Database Configuration
DB_HOST=mongodb+srv://username:password@cluster.mongodb.net/learnmate?retryWrites=true&w=majority

# Server Configuration
PORT=8888
HOST_NAME=localhost

# Client Configuration
CLIENT_URL=http://localhost:6161
FRONTEND_URL=http://localhost:6161

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-learnmate-2024

# Email Configuration (tùy chọn)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary Configuration (tùy chọn)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# VNPay Configuration (tùy chọn)
VNPAY_TMN_CODE=your-tmn-code
VNPAY_HASH_SECRET=your-hash-secret
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_RETURN_URL=http://localhost:6161/payment-result

# Google OAuth (tùy chọn)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## ⚙️ BƯỚC 4: CẤU HÌNH FRONTEND

```bash
# Vào thư mục frontend
cd LearnMateFe

# Cài đặt dependencies
npm install

# Tạo file .env (nếu cần)
echo "REACT_APP_API_URL=http://localhost:8888" > .env
```

## 🚀 BƯỚC 5: CHẠY HỆ THỐNG

### Terminal 1 - Backend:
```bash
cd LearnMateBe
npm start
```
Backend sẽ chạy tại: http://localhost:8888

### Terminal 2 - Frontend:
```bash
cd LearnMateFe
npm start
```
Frontend sẽ chạy tại: http://localhost:6161

## 📊 BƯỚC 6: THÊM DỮ LIỆU MẪU

Sau khi backend chạy thành công, bạn có thể thêm dữ liệu gia sư mẫu:

```bash
# Trong thư mục LearnMateBe
node seedTutors.js  # (nếu có file này)
```

Hoặc thêm dữ liệu thủ công qua API:
```bash
curl -X POST http://localhost:8888/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"123456","role":"student"}'
```

## 🔍 KIỂM TRA HỆ THỐNG

### Test API:
- Health check: http://localhost:8888/
- Tutors API: http://localhost:8888/tutors
- Community API: http://localhost:8888/community

### Test Frontend:
- Homepage: http://localhost:6161/
- Community: http://localhost:6161/community
- Tutor List: http://localhost:6161/tutor

## 🐛 TROUBLESHOOTING

### Lỗi thường gặp:

1. **Port đã được sử dụng:**
   ```bash
   # Thay đổi port trong .env
   PORT=8889
   ```

2. **Database connection failed:**
   - Kiểm tra connection string
   - Đảm bảo MongoDB đang chạy
   - Kiểm tra network/firewall

3. **Dependencies không cài được:**
   ```bash
   # Xóa node_modules và cài lại
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Frontend không kết nối được backend:**
   - Kiểm tra CORS settings
   - Đảm bảo backend đang chạy
   - Kiểm tra API URL trong frontend

## 📱 TÍNH NĂNG CHÍNH

- ✅ Đăng ký/Đăng nhập
- ✅ Quản lý gia sư
- ✅ Tìm kiếm và lọc gia sư
- ✅ Đặt lịch học
- ✅ Thanh toán (VNPay)
- ✅ Chat real-time
- ✅ Đánh giá và review
- ✅ Quản lý admin

## 🎯 KẾT QUẢ MONG ĐỢI

Sau khi setup thành công:
- ✅ Backend API hoạt động tại port 8888
- ✅ Frontend React hoạt động tại port 6161
- ✅ Database kết nối thành công
- ✅ Tất cả tính năng hoạt động bình thường

## 📞 HỖ TRỢ

Nếu gặp vấn đề, hãy kiểm tra:
1. Console logs của backend và frontend
2. Network tab trong browser DevTools
3. Database connection status
4. Environment variables

Chúc bạn setup thành công! 🎉
