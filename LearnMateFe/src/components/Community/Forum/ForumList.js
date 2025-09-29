import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumList.scss';

const ForumList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', label: 'Tất cả', icon: '📚' },
    { id: 'math', label: 'Toán học', icon: '🔢' },
    { id: 'physics', label: 'Vật lý', icon: '⚛️' },
    { id: 'chemistry', label: 'Hóa học', icon: '🧪' },
    { id: 'english', label: 'Tiếng Anh', icon: '🇬🇧' },
    { id: 'programming', label: 'Lập trình', icon: '💻' },
    { id: 'general', label: 'Chung', icon: '💬' }
  ];

  const mockPosts = [
    {
      id: 1,
      title: 'Cách giải phương trình bậc 2 hiệu quả nhất',
      content: 'Mình đang gặp khó khăn với việc giải phương trình bậc 2. Có ai có phương pháp nào hiệu quả không?',
      author: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/40',
      category: 'math',
      replies: 15,
      views: 234,
      likes: 28,
      createdAt: '2 giờ trước',
      tags: ['toán học', 'phương trình', 'bậc 2']
    },
    {
      id: 2,
      title: 'Tài liệu học IELTS miễn phí chất lượng cao',
      content: 'Chia sẻ bộ tài liệu IELTS mình đã sưu tầm, rất hữu ích cho các bạn đang ôn thi.',
      author: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/40',
      category: 'english',
      replies: 8,
      views: 156,
      likes: 42,
      createdAt: '4 giờ trước',
      tags: ['ielts', 'tài liệu', 'miễn phí']
    },
    {
      id: 3,
      title: 'Hướng dẫn học React.js từ cơ bản đến nâng cao',
      content: 'Mình sẽ chia sẻ roadmap học React.js dành cho người mới bắt đầu.',
      author: 'Lê Văn C',
      avatar: 'https://i.pravatar.cc/40',
      category: 'programming',
      replies: 23,
      views: 445,
      likes: 67,
      createdAt: '6 giờ trước',
      tags: ['react', 'javascript', 'frontend']
    },
    {
      id: 4,
      title: 'Công thức tính nhanh trong Vật lý',
      content: 'Tổng hợp các công thức tính nhanh giúp tiết kiệm thời gian trong thi cử.',
      author: 'Phạm Thị D',
      avatar: 'https://i.pravatar.cc/40',
      category: 'physics',
      replies: 12,
      views: 189,
      likes: 35,
      createdAt: '8 giờ trước',
      tags: ['vật lý', 'công thức', 'tính nhanh']
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="forum-list">
      {/* Category Filter */}
      <div className="category-filter">
        <div className="filter-tabs">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-label">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="posts-container">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="author-info">
                <img src={post.avatar} alt={post.author} className="author-avatar" />
                <div className="author-details">
                  <span className="author-name">{post.author}</span>
                  <span className="post-time">{post.createdAt}</span>
                </div>
              </div>
              <div className="post-category">
                {categories.find(cat => cat.id === post.category)?.icon}
                {categories.find(cat => cat.id === post.category)?.label}
              </div>
            </div>

            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.content}</p>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="post-stats">
              <div className="stat-item">
                <span className="stat-icon">💬</span>
                <span className="stat-value">{post.replies}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👁️</span>
                <span className="stat-value">{post.views}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👍</span>
                <span className="stat-value">{post.likes}</span>
              </div>
            </div>

            <div className="post-actions">
              <button className="btn-like">
                <span>👍</span> Thích
              </button>
              <button className="btn-reply">
                <span>💬</span> Trả lời
              </button>
              <button className="btn-share">
                <span>📤</span> Chia sẻ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="load-more">
        <button className="btn-load-more">
          Tải thêm bài viết
        </button>
      </div>
    </div>
  );
};

export default ForumList;
