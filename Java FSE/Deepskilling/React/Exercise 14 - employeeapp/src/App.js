import React, { createContext, useContext, useState } from 'react';

// ── Create Theme Context ────────────────────────────────
const ThemeContext = createContext('light');

// ── Employee Card Component (Consumer) ─────────────────
function EmployeeCard({ employee }) {
  const theme = useContext(ThemeContext); // consume context

  const cardStyle = {
    background: theme === 'dark' ? '#2d2d2d' : '#fff',
    color:       theme === 'dark' ? '#fff'   : '#2c3e50',
    border:      theme === 'dark' ? '1px solid #555' : '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px 20px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
  };

  const btnStyle = {
    background: theme === 'dark' ? '#bb86fc' : '#1565c0',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '13px'
  };

  return (
    <div style={cardStyle}>
      <div>
        <strong style={{ fontSize: '15px' }}>{employee.name}</strong>
        <p style={{ margin: '3px 0 0 0', fontSize: '13px', opacity: 0.7 }}>
          {employee.role} — {employee.dept}
        </p>
      </div>
      <button style={btnStyle}>View Profile</button>
    </div>
  );
}

// ── Employee List Component ─────────────────────────────
function EmployeeList({ employees }) {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginTop: 0 }}>👥 Employee List</h2>
      {employees.map(emp => <EmployeeCard key={emp.id} employee={emp} />)}
    </div>
  );
}

// ── App Component (Provider) ────────────────────────────
function App() {
  const [theme, setTheme] = useState('light');

  const employees = [
    { id: 1, name: 'Alice Johnson', role: 'Senior Developer', dept: 'Engineering' },
    { id: 2, name: 'Bob Kumar',     role: 'UI Designer',      dept: 'Design'      },
    { id: 3, name: 'Carol Singh',   role: 'QA Engineer',      dept: 'Quality'     },
    { id: 4, name: 'David Rao',     role: 'DevOps Engineer',  dept: 'Ops'         },
    { id: 5, name: 'Eva Nair',      role: 'Data Analyst',     dept: 'Analytics'   },
  ];

  const appStyle = {
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
    background: theme === 'dark' ? '#121212' : '#f5f5f5',
    color:      theme === 'dark' ? '#ffffff' : '#000000',
    transition: 'all 0.3s ease'
  };

  const headerStyle = {
    background: theme === 'dark' ? '#1f1f1f' : '#1565c0',
    color: '#fff',
    padding: '16px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const toggleBtn = {
    background: theme === 'dark' ? '#bb86fc' : '#fff',
    color:      theme === 'dark' ? '#121212' : '#1565c0',
    border: 'none', padding: '8px 18px', borderRadius: '20px',
    cursor: 'pointer', fontWeight: '600', fontSize: '14px'
  };

  return (
    // ThemeContext.Provider wraps the whole tree
    <ThemeContext.Provider value={theme}>
      <div style={appStyle}>
        <header style={headerStyle}>
          <h1 style={{ margin: 0, fontSize: '20px' }}>🏢 Employee Management System</h1>
          <button style={toggleBtn} onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </header>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ padding: '16px 20px 0', opacity: 0.6, fontSize: '14px' }}>
            Active Theme (from Context): <strong>{theme}</strong>
          </p>
          <EmployeeList employees={employees} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
