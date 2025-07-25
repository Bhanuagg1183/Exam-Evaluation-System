import React from 'react';
import { mockAnswerSheets } from '../../data/mockData';
import { 
  FileText, 
  TrendingUp, 
  Award, 
  Clock,
  Download,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const studentSheets = mockAnswerSheets.filter(sheet => sheet.studentId === user?.id);
  const completedExams = studentSheets.filter(sheet => sheet.status === 'completed');
  const averageScore = completedExams.length > 0 
    ? Math.round(completedExams.reduce((sum, sheet) => sum + (sheet.percentage || 0), 0) / completedExams.length)
    : 0;

  const stats = [
    {
      name: 'Total Exams',
      value: studentSheets.length,
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      name: 'Completed',
      value: completedExams.length,
      icon: Award,
      color: 'bg-green-500'
    },
    {
      name: 'Average Score',
      value: `${averageScore}%`,
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      name: 'Pending',
      value: studentSheets.filter(sheet => sheet.status === 'pending').length,
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-blue-100">
            Track your exam results and performance analytics here.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Exam Results</h3>
        </div>
        <div className="p-6">
          {studentSheets.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No exam results available yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {studentSheets.map((sheet) => (
                <div key={sheet.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{sheet.examName}</h4>
                        <p className="text-sm text-gray-500">
                          {sheet.subject} • {new Date(sheet.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {sheet.status === 'completed' ? (
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {sheet.obtainedMarks}/{sheet.totalMarks}
                          </div>
                          <div className={`text-sm font-medium ${
                            (sheet.percentage || 0) >= 80 ? 'text-green-600' :
                            (sheet.percentage || 0) >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {sheet.percentage}%
                          </div>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sheet.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {sheet.status === 'in-progress' ? 'Under Review' : 'Pending Evaluation'}
                        </span>
                      )}
                      
                      {sheet.status === 'completed' && (
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Performance Chart */}
      {completedExams.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Trend</h3>
          <div className="space-y-4">
            {completedExams.map((sheet, index) => (
              <div key={sheet.id} className="flex items-center space-x-4">
                <div className="w-24 text-sm text-gray-600 truncate">
                  {sheet.examName.split(' ')[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full ${
                          (sheet.percentage || 0) >= 80 ? 'bg-green-500' :
                          (sheet.percentage || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${sheet.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 w-12">
                      {sheet.percentage}%
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {sheet.obtainedMarks}/{sheet.totalMarks}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;