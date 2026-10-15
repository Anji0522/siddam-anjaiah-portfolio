import React, { useEffect, useState } from 'react';
import Certifications from '../components/Certifications/Certifications';
import { api } from '../services/api';

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getCertifications().then((res) => {
      if (res.success) setCertifications(res.data);
    });
  }, []);

  return (
    <div className="certifications-page">
      <Certifications certifications={certifications} />
    </div>
  );
};

export default CertificationsPage;
