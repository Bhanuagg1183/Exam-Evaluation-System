import React, { useState } from 'react';
import { mockAnswerSheets } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
  Download, 
  Eye, 
  FileText, 
  Calendar,
  Award,
  MessageSquare,
  Search
} from 'lucide-react';
import { AnswerSheet } from '../../types';

const StudentResults: React.FC = () => {
  const { user } = useAuth();
  const [selectedSheet, setSelectedSheet] = useState<AnswerSheet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const studentSheets = mockAnswerSheets.filter(sheet => sheet.studentId === user?.id);
  const filteredSheets = studentSheets.filter(sheet =>
    sheet.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheet.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage >= 50) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };

  if (selectedSheet) {
    const gradeInfo = getGradeInfo(selectedSheet.percentage || 0);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <button
            onClick={() => setSelectedSheet(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            ← Back to Results
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedSheet.examName}</h2>
              <p className="text-gray-600">{selectedSheet.subject}</p>
              <p className="text-sm text-gray-500 mt-1">
                Evaluated on {selectedSheet.evaluationDate && new Date(selectedSheet.evaluationDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {selectedSheet.obtainedMarks}/{selectedSheet.totalMarks}
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${gradeInfo.bg} ${gradeInfo.color}`}>
                Grade: {gradeInfo.grade} ({selectedSheet.percentage}%)
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Your Score</p>
                <p className="text-2xl font-bold text-gray-900">{selectedSheet.percentage}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Questions</p>
                <p className="text-2xl font-bold text-gray-900">{selectedSheet.questions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Exam Date</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(selectedSheet.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Question-wise Results */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Question-wise Performance</h3>
          <div className="space-y-4">
            {selectedSheet.questions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Question {question.number}</h4>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {question.obtainedMarks || 0}/{question.maxMarks}
                    </span>
                    <div className="text-sm text-gray-500">
                      {Math.round(((question.obtainedMarks || 0) / question.maxMarks) * 100)}%
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        ((question.obtainedMarks || 0) / question.maxMarks) >= 0.8 ? 'bg-green-500' :
                        ((question.obtainedMarks || 0) / question.maxMarks) >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${((question.obtainedMarks || 0) / question.maxMarks) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Feedback */}
                {question.feedback && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Teacher's Feedback</p>
                        <p className="text-sm text-blue-700 mt-1">{question.feedback}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Download Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Options</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Download Marksheet</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4" />
              <span>View Answer Sheet</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Exam Results</h2>
        <p className="text-gray-600">View your exam results, scores, and feedback from teachers.</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by exam name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Exam Results</h3>
        </div>
        <div className="p-6">
          {filteredSheets.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'No results found for your search.' : 'No exam results available yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSheets.map((sheet) => {
                const gradeInfo = sheet.percentage ? getGradeInfo(sheet.percentage) : null;
                
                return (
                  <div
                    key={sheet.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => sheet.status === 'completed' && setSelectedSheet(sheet)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{sheet.examName}</h4>
                          <p className="text-sm text-gray-500">
                            {sheet.subject} • Uploaded: {new Date(sheet.uploadDate).toLocaleDateString()}
                          </p>
                          {sheet.evaluationDate && (
                            <p className="text-xs text-gray-400">
                              Evaluated: {new Date(sheet.evaluationDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {sheet.status === 'completed' && gradeInfo ? (
                          <div>
                            <div className="text-lg font-bold text-gray-900 mb-1">
                              {sheet.obtainedMarks}/{sheet.totalMarks}
                            </div>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${gradeInfo.bg} ${gradeInfo.color}`}>
                              {gradeInfo.grade} ({sheet.percentage}%)
                            </div>
                          </div>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            sheet.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {sheet.status === 'in-progress' ? 'Under Review' : 'Pending Evaluation'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentResults;