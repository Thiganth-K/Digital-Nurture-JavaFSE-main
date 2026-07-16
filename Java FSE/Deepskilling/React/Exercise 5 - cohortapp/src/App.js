import React from 'react';
import CohortDetails from './CohortDetails';

const cohorts = [
  { id: 'C001', name: 'React Fundamentals', trainer: 'Alice Thomas', startDate: '2024-01-15', endDate: '2024-03-15', status: 'Completed', participants: 25 },
  { id: 'C002', name: 'Java Full Stack',    trainer: 'Bob Kumar',    startDate: '2024-03-01', endDate: '2024-06-01', status: 'Ongoing',   participants: 30 },
  { id: 'C003', name: 'Spring Boot Basics', trainer: 'Carol Singh',  startDate: '2024-04-10', endDate: '2024-06-10', status: 'Ongoing',   participants: 20 },
  { id: 'C004', name: 'Angular Mastery',    trainer: 'David Rao',    startDate: '2023-09-01', endDate: '2023-11-30', status: 'Completed', participants: 18 },
  { id: 'C005', name: 'Microservices',      trainer: 'Eva Nair',     startDate: '2024-05-01', endDate: '2024-07-31', status: 'Ongoing',   participants: 22 },
];

function App() {
  const ongoing   = cohorts.filter(c => c.status === 'Ongoing');
  const completed = cohorts.filter(c => c.status === 'Completed');

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📚 My Academy — Cohort Dashboard</h1>

      <section>
        <h2 style={{ ...styles.sectionHead, color: '#27ae60' }}>🟢 Ongoing Cohorts</h2>
        <div style={styles.grid}>
          {ongoing.map(c => <CohortDetails key={c.id} cohort={c} />)}
        </div>
      </section>

      <section>
        <h2 style={{ ...styles.sectionHead, color: '#2980b9' }}>✅ Completed Cohorts</h2>
        <div style={styles.grid}>
          {completed.map(c => <CohortDetails key={c.id} cohort={c} />)}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: { fontFamily: 'Segoe UI, sans-serif', background: '#f4f6f9', minHeight: '100vh', padding: '30px' },
  title: { color: '#2c3e50', textAlign: 'center', marginBottom: '30px' },
  sectionHead: { borderBottom: '2px solid #eee', paddingBottom: '8px', marginBottom: '16px' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '16px' }
};

export default App;
