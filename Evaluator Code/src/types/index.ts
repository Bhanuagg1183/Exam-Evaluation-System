export interface User {
  id: string;
  name: string;
  email: string;
  role: 'teacher' | 'student';
  avatar?: string;
}

export interface Question {
  id: string;
  number: number;
  maxMarks: number;
  obtainedMarks?: number;
  feedback?: string;
}

export interface AnswerSheet {
  id: string;
  studentId: string;
  studentName: string;
  examName: string;
  subject: string;
  uploadDate: string;
  evaluationDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
  totalMarks: number;
  obtainedMarks?: number;
  percentage?: number;
  questions: Question[];
  evaluatorId?: string;
  pdfUrl?: string;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  totalMarks: number;
  duration: number;
  totalStudents: number;
  evaluated: number;
  pending: number;
}

export interface Analytics {
  examId: string;
  examName: string;
  totalStudents: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
  questionAnalysis: QuestionAnalysis[];
  scoreDistribution: ScoreRange[];
}

export interface QuestionAnalysis {
  questionNumber: number;
  maxMarks: number;
  averageMarks: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ScoreRange {
  range: string;
  count: number;
  percentage: number;
}

export interface Annotation {
  id: string;
  type: 'highlight' | 'underline' | 'comment' | 'checkmark' | 'cross';
  x: number;
  y: number;
  width?: number;
  height?: number;
  color: string;
  text?: string;
}