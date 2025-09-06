import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextDefinition';
import { cn } from '../common/utils';
import { useTheme } from '../hooks/useTheme';

const Login = () => {
  const { login } = useContext(AuthContext);
  const { currentTheme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) navigate('/');
    else setError(result.message);
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setError('');
    navigate('/');
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        currentTheme === 'dark'
          ? 'bg-gray-900'
          : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      } px-4`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl border ${
          currentTheme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-100'
        }`}
      >
        <div className="text-center mb-8">
          <div
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              currentTheme === 'dark'
                ? 'bg-gray-700'
                : 'bg-gradient-to-r from-primary-500 to-primary-600'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1
            className={`text-3xl font-bold ${
              currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            Welcome Back
          </h1>
          <p
            className={`text-sm mt-2 ${
              currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Sign in to access your admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className={cn(
                `peer w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-800 placeholder-transparent'
                }`
              )}
            />
            <label
              className={`absolute left-4 -top-2.5 px-1 text-xs font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs ${
                currentTheme === 'dark'
                  ? 'bg-gray-700 text-primary-400 peer-placeholder-shown:text-gray-400 peer-focus:text-primary-400'
                  : 'bg-white text-primary-500 peer-placeholder-shown:text-gray-400 peer-focus:text-primary-500'
              }`}
            >
              Username
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className={cn(
                `peer w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-800 placeholder-transparent'
                }`
              )}
            />
            <label
              className={`absolute left-4 -top-2.5 px-1 text-xs font-medium transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs ${
                currentTheme === 'dark'
                  ? 'bg-gray-700 text-primary-400 peer-placeholder-shown:text-gray-400 peer-focus:text-primary-400'
                  : 'bg-white text-primary-500 peer-placeholder-shown:text-gray-400 peer-focus:text-primary-500'
              }`}
            >
              Password
            </label>
          </div>

          {/* Error message */}
          {error && (
            <div
              className={`rounded-lg p-3 flex items-start ${
                currentTheme === 'dark' ? 'bg-red-900/30' : 'bg-red-50'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-400 mt-0.5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p
                className={`text-sm ${
                  currentTheme === 'dark' ? 'text-red-300' : 'text-red-700'
                }`}
              >
                {error}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className={`w-1/3 py-3 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-2/3 flex justify-center items-center py-3 rounded-lg font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              )}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>

        <div
          className={`mt-8 pt-5 ${
            currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <p
            className={`text-center text-xs ${
              currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            &copy; 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
