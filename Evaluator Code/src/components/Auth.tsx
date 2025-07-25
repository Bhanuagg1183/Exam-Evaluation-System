import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  BookOpen,
  Users
} from 'lucide-react';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleDemoLogin = (role: 'teacher' | 'student') => {
    if (role === 'teacher') {
      setEmail('teacher@school.edu');
      setPassword('teacher123');
    } else {
      setEmail('student@school.edu');
      setPassword('student123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EXAM-EVALUATOR</h1>
          <p className="text-gray-600">Intelligent Exam Evaluation System</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">Try demo accounts:</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin('teacher')}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Teacher</span>
              </button>
              <button
                onClick={() => handleDemoLogin('student')}
                className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Student</span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Key Features:</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Digital answer sheet evaluation</li>
              <li>• Automated result generation</li>
              <li>• Comprehensive analytics dashboard</li>
              <li>• Question-wise performance tracking</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2025 EXAM-EVALUATOR. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;