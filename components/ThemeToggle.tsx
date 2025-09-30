import React from 'react';

const ThemeToggle: React.FC = () => {
  const [dark, setDark] = React.useState<boolean>(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const root = document.documentElement;
    root.classList.toggle('dark', next);
    // Persist preference
    try { localStorage.setItem('flavorgraph:dark', next ? '1' : '0'); } catch {}
  };

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('flavorgraph:dark');
      if (saved === '1') {
        document.documentElement.classList.add('dark');
        setDark(true);
      }
    } catch {}
  }, []);

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-gray-300 dark:border-gray-700 shadow-sm hover:shadow transition text-sm"
      title="Toggle theme"
    >
      <span className="hidden sm:inline">{dark ? 'Dark' : 'Light'} mode</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
        <path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1m0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m9-7a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1M5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1m12.66 6.66a1 1 0 0 1-1.41 0l-.71-.7a1 1 0 0 1 1.41-1.42l.71.71a1 1 0 0 1 0 1.41M8.46 7.05a1 1 0 0 1-1.41 0l-.7-.71a1 1 0 0 1 1.41-1.41l.71.7a1 1 0 0 1 0 1.41m9.19-2.12a1 1 0 1 1 1.41 1.41l-.7.71a1 1 0 1 1-1.42-1.41zM7.05 15.54a1 1 0 0 1 0 1.41l-.7.71a1 1 0 1 1-1.42-1.42l.71-.7a1 1 0 0 1 1.41 0Z"/>
      </svg>
    </button>
  );
};

export default ThemeToggle;