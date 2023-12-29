import React, { useState } from 'react';
import AssistantAppointmentList from './AssistantAppointmentList'; // Importez le composant de liste des rendez-vous
import AssistantConsultationsList from './AssistantConsultationList'; // Importez le composant de liste des consultations
import FacturesList from './FactureList'; // Importez le composant de liste des factures
import '../styles/AssistantDashboard.css';
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';

const AssistantDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Rendez-vous');
  const renderSelectedTab = () => {
    switch (selectedTab) {
      case 'Rendez-vous':
        return <AssistantAppointmentList />;
      case 'Consultations':
        return <AssistantConsultationsList />;
      case 'Factures':
        return <FacturesList />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <nav className="navbar">
        <div
          className={`nav-item ${selectedTab === 'Rendez-vous' ? 'selected' : ''}`}
          onClick={() => setSelectedTab('Rendez-vous')}
        >
          Rendez-vous
        </div>
        <div
          className={`nav-item ${selectedTab === 'Consultations' ? 'selected' : ''}`}
          onClick={() => setSelectedTab('Consultations')}
        >
          Consultations
        </div>
        <div
          className={`nav-item ${selectedTab === 'Factures' ? 'selected' : ''}`}
          onClick={() => setSelectedTab('Factures')}
        >
          Factures
        </div>
      </nav>
      <hr />
      {renderSelectedTab()}
      <Footer />
    </div>
  );
};

export default AssistantDashboard;
