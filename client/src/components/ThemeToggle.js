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

  useEffect(() => {
    const darkMode = localStorage.getItem('dark') === 'enabled';
    setDarkMode(darkMode);
  }, []);

  const handleToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

//   return (
//     <div style={{ position: 'fixed', top: '10px', right: '10px' }}>
//       <label>
//         <input
//           type="checkbox"
//           checked={darkMode}
//           onChange={handleToggle}
//         />
//         {darkMode ? 'Dark Mode' : 'Light Mode'}
//       </label>
//     </div>
//   );

return (
    <div className="theme_toggle">
      <input
        type="checkbox"
        className="checkbox_swype"
        id="night_theme_toggle"
        checked={darkMode}
        onChange={handleToggle}
        aria-hidden="true"
      />
      <label htmlFor="night_theme_toggle" className="label_toggle">
        <i className="sun"></i>
        <i className="moon"></i>
        <i className="ball"></i>
      </label>
    </div>
  );

};

export default ThemeToggle;
