import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import Dashboard from './components/teacher/Dashboard';
import UploadSheets from './components/teacher/UploadSheets';
import EvaluationInterface from './components/teacher/EvaluationInterface';
import Analytics from './components/teacher/Analytics';
import StudentDashboard from './components/student/StudentDashboard';
import StudentResults from './components/student/StudentResults';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const renderContent = () => {
    if (user.role === 'teacher') {
      switch (activeTab) {
        case 'dashboard':
          return <Dashboard />;
        case 'upload':
          return <UploadSheets />;
        case 'evaluate':
          return <EvaluationInterface />;
        case 'analytics':
          return <Analytics />;
        default:
          return <Dashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'results':
          return <StudentResults />;
        case 'profile':
          return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
              <p className="text-gray-600">Profile management features coming soon...</p>
            </div>
          );
        default:
          return <StudentDashboard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;