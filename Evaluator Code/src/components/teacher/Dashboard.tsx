import React from 'react';
import { mockExams } from '../../data/mockData';
import { 
  BookOpen, 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Calendar
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const totalStudents = mockExams.reduce((acc, exam) => acc + exam.totalStudents, 0);
  const totalEvaluated = mockExams.reduce((acc, exam) => acc + exam.evaluated, 0);
  const totalPending = mockExams.reduce((acc, exam) => acc + exam.pending, 0);

  const stats = [
    {
      name: 'Total Exams',
      value: mockExams.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      name: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-green-500',
      change: '+5 new enrollments'
    },
    {
      name: 'Evaluated',
      value: totalEvaluated,
      icon: CheckCircle,
      color: 'bg-purple-500',
      change: `${Math.round((totalEvaluated / (totalEvaluated + totalPending)) * 100)}% completion`
    },
    {
      name: 'Pending',
      value: totalPending,
      icon: Clock,
      color: 'bg-orange-500',
      change: 'Needs attention'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Wilson!</h2>
            <p className="text-blue-100">
              You have {totalPending} answer sheets pending evaluation.
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-blue-100">
            <Calendar className="h-5 w-5" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
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
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Exams */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Exams</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{exam.name}</h4>
                    <p className="text-sm text-gray-500">
                      {exam.subject} • {new Date(exam.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {exam.evaluated}/{exam.totalStudents}
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(exam.evaluated / exam.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {exam.pending > 0 ? `${exam.pending} pending` : 'Complete'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-700">Start Evaluation</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-700">View Analytics</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-700">Manage Students</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;