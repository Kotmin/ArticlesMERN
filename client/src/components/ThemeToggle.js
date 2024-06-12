import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('dark') === 'enabled');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('dark', 'enabled');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('dark', 'disabled');
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
      <label>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={handleToggle}
        />
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </label>
    </div>
  );
};

export default ThemeToggle;
