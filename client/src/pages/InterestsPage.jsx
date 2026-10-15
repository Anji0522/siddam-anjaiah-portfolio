import React, { useEffect, useState } from 'react';
import Interests from '../components/Interests/Interests';
import { api } from '../services/api';

const InterestsPage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getProfile().then((res) => {
      if (res.success) setProfile(res.data);
    });
  }, []);

  return (
    <div className="interests-page">
      <Interests interests={profile?.interests || []} />
    </div>
  );
};

export default InterestsPage;
