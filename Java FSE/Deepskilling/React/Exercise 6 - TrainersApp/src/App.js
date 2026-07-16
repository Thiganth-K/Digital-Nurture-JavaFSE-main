import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import trainers from './TrainersMock';
import TrainersList from './TrainerList';
import TrainerDetail from './TrainerDetail';

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <nav style={styles.nav}>
          <span style={styles.brand}>🎓 Trainers App</span>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/trainers" style={styles.navLink}>Trainers</Link>
        </nav>
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<TrainersList trainers={trainers} />} />
            <Route path="/trainers" element={<TrainersList trainers={trainers} />} />
            <Route path="/trainer/:id" element={<TrainerDetail trainers={trainers} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  app: { fontFamily: 'Segoe UI, sans-serif', background: '#f4f6f9', minHeight: '100vh' },
  nav: { background: '#2c3e50', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '24px' },
  brand: { color: 'white', fontWeight: 'bold', fontSize: '18px', marginRight: 'auto' },
  navLink: { color: '#bdc3c7', textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
  main: { padding: '24px' }
};

export default App;
