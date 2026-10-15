import React, { useEffect, useState } from 'react';
import About from '../components/About/About';
import { api } from '../services/api';

const AboutPage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getProfile().then((res) => {
      if (res.success) setProfile(res.data);
    });
  }, []);

  return (
    <div className="about-page">
      <About profile={profile} />
    </div>
  );
};

export default AboutPage;
