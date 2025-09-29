#!/bin/bash

echo "🚀 DEPLOYING LEARNMATE BACKEND TO VERCEL"
echo "========================================"

# Kiểm tra git status
echo "📋 Checking git status..."
git status

# Add tất cả files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy backend to Vercel with MongoDB Atlas integration"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated!"
echo "🌐 Check Vercel dashboard for deployment status"
echo "🔗 URL: https://learnmate-rust.vercel.app"
