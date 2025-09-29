# 🚀 HƯỚNG DẪN DEPLOY DỮ LIỆU LÊN PRODUCTION

## 📋 **TỔNG QUAN**
Script này sẽ giúp bạn đẩy dữ liệu gia sư từ MongoDB local lên production database.

## 🔧 **BƯỚC 1: CHUẨN BỊ**

### 1.1. Kiểm tra dữ liệu local
```bash
node verifyData.js  # (đã xóa, nhưng có thể tạo lại)
```

### 1.2. Export dữ liệu (đã làm)
```bash
node exportData.js  # Tạo file tutorData.json
```

## 🎯 **BƯỚC 2: CẤU HÌNH PRODUCTION**

### 2.1. Thêm vào file .env
```env
# Thêm dòng này vào file .env
PRODUCTION_DB_HOST=mongodb+srv://username:password@cluster.mongodb.net/learnmate?retryWrites=true&w=majority
```

### 2.2. Các loại database production:

#### **MongoDB Atlas (Khuyến nghị)**
```env
PRODUCTION_DB_HOST=mongodb+srv://username:password@cluster.mongodb.net/learnmate?retryWrites=true&w=majority
```

#### **MongoDB Server riêng**
```env
PRODUCTION_DB_HOST=mongodb://username:password@your-server.com:27017/learnmate
```

#### **Localhost khác**
```env
PRODUCTION_DB_HOST=mongodb://localhost:27017/learnmate_production
```

## 🚀 **BƯỚC 3: DEPLOY**

### 3.1. Chạy script deploy
```bash
node deployData.js
```

### 3.2. Script sẽ:
- ✅ Đọc dữ liệu từ tutorData.json
- ✅ Kết nối production database
- ✅ Backup dữ liệu cũ (nếu có)
- ✅ Xóa dữ liệu cũ
- ✅ Import dữ liệu mới
- ✅ Kiểm tra kết quả

## 📊 **BƯỚC 4: KIỂM TRA**

### 4.1. Kiểm tra trên MongoDB Atlas
- Vào MongoDB Atlas Dashboard
- Xem collections: users, tutors
- Kiểm tra số lượng documents

### 4.2. Test API
```bash
# Test API tutors
curl https://your-api-domain.com/tutors

# Hoặc test local với production DB
npm start
```

## 🔍 **TROUBLESHOOTING**

### Lỗi kết nối
```
❌ LỖI DEPLOY: connection timeout
```
**Giải pháp:**
- Kiểm tra connection string
- Kiểm tra network
- Kiểm tra IP whitelist (MongoDB Atlas)

### Lỗi quyền truy cập
```
❌ LỖI DEPLOY: authentication failed
```
**Giải pháp:**
- Kiểm tra username/password
- Kiểm tra database permissions

### Lỗi file không tồn tại
```
❌ LỖI DEPLOY: ENOENT: no such file or directory
```
**Giải pháp:**
```bash
node exportData.js  # Tạo lại file tutorData.json
```

## 📁 **FILES QUAN TRỌNG**

- `tutorData.json` - Dữ liệu export từ local
- `deployData.js` - Script deploy chính
- `backup_*.json` - Backup dữ liệu cũ (tự động tạo)
- `.env` - Cấu hình database

## 🎯 **KẾT QUẢ MONG ĐỢI**

Sau khi deploy thành công:
- ✅ 5 users với role='tutor'
- ✅ 5 tutors với đầy đủ thông tin
- ✅ Frontend hiển thị dữ liệu mới
- ✅ API trả về dữ liệu đúng format

## 📞 **HỖ TRỢ**

Nếu gặp vấn đề, hãy cung cấp:
1. Connection string (ẩn password)
2. Lỗi cụ thể
3. Log output từ script
