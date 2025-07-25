import React, { useState } from 'react';
import { mockAnalytics, mockExams } from '../../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award,
  Target,
  PieChart
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState('1');
  const analytics = mockAnalytics;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Analytics</h2>
            <p className="text-gray-600">Detailed performance analysis and insights</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {mockExams.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalStudents}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.averageScore}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Highest Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.highestScore}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pass Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.passRate}%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <PieChart className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Score Distribution</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart Simulation */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">Student Count by Score Range</h4>
            <div className="space-y-3">
              {analytics.scoreDistribution.map((range, index) => (
                <div key={range.range} className="flex items-center space-x-3">
                  <div className="w-16 text-sm text-gray-600">{range.range}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-6">
                        <div
                          className={`h-6 rounded-full ${
                            index === 0 ? 'bg-green-500' :
                            index === 1 ? 'bg-blue-500' :
                            index === 2 ? 'bg-yellow-500' :
                            index === 3 ? 'bg-orange-500' :
                            index === 4 ? 'bg-red-400' : 'bg-red-600'
                          }`}
                          style={{ width: `${(range.count / analytics.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm font-medium text-gray-900 w-8">
                        {range.count}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 w-12">
                    {range.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Statistics */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-4">Performance Summary</h4>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Excellent (90-100%)</span>
                </div>
                <p className="text-green-700 mt-1">
                  {analytics.scoreDistribution[0].count} students ({analytics.scoreDistribution[0].percentage}%)
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Good (80-89%)</span>
                </div>
                <p className="text-blue-700 mt-1">
                  {analytics.scoreDistribution[1].count} students ({analytics.scoreDistribution[1].percentage}%)
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Average (70-79%)</span>
                </div>
                <p className="text-yellow-700 mt-1">
                  {analytics.scoreDistribution[2].count} students ({analytics.scoreDistribution[2].percentage}%)
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-900">Needs Improvement (&lt;70%)</span>
                </div>
                <p className="text-red-700 mt-1">
                  {analytics.scoreDistribution.slice(3).reduce((sum, range) => sum + range.count, 0)} students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Question-wise Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Question</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Max Marks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Avg Marks</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Success Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {analytics.questionAnalysis.map((question) => {
                const successRate = Math.round((question.averageMarks / question.maxMarks) * 100);
                return (
                  <tr key={question.questionNumber} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Question {question.questionNumber}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {question.maxMarks}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {question.averageMarks}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-20">
                          <div
                            className={`h-2 rounded-full ${
                              successRate >= 80 ? 'bg-green-500' :
                              successRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${successRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {successRate}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;