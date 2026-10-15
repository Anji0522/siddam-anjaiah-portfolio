import React, { useEffect, useState } from 'react';
import Skills from '../components/Skills/Skills';
import { api } from '../services/api';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getSkills().then((res) => {
      if (res.success) setSkills(res.data);
    });
  }, []);

  return (
    <div className="skills-page">
      <Skills skills={skills} />
    </div>
  );
};

export default SkillsPage;
