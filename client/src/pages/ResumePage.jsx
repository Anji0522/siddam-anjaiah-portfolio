import React, { useEffect, useState } from 'react';
import ResumeViewer from '../components/Resume/ResumeViewer';
import { api } from '../services/api';
import { FaFileAlt } from 'react-icons/fa';

const ResumePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getProfile().then((res) => {
      if (res.success) setProfile(res.data);
    });
  }, []);

  return (
    <div className="resume-page section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <FaFileAlt size={13} />
            <span>Curriculum Vitae</span>
          </span>
          <h1 className="section-title">Official Developer Resume</h1>
          <p className="section-subtitle">
            Preview, inspect, or download my verified 1-page React and Full-Stack Developer resume.
          </p>
        </div>

        <ResumeViewer resumeUrl={profile?.resumeUrl} />
      </div>
    </div>
  );
};

export default ResumePage;
