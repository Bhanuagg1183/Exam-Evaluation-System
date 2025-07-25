import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  BarChart3, 
  Upload, 
  FileText, 
  LogOut, 
  User,
  GraduationCap,
  Settings
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const teacherTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Upload Sheets', icon: Upload },
    { id: 'evaluate', label: 'Evaluate', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'results', label: 'My Results', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const tabs = user?.role === 'teacher' ? teacherTabs : studentTabs;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EXAM-EVALUATOR</h1>
              <p className="text-xs text-gray-500">Intelligent Evaluation System</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;