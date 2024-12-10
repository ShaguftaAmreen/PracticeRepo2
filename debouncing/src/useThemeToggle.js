import { useState, useEffect } from 'react';

const useThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleTheme];
};

export default useThemeToggle;