import React, { useEffect } from 'react';
import ContactSection from '../components/Contact/ContactSection';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <ContactSection />
    </div>
  );
};

export default ContactPage;
