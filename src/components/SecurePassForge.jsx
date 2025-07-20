import { useState, useEffect } from "react";
import {
  Shield,
  Copy,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  CheckCircle,
  AlertTriangle,
  Lock,
  Zap,
} from "lucide-react";
import Footer from "./Footer";

const SecurePassForge = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [showPassword, setShowPassword] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [warning, setWarning] = useState("");
  const [strength, setStrength] = useState({ score: 0, text: "", color: "" });
  const [isGenerating, setIsGenerating] = useState(false);

  const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  // Password strength calculator
  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pass)) score += 1;

    const strengthLevels = [
      { score: 0, text: "Very Weak", color: "text-red-500" },
      { score: 1, text: "Weak", color: "text-red-400" },
      { score: 2, text: "Fair", color: "text-orange-500" },
      { score: 3, text: "Good", color: "text-yellow-500" },
      { score: 4, text: "Strong", color: "text-blue-500" },
      { score: 5, text: "Very Strong", color: "text-green-500" },
      { score: 6, text: "Excellent", color: "text-green-600" },
    ];

    return strengthLevels[Math.min(score, 6)];
  };

  const generatePassword = () => {
    const selectedOptions = Object.entries(options).filter(
      ([key, value]) => value
    );

    if (selectedOptions.length === 0) {
      setWarning("Please select at least one character type");
      setTimeout(() => setWarning(""), 4000);
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      let availableChars = "";
      selectedOptions.forEach(([key]) => {
        availableChars += characterSets[key];
      });

      let newPassword = "";

      // Ensure at least one character from each selected type
      selectedOptions.forEach(([key]) => {
        const chars = characterSets[key];
        newPassword += chars[Math.floor(Math.random() * chars.length)];
      });

      // Fill the rest randomly
      for (let i = newPassword.length; i < length; i++) {
        newPassword +=
          availableChars[Math.floor(Math.random() * availableChars.length)];
      }

      // Shuffle the password
      newPassword = newPassword
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

      setPassword(newPassword);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = async () => {
    if (!password) {
      setWarning("Generate a password first");
      setTimeout(() => setWarning(""), 3000);
      return;
    }

    try {
      await navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setWarning("Failed to copy password");
      setTimeout(() => setWarning(""), 3000);
    }
  };

  const handleOptionChange = (option) => {
    const newOptions = { ...options, [option]: !options[option] };
    setOptions(newOptions);
  };

  useEffect(() => {
    if (password) {
      setStrength(calculateStrength(password));
    }
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SecurePass Forge
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Generate ultra-secure passwords with military-grade randomization
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex items-start justify-center">
          <div className="w-full max-w-2xl">
            {/* Password Display Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 animate-slide-up">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-indigo-600" />
                    Generated Password
                  </h2>
                  {password && (
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${strength.color} bg-opacity-10 border border-current`}
                    >
                      {strength.text}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={isGenerating ? "Generating..." : password}
                    readOnly
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-lg font-mono focus:outline-none focus:border-indigo-500 dark:text-white transition-all duration-300"
                    placeholder="Click generate to create password"
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-110"
                      disabled={!password}
                    >
                      {copySuccess ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Strength Meter */}
                {password && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Password Strength
                      </span>
                      <span className={`text-sm font-medium ${strength.color}`}>
                        {strength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          strength.score <= 2
                            ? "bg-red-500"
                            : strength.score <= 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${(strength.score / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Length Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password Length
                  </span>
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-bold">
                    {length}
                  </span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Options */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Character Types
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      key: "uppercase",
                      label: "Uppercase (A-Z)",
                      example: "ABC",
                    },
                    {
                      key: "lowercase",
                      label: "Lowercase (a-z)",
                      example: "abc",
                    },
                    { key: "numbers", label: "Numbers (0-9)", example: "123" },
                    { key: "symbols", label: "Symbols (!@#)", example: "!@#" },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 cursor-pointer transition-all duration-200 hover:shadow-md"
                    >
                      <input
                        type="checkbox"
                        checked={options[option.key]}
                        onChange={() => handleOptionChange(option.key)}
                        className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-white block">
                          {option.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {option.example}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePassword}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Forging Password...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Secure Password
                  </>
                )}
              </button>
            </div>

            {/* Notifications */}
            {(copySuccess || warning) && (
              <div
                className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg animate-slide-down ${
                  copySuccess
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {copySuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Password copied to clipboard!
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      {warning}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SecurePassForge;
