#!/bin/bash

echo "🚀 SETUP LEARNMATE LOCALHOST"
echo "================================"

echo ""
echo "📥 Installing Backend Dependencies..."
cd LearnMateBe
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed!"
    exit 1
fi

echo ""
echo "📥 Installing Frontend Dependencies..."
cd ../LearnMateFe
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed!"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "🚀 Starting Backend Server..."
cd ../LearnMateBe
npm start &
BACKEND_PID=$!

echo ""
echo "🚀 Starting Frontend Server..."
cd ../LearnMateFe
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Setup completed!"
echo ""
echo "📱 Access your application:"
echo "   Frontend: http://localhost:6161"
echo "   Backend:  http://localhost:8888"
echo ""
echo "Press Ctrl+C to stop servers..."

# Wait for user to stop
wait
