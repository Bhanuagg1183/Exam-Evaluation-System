import { AnswerSheet, Exam, Analytics } from '../types';

export const mockExams: Exam[] = [
  {
    id: '1',
    name: 'Mathematics Final Exam',
    subject: 'Mathematics',
    date: '2025-01-15',
    totalMarks: 100,
    duration: 180,
    totalStudents: 32,
    evaluated: 28,
    pending: 4
  },
  {
    id: '2',
    name: 'Physics Midterm',
    subject: 'Physics',
    date: '2025-01-12',
    totalMarks: 80,
    duration: 120,
    totalStudents: 28,
    evaluated: 25,
    pending: 3
  },
  {
    id: '3',
    name: 'Chemistry Quiz',
    subject: 'Chemistry',
    date: '2025-01-10',
    totalMarks: 50,
    duration: 60,
    totalStudents: 30,
    evaluated: 30,
    pending: 0
  }
];

export const mockAnswerSheets: AnswerSheet[] = [
  {
    id: '1',
    studentId: '2',
    studentName: 'John Smith',
    examName: 'Mathematics Final Exam',
    subject: 'Mathematics',
    uploadDate: '2025-01-15T10:30:00Z',
    evaluationDate: '2025-01-16T14:20:00Z',
    status: 'completed',
    totalMarks: 100,
    obtainedMarks: 87,
    percentage: 87,
    evaluatorId: '1',
    pdfUrl: 'https://example.com/answer-sheet.pdf',
    questions: [
      { id: '1', number: 1, maxMarks: 10, obtainedMarks: 9, feedback: 'Good approach, minor calculation error' },
      { id: '2', number: 2, maxMarks: 15, obtainedMarks: 13, feedback: 'Excellent solution method' },
      { id: '3', number: 3, maxMarks: 20, obtainedMarks: 18, feedback: 'Well explained, clear steps' },
      { id: '4', number: 4, maxMarks: 25, obtainedMarks: 22, feedback: 'Creative solution approach' },
      { id: '5', number: 5, maxMarks: 30, obtainedMarks: 25, feedback: 'Good understanding, needs more detail' }
    ]
  },
  {
    id: '2',
    studentId: '3',
    studentName: 'Emma Johnson',
    examName: 'Mathematics Final Exam',
    subject: 'Mathematics',
    uploadDate: '2025-01-15T10:35:00Z',
    status: 'pending',
    totalMarks: 100,
    questions: [
      { id: '1', number: 1, maxMarks: 10 },
      { id: '2', number: 2, maxMarks: 15 },
      { id: '3', number: 3, maxMarks: 20 },
      { id: '4', number: 4, maxMarks: 25 },
      { id: '5', number: 5, maxMarks: 30 }
    ]
  },
  {
    id: '3',
    studentId: '4',
    studentName: 'Michael Brown',
    examName: 'Physics Midterm',
    subject: 'Physics',
    uploadDate: '2025-01-12T11:15:00Z',
    status: 'in-progress',
    totalMarks: 80,
    questions: [
      { id: '1', number: 1, maxMarks: 15, obtainedMarks: 12 },
      { id: '2', number: 2, maxMarks: 20, obtainedMarks: 18 },
      { id: '3', number: 3, maxMarks: 25 },
      { id: '4', number: 4, maxMarks: 20 }
    ]
  }
];

export const mockAnalytics: Analytics = {
  examId: '1',
  examName: 'Mathematics Final Exam',
  totalStudents: 32,
  averageScore: 78.5,
  highestScore: 96,
  lowestScore: 45,
  passRate: 87.5,
  questionAnalysis: [
    { questionNumber: 1, maxMarks: 10, averageMarks: 8.2, difficulty: 'easy' },
    { questionNumber: 2, maxMarks: 15, averageMarks: 11.5, difficulty: 'medium' },
    { questionNumber: 3, maxMarks: 20, averageMarks: 14.8, difficulty: 'medium' },
    { questionNumber: 4, maxMarks: 25, averageMarks: 17.2, difficulty: 'hard' },
    { questionNumber: 5, maxMarks: 30, averageMarks: 20.1, difficulty: 'hard' }
  ],
  scoreDistribution: [
    { range: '90-100', count: 5, percentage: 15.6 },
    { range: '80-89', count: 12, percentage: 37.5 },
    { range: '70-79', count: 8, percentage: 25.0 },
    { range: '60-69', count: 4, percentage: 12.5 },
    { range: '50-59', count: 2, percentage: 6.3 },
    { range: '0-49', count: 1, percentage: 3.1 }
  ]
};