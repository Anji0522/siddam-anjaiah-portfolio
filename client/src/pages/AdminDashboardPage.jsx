import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  FaUserShield,
  FaSignOutAlt,
  FaEnvelope,
  FaFolder,
  FaTools,
  FaCertificate,
  FaUser,
  FaTrash,
  FaCheck,
  FaPlus,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboardPage = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages');

  // State for entities
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Modal / Form state for Add/Edit
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    subtitle: '',
    description: '',
    longDescription: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: 'Frontend',
    featured: false
  });

  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend' });
  const [newCert, setNewCert] = useState({
    title: '',
    organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
    description: '',
    date: '2026',
    certificateUrl: ''
  });

  const showStatus = (text, type = 'success') => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [msgRes, projRes, skillRes, certRes, profRes] = await Promise.all([
        api.getContactMessages(),
        api.getProjects(),
        api.getSkills(),
        api.getCertifications(),
        api.getProfile()
      ]);

      if (msgRes.success) setMessages(msgRes.data || []);
      if (projRes.success) setProjects(projRes.data || []);
      if (skillRes.success) setSkills(skillRes.data || []);
      if (certRes.success) setCertifications(certRes.data || []);
      if (profRes.success) setProfile(profRes.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Messages Actions
  const handleToggleRead = async (id, currentRead) => {
    const res = await api.markMessageRead(id, !currentRead);
    if (res.success) {
      setMessages(messages.map((m) => (m._id === id ? { ...m, read: !currentRead } : m)));
      showStatus('Message status updated.');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    const res = await api.deleteContactMessage(id);
    if (res.success) {
      setMessages(messages.filter((m) => m._id !== id));
      showStatus('Message deleted.');
    }
  };

  // Projects Actions
  const handleCreateProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...newProject,
      technologies: typeof newProject.technologies === 'string'
        ? newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : newProject.technologies
    };
    const res = await api.createProject(payload);
    if (res.success) {
      showStatus('Project created successfully!');
      setNewProject({
        title: '',
        subtitle: '',
        description: '',
        longDescription: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        category: 'Frontend',
        featured: false
      });
      loadAllData();
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    const res = await api.deleteProject(id);
    if (res.success) {
      setProjects(projects.filter((p) => p._id !== id && p.slug !== id));
      showStatus('Project deleted.');
    }
  };

  // Skills Actions
  const handleCreateSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    const res = await api.createSkill(newSkill);
    if (res.success) {
      showStatus('Skill added successfully!');
      setNewSkill({ name: '', category: 'Frontend' });
      loadAllData();
    }
  };

  const handleDeleteSkill = async (id) => {
    const res = await api.deleteSkill(id);
    if (res.success) {
      setSkills(skills.filter((s) => s._id !== id));
      showStatus('Skill removed.');
    }
  };

  // Certifications Actions
  const handleCreateCert = async (e) => {
    e.preventDefault();
    if (!newCert.title.trim()) return;
    const res = await api.createCertification(newCert);
    if (res.success) {
      showStatus('Certification added successfully!');
      setNewCert({
        title: '',
        organization: 'NxtWave Disruptive Technologies (CCBP 4.0 Academy)',
        description: '',
        date: '2026',
        certificateUrl: ''
      });
      loadAllData();
    }
  };

  const handleDeleteCert = async (id) => {
    const res = await api.deleteCertification(id);
    if (res.success) {
      setCertifications(certifications.filter((c) => c._id !== id));
      showStatus('Certification removed.');
    }
  };

  // Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const res = await api.updateProfile(profile);
    if (res.success) {
      showStatus('Profile settings saved successfully!');
    }
  };

  return (
    <div className="admin-dashboard-page section-padding">
      <div className="container">
        {/* Dashboard Top Header */}
        <div className="dashboard-header card">
          <div className="header-user-info">
            <div className="admin-avatar">
              <FaUserShield size={24} />
            </div>
            <div>
              <h1 className="admin-title">Admin Management Portal</h1>
              <span className="admin-email-badge">Logged in as {admin?.email || 'Administrator'}</span>
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary btn-sm logout-btn">
            <FaSignOutAlt size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {statusMsg.text && (
          <div className={`form-alert-box alert-${statusMsg.type === 'error' ? 'error' : 'success'}`}>
            <FaCheck size={14} />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="dashboard-nav-tabs">
          <button
            className={`dash-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <FaEnvelope size={15} />
            <span>Messages ({messages.filter((m) => !m.read).length} new)</span>
          </button>

          <button
            className={`dash-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FaFolder size={15} />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            className={`dash-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <FaTools size={15} />
            <span>Skills ({skills.length})</span>
          </button>

          <button
            className={`dash-tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            <FaCertificate size={15} />
            <span>Certifications ({certifications.length})</span>
          </button>

          <button
            className={`dash-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser size={15} />
            <span>Profile Data</span>
          </button>
        </div>

        {/* TAB 1: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="dashboard-tab-content">
            <h2 className="tab-section-title">Received Contact Messages</h2>
            {messages.length === 0 ? (
              <div className="card empty-panel">
                <p>No messages received yet.</p>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg) => (
                  <div key={msg._id} className={`message-item-card card ${msg.read ? 'read' : 'unread'}`}>
                    <div className="msg-header">
                      <div>
                        <h4 className="msg-from">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="msg-email">{msg.email}</a>
                      </div>
                      <div className="msg-meta">
                        <span className="msg-date">
                          {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                        {!msg.read && <span className="unread-dot">New</span>}
                      </div>
                    </div>

                    <div className="msg-subject">
                      <strong>Subject:</strong> {msg.subject}
                    </div>

                    <p className="msg-body">{msg.message}</p>

                    <div className="msg-actions">
                      <button
                        onClick={() => handleToggleRead(msg._id, msg.read)}
                        className="btn btn-sm btn-secondary"
                      >
                        <FaCheck size={12} />
                        <span>{msg.read ? 'Mark as Unread' : 'Mark as Read'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="btn btn-sm btn-outline delete-btn"
                      >
                        <FaTrash size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="dashboard-tab-content">
            <div className="dash-split-layout">
              {/* Add Project Form */}
              <div className="dash-form-box card">
                <h3 className="box-title">Add New Project</h3>
                <form onSubmit={handleCreateProject} className="dash-form">
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subtitle</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newProject.subtitle}
                      onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-textarea"
                      rows="2"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Long Description</label>
                    <textarea
                      className="form-textarea"
                      rows="4"
                      value={newProject.longDescription}
                      onChange={(e) => setNewProject({ ...newProject, longDescription: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="React, Node.js, Express, MongoDB"
                      value={newProject.technologies}
                      onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Live Demo URL</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://..."
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">GitHub URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="filter-select"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    >
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <FaPlus size={13} />
                    <span>Create Project</span>
                  </button>
                </form>
              </div>

              {/* Projects List */}
              <div className="dash-list-box">
                <h3 className="box-title">Existing Projects ({projects.length})</h3>
                <div className="dash-items-grid">
                  {projects.map((proj) => (
                    <div key={proj._id || proj.slug} className="dash-item-card card">
                      <div className="item-top">
                        <h4 className="item-title">{proj.title}</h4>
                        <span className="category-tag">{proj.category}</span>
                      </div>
                      <p className="item-sub">{proj.subtitle}</p>
                      <div className="item-actions">
                        <button
                          onClick={() => handleDeleteProject(proj._id || proj.slug)}
                          className="btn btn-sm btn-outline delete-btn"
                        >
                          <FaTrash size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS MANAGER */}
        {activeTab === 'skills' && (
          <div className="dashboard-tab-content">
            <div className="dash-split-layout">
              {/* Add Skill Form */}
              <div className="dash-form-box card">
                <h3 className="box-title">Add New Skill</h3>
                <form onSubmit={handleCreateSkill} className="dash-form">
                  <div className="form-group">
                    <label className="form-label">Skill Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Next.js, Redux, Docker"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="filter-select"
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    >
                      <option value="Languages">Languages</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Libraries">Libraries</option>
                      <option value="Backend">Backend</option>
                      <option value="Databases">Databases</option>
                      <option value="Testing & Tools">Testing & Tools</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <FaPlus size={13} />
                    <span>Add Skill</span>
                  </button>
                </form>
              </div>

              {/* Skills List */}
              <div className="dash-list-box">
                <h3 className="box-title">Configured Skills ({skills.length})</h3>
                <div className="tags-cloud card" style={{ padding: '1.5rem' }}>
                  {skills.map((skill) => (
                    <div key={skill._id || skill.name} className="admin-chip">
                      <span>{skill.name}</span>
                      <small>({skill.category})</small>
                      <button
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="chip-del-btn"
                        title="Remove skill"
                      >
                        <FaTimes size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATIONS MANAGER */}
        {activeTab === 'certifications' && (
          <div className="dashboard-tab-content">
            <div className="dash-split-layout">
              <div className="dash-form-box card">
                <h3 className="box-title">Add Certification</h3>
                <form onSubmit={handleCreateCert} className="dash-form">
                  <div className="form-group">
                    <label className="form-label">Certification Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newCert.title}
                      onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Organization</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newCert.organization}
                      onChange={(e) => setNewCert({ ...newCert, organization: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Year / Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newCert.date}
                      onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Certificate URL (or leave blank if null)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://certificates.ccbp.in/..."
                      value={newCert.certificateUrl}
                      onChange={(e) => setNewCert({ ...newCert, certificateUrl: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    <FaPlus size={13} />
                    <span>Add Certification</span>
                  </button>
                </form>
              </div>

              <div className="dash-list-box">
                <h3 className="box-title">Existing Certifications ({certifications.length})</h3>
                <div className="dash-items-grid">
                  {certifications.map((cert) => (
                    <div key={cert._id || cert.title} className="dash-item-card card">
                      <h4 className="item-title">{cert.title}</h4>
                      <p className="item-sub">{cert.organization} ({cert.date})</p>
                      <button
                        onClick={() => handleDeleteCert(cert._id)}
                        className="btn btn-sm btn-outline delete-btn"
                      >
                        <FaTrash size={12} />
                        <span>Delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE EDIT */}
        {activeTab === 'profile' && profile && (
          <div className="dashboard-tab-content">
            <div className="dash-form-box card" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h3 className="box-title">Edit Portfolio Profile</h3>
              <form onSubmit={handleSaveProfile} className="dash-form">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.title || ''}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subtitle</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.subtitle || ''}
                    onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Summary</label>
                  <textarea
                    className="form-textarea"
                    rows="4"
                    value={profile.summary || ''}
                    onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Career Objective</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    value={profile.objective || ''}
                    onChange={(e) => setProfile({ ...profile, objective: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={profile.email || ''}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GitHub URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={profile.github || ''}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">LinkedIn URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={profile.linkedin || ''}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg submit-btn">
                  <FaSave size={15} />
                  <span>Save Profile Updates</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
