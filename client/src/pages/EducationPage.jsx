import React, { useEffect, useState } from 'react';
import Education from '../components/Education/Education';
import { api } from '../services/api';

const EducationPage = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getEducation().then((res) => {
      if (res.success) setEducation(res.data);
    });
  }, []);

  return (
    <div className="education-page">
      <Education education={education} />
    </div>
  );
};

export default EducationPage;
