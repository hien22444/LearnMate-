import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyGroupList.scss';

const StudyGroupList = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const navigate = useNavigate();

  const subjects = [
    { id: 'all', label: 'Tất cả', icon: '📚' },
    { id: 'math', label: 'Toán học', icon: '🔢' },
    { id: 'physics', label: 'Vật lý', icon: '⚛️' },
    { id: 'chemistry', label: 'Hóa học', icon: '🧪' },
    { id: 'english', label: 'Tiếng Anh', icon: '🇬🇧' },
    { id: 'programming', label: 'Lập trình', icon: '💻' }
  ];

  const mockStudyGroups = [
    {
      id: 1,
      name: 'Nhóm học Toán 12 - Ôn thi Đại học',
      description: 'Nhóm học tập chuyên sâu về Toán 12, chuẩn bị cho kỳ thi Đại học. Chúng ta sẽ cùng nhau giải đề, chia sẻ kinh nghiệm và hỗ trợ lẫn nhau.',
      subject: 'math',
      level: 'Nâng cao',
      members: 24,
      maxMembers: 30,
      creator: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/40',
      createdAt: '3 ngày trước',
      nextSession: 'Hôm nay, 19:00',
      tags: ['toán 12', 'ôn thi đại học', 'nâng cao']
    },
    {
      id: 2,
      name: 'IELTS Speaking Club',
      description: 'Nhóm luyện thi IELTS Speaking, thực hành giao tiếp tiếng Anh hàng ngày. Mọi trình độ đều được chào đón!',
      subject: 'english',
      level: 'Trung bình',
      members: 18,
      maxMembers: 25,
      creator: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/40',
      createdAt: '1 tuần trước',
      nextSession: 'Mai, 20:00',
      tags: ['ielts', 'speaking', 'tiếng anh']
    },
    {
      id: 3,
      name: 'React.js Study Group',
      description: 'Học React.js từ cơ bản đến nâng cao. Chúng ta sẽ làm project thực tế và chia sẻ kinh nghiệm lập trình.',
      subject: 'programming',
      level: 'Cơ bản',
      members: 12,
      maxMembers: 20,
      creator: 'Lê Văn C',
      avatar: 'https://i.pravatar.cc/40',
      createdAt: '5 ngày trước',
      nextSession: 'Thứ 7, 14:00',
      tags: ['react', 'javascript', 'frontend']
    },
    {
      id: 4,
      name: 'Vật lý 11 - Cơ học',
      description: 'Nhóm học Vật lý 11 chuyên về phần Cơ học. Cùng nhau giải bài tập và hiểu sâu về các khái niệm vật lý.',
      subject: 'physics',
      level: 'Trung bình',
      members: 15,
      maxMembers: 20,
      creator: 'Phạm Thị D',
      avatar: 'https://i.pravatar.cc/40',
      createdAt: '2 tuần trước',
      nextSession: 'Chủ nhật, 15:00',
      tags: ['vật lý 11', 'cơ học', 'bài tập']
    }
  ];

  const filteredGroups = selectedSubject === 'all' 
    ? mockStudyGroups 
    : mockStudyGroups.filter(group => group.subject === selectedSubject);

  return (
    <div className="study-groups-list">
      {/* Subject Filter */}
      <div className="subject-filter">
        <div className="filter-tabs">
          {subjects.map(subject => (
            <button
              key={subject.id}
              className={`filter-tab ${selectedSubject === subject.id ? 'active' : ''}`}
              onClick={() => setSelectedSubject(subject.id)}
            >
              <span className="tab-icon">{subject.icon}</span>
              <span className="tab-label">{subject.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Study Groups Grid */}
      <div className="groups-grid">
        {filteredGroups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-header">
              <div className="group-info">
                <h3 className="group-name">{group.name}</h3>
                <div className="group-meta">
                  <span className="subject-badge">
                    {subjects.find(sub => sub.id === group.subject)?.icon}
                    {subjects.find(sub => sub.id === group.subject)?.label}
                  </span>
                  <span className="level-badge level-{group.level.toLowerCase().replace(' ', '-')}">
                    {group.level}
                  </span>
                </div>
              </div>
              <div className="group-avatar">
                <img src={group.avatar} alt={group.creator} />
              </div>
            </div>

            <div className="group-description">
              <p>{group.description}</p>
            </div>

            <div className="group-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-value">{group.members}/{group.maxMembers}</span>
                <span className="stat-label">thành viên</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <span className="stat-value">{group.nextSession}</span>
                <span className="stat-label">buổi tiếp theo</span>
              </div>
            </div>

            <div className="group-tags">
              {group.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>

            <div className="group-footer">
              <div className="creator-info">
                <span className="creator-label">Tạo bởi:</span>
                <span className="creator-name">{group.creator}</span>
                <span className="created-time">{group.createdAt}</span>
              </div>
              <div className="group-actions">
                <button className="btn-join">
                  Tham gia
                </button>
                <button className="btn-view">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Group CTA */}
      <div className="create-group-cta">
        <div className="cta-content">
          <h3>Không tìm thấy nhóm phù hợp?</h3>
          <p>Tạo nhóm học tập của riêng bạn và kết nối với những người có cùng mục tiêu học tập!</p>
          <button className="btn-create-group">
            Tạo nhóm học tập
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupList;
