import React, { useState } from 'react';
import { mockAnswerSheets } from '../../data/mockData';
import { 
  Search, 
  Filter, 
  Edit3, 
  Save, 
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { AnswerSheet, Question } from '../../types';

const EvaluationInterface: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSheet, setSelectedSheet] = useState<AnswerSheet | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const filteredSheets = mockAnswerSheets.filter(sheet => {
    const matchesSearch = sheet.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sheet.examName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sheet.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuestionMarksUpdate = (questionId: string, marks: number) => {
    if (selectedSheet) {
      const updatedQuestions = selectedSheet.questions.map(q =>
        q.id === questionId ? { ...q, obtainedMarks: marks } : q
      );
      const totalObtained = updatedQuestions.reduce((sum, q) => sum + (q.obtainedMarks || 0), 0);
      
      setSelectedSheet({
        ...selectedSheet,
        questions: updatedQuestions,
        obtainedMarks: totalObtained,
        percentage: Math.round((totalObtained / selectedSheet.totalMarks) * 100)
      });
    }
  };

  const handleFeedbackUpdate = (questionId: string, feedback: string) => {
    if (selectedSheet) {
      const updatedQuestions = selectedSheet.questions.map(q =>
        q.id === questionId ? { ...q, feedback } : q
      );
      
      setSelectedSheet({
        ...selectedSheet,
        questions: updatedQuestions
      });
    }
  };

  if (selectedSheet) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => setSelectedSheet(null)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-2"
              >
                ← Back to List
              </button>
              <h2 className="text-2xl font-bold text-gray-900">{selectedSheet.studentName}</h2>
              <p className="text-gray-600">{selectedSheet.examName} • {selectedSheet.subject}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">
                {selectedSheet.obtainedMarks || 0}/{selectedSheet.totalMarks}
              </div>
              <p className="text-sm text-gray-500">
                {selectedSheet.percentage || 0}%
              </p>
            </div>
          </div>
        </div>

        {/* PDF Viewer Simulation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Answer Sheet</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                <Edit3 className="h-4 w-4 inline mr-1" />
                Annotate
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                <Eye className="h-4 w-4 inline mr-1" />
                Zoom
              </button>
            </div>
          </div>
          
          {/* Simulated PDF Viewer */}
          <div className="bg-gray-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg font-medium">PDF Answer Sheet</p>
              <p className="text-sm">Interactive annotation tools would be available here</p>
            </div>
          </div>
        </div>

        {/* Question-wise Marking */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question-wise Marking</h3>
          <div className="space-y-4">
            {selectedSheet.questions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">
                    Question {question.number}
                  </h4>
                  <span className="text-sm text-gray-500">
                    Max: {question.maxMarks} marks
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Marks Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Obtained Marks
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={question.maxMarks}
                      value={question.obtainedMarks || ''}
                      onChange={(e) => handleQuestionMarksUpdate(question.id, parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter marks..."
                    />
                  </div>
                  
                  {/* Feedback Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Feedback
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={question.feedback || ''}
                        onChange={(e) => handleFeedbackUpdate(question.id, e.target.value)}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add feedback..."
                      />
                      <MessageSquare className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Save Button */}
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Save className="h-4 w-4" />
              <span>Complete Evaluation</span>
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Evaluate Answer Sheets</h2>
        <p className="text-gray-600">
          Select answer sheets to evaluate and provide marks with feedback.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by student name or exam..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Answer Sheets List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Answer Sheets</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredSheets.map((sheet) => (
              <div
                key={sheet.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedSheet(sheet)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{sheet.studentName}</h4>
                      <p className="text-sm text-gray-500">
                        {sheet.examName} • {sheet.subject}
                      </p>
                      <p className="text-xs text-gray-400">
                        Uploaded: {new Date(sheet.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(sheet.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sheet.status)}`}>
                        {sheet.status.replace('-', ' ')}
                      </span>
                    </div>
                    {sheet.status === 'completed' && (
                      <div className="text-sm">
                        <span className="font-medium">{sheet.obtainedMarks}/{sheet.totalMarks}</span>
                        <span className="text-gray-500 ml-1">({sheet.percentage}%)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationInterface;