import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CommunityPage.scss';
import ForumList from './Forum/ForumList';
import StudyGroupList from './StudyGroups/StudyGroupList';
import QuestionList from './QA/QuestionList';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.account);

  const tabs = [
    { id: 'forum', label: 'Diễn đàn', icon: '💬' },
    { id: 'study-groups', label: 'Nhóm học', icon: '👥' },
    { id: 'qa', label: 'Hỏi đáp', icon: '❓' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'forum':
        return <ForumList />;
      case 'study-groups':
        return <StudyGroupList />;
      case 'qa':
        return <QuestionList />;
      default:
        return <ForumList />;
    }
  };

  return (
    <div className="community-page">
      {/* Header */}
      <div className="community-header">
        <div className="container">
          <h1>🌟 Cộng đồng LearnMate</h1>
          <p>Kết nối, học hỏi và chia sẻ kinh nghiệm cùng cộng đồng học tập</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="community-nav">
        <div className="container">
          <div className="nav-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="container">
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">📊</div>
              <h3>Thống kê cộng đồng</h3>
              <div className="stats">
                <div className="stat">
                  <span className="number">1,250+</span>
                  <span className="label">Thành viên</span>
                </div>
                <div className="stat">
                  <span className="number">3,500+</span>
                  <span className="label">Bài viết</span>
                </div>
                <div className="stat">
                  <span className="number">150+</span>
                  <span className="label">Nhóm học</span>
                </div>
              </div>
            </div>

            <div className="action-card">
              <div className="action-icon">🏆</div>
              <h3>Bảng xếp hạng</h3>
              <div className="leaderboard-preview">
                <div className="rank-item">
                  <span className="rank">1</span>
                  <span className="name">Nguyễn Văn A</span>
                  <span className="points">2,450 pts</span>
                </div>
                <div className="rank-item">
                  <span className="rank">2</span>
                  <span className="name">Trần Thị B</span>
                  <span className="points">2,100 pts</span>
                </div>
                <div className="rank-item">
                  <span className="rank">3</span>
                  <span className="name">Lê Văn C</span>
                  <span className="points">1,850 pts</span>
                </div>
              </div>
              <button className="btn-secondary">Xem tất cả</button>
            </div>

            <div className="action-card">
              <div className="action-icon">📅</div>
              <h3>Sự kiện sắp tới</h3>
              <div className="events-preview">
                <div className="event-item">
                  <span className="date">28/09</span>
                  <span className="title">Workshop Toán học</span>
                </div>
                <div className="event-item">
                  <span className="date">30/09</span>
                  <span className="title">Thi thử IELTS</span>
                </div>
                <div className="event-item">
                  <span className="date">02/10</span>
                  <span className="title">Hội thảo Lập trình</span>
                </div>
              </div>
              <button className="btn-secondary">Xem lịch</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="community-content">
        <div className="container">
          <div className="content-header">
            <h2>
              {tabs.find(tab => tab.id === activeTab)?.icon} 
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            {isAuthenticated && (
              <div className="content-actions">
                {activeTab === 'forum' && (
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/community/forum/create')}
                  >
                    Tạo bài viết mới
                  </button>
                )}
                {activeTab === 'study-groups' && (
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/community/study-groups/create')}
                  >
                    Tạo nhóm học
                  </button>
                )}
                {activeTab === 'qa' && (
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/community/qa/ask')}
                  >
                    Đặt câu hỏi
                  </button>
                )}
              </div>
            )}
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
