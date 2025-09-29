# LearnMate Backend API

## 🚀 Deployment trên Vercel

### Environment Variables cần thiết:

```env
DB_HOST=mongodb+srv://SDN392:23f5SeJ9KZyFY5ny@sdn392.oozdntu.mongodb.net/SDN392Mongo?retryWrites=true&w=majority&appName=SDN392
CLIENT_URL=https://learnmate-rust.vercel.app
FRONTEND_URL=https://learnmate-rust.vercel.app
JWT_SECRET=your-super-secret-jwt-key-learnmate-2024
```

### API Endpoints:

- `GET /` - Health check
- `GET /tutors` - Lấy danh sách gia sư
- `POST /login` - Đăng nhập
- `POST /register` - Đăng ký
- `GET /community` - API cộng đồng

### Cách deploy:

1. Push code lên GitHub
2. Connect với Vercel
3. Set environment variables
4. Deploy

## 📊 Database

- **MongoDB Atlas**: SDN392Mongo
- **Collections**: users, tutors, bookings, payments, etc.
- **Dữ liệu**: 5 gia sư mẫu đã được thêm
