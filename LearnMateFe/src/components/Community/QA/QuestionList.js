import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionList.scss';

const QuestionList = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  const statuses = [
    { id: 'all', label: 'Tất cả', icon: '📋' },
    { id: 'unanswered', label: 'Chưa trả lời', icon: '❓' },
    { id: 'answered', label: 'Đã trả lời', icon: '✅' },
    { id: 'resolved', label: 'Đã giải quyết', icon: '🎯' }
  ];

  const mockQuestions = [
    {
      id: 1,
      title: 'Cách tính đạo hàm của hàm số phức tạp?',
      content: 'Mình đang gặp khó khăn với việc tính đạo hàm của hàm số y = (x² + 1) / (x - 2). Có ai có thể hướng dẫn chi tiết không?',
      author: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/40',
      status: 'answered',
      answers: 3,
      views: 156,
      likes: 12,
      createdAt: '2 giờ trước',
      tags: ['toán học', 'đạo hàm', 'giải tích'],
      bestAnswer: {
        author: 'Trần Thị B',
        content: 'Để tính đạo hàm của hàm số này, bạn cần sử dụng quy tắc thương...',
        likes: 8
      }
    },
    {
      id: 2,
      title: 'Phân biệt Present Perfect và Past Simple trong tiếng Anh?',
      content: 'Mình hay nhầm lẫn giữa Present Perfect và Past Simple. Có ai có thể giải thích rõ sự khác biệt và cách sử dụng không?',
      author: 'Lê Văn C',
      avatar: 'https://i.pravatar.cc/40',
      status: 'resolved',
      answers: 5,
      views: 234,
      likes: 18,
      createdAt: '4 giờ trước',
      tags: ['tiếng anh', 'ngữ pháp', 'present perfect'],
      bestAnswer: {
        author: 'Phạm Thị D',
        content: 'Present Perfect dùng để diễn tả hành động đã hoàn thành trong quá khứ nhưng có liên quan đến hiện tại...',
        likes: 15
      }
    },
    {
      id: 3,
      title: 'Lỗi "Cannot read property of undefined" trong React?',
      content: 'Mình đang gặp lỗi này khi render component React. Có ai biết nguyên nhân và cách khắc phục không?',
      author: 'Hoàng Văn E',
      avatar: 'https://i.pravatar.cc/40',
      status: 'unanswered',
      answers: 0,
      views: 89,
      likes: 5,
      createdAt: '6 giờ trước',
      tags: ['react', 'javascript', 'lỗi', 'debugging']
    },
    {
      id: 4,
      title: 'Công thức tính nhanh trong Vật lý?',
      content: 'Có ai có bộ công thức tính nhanh cho các bài tập Vật lý không? Mình cần để ôn thi.',
      author: 'Vũ Thị F',
      avatar: 'https://i.pravatar.cc/40',
      status: 'answered',
      answers: 2,
      views: 167,
      likes: 9,
      createdAt: '8 giờ trước',
      tags: ['vật lý', 'công thức', 'ôn thi'],
      bestAnswer: {
        author: 'Đặng Văn G',
        content: 'Mình có một số công thức tính nhanh cho các dạng bài thường gặp...',
        likes: 6
      }
    }
  ];

  const filteredQuestions = selectedStatus === 'all' 
    ? mockQuestions 
    : mockQuestions.filter(question => question.status === selectedStatus);

  return (
    <div className="question-list">
      {/* Status Filter */}
      <div className="status-filter">
        <div className="filter-tabs">
          {statuses.map(status => (
            <button
              key={status.id}
              className={`filter-tab ${selectedStatus === status.id ? 'active' : ''}`}
              onClick={() => setSelectedStatus(status.id)}
            >
              <span className="tab-icon">{status.icon}</span>
              <span className="tab-label">{status.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="questions-container">
        {filteredQuestions.map(question => (
          <div key={question.id} className="question-card">
            <div className="question-header">
              <div className="author-info">
                <img src={question.avatar} alt={question.author} className="author-avatar" />
                <div className="author-details">
                  <span className="author-name">{question.author}</span>
                  <span className="question-time">{question.createdAt}</span>
                </div>
              </div>
              <div className={`status-badge status-${question.status}`}>
                {statuses.find(s => s.id === question.status)?.icon}
                {statuses.find(s => s.id === question.status)?.label}
              </div>
            </div>

            <div className="question-content">
              <h3 className="question-title">{question.title}</h3>
              <p className="question-excerpt">{question.content}</p>
              <div className="question-tags">
                {question.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>

            {question.bestAnswer && (
              <div className="best-answer">
                <div className="best-answer-header">
                  <span className="best-answer-label">💡 Câu trả lời hay nhất</span>
                  <span className="best-answer-author">bởi {question.bestAnswer.author}</span>
                </div>
                <p className="best-answer-content">{question.bestAnswer.content}</p>
                <div className="best-answer-stats">
                  <span className="likes">👍 {question.bestAnswer.likes}</span>
                </div>
              </div>
            )}

            <div className="question-stats">
              <div className="stat-item">
                <span className="stat-icon">💬</span>
                <span className="stat-value">{question.answers}</span>
                <span className="stat-label">trả lời</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👁️</span>
                <span className="stat-value">{question.views}</span>
                <span className="stat-label">lượt xem</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👍</span>
                <span className="stat-value">{question.likes}</span>
                <span className="stat-label">thích</span>
              </div>
            </div>

            <div className="question-actions">
              <button className="btn-answer">
                <span>💬</span> Trả lời
              </button>
              <button className="btn-like">
                <span>👍</span> Thích
              </button>
              <button className="btn-share">
                <span>📤</span> Chia sẻ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Question CTA */}
      <div className="ask-question-cta">
        <div className="cta-content">
          <h3>Không tìm thấy câu trả lời?</h3>
          <p>Đặt câu hỏi của bạn và nhận được sự giúp đỡ từ cộng đồng!</p>
          <button className="btn-ask-question">
            Đặt câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
