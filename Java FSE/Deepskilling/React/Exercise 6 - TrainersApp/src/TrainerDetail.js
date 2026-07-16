import React from 'react';
import { useParams, Link } from 'react-router-dom';

function TrainerDetail({ trainers }) {
  const { id } = useParams();
  const trainer = trainers.find(t => t.TrainerId === id);

  if (!trainer) {
    return <div style={{ padding: '30px', color: '#e74c3c' }}>Trainer not found.</div>;
  }

  return (
    <div style={styles.card}>
      <Link to="/" style={styles.back}>← Back to Trainers List</Link>
      <h2 style={styles.name}>{trainer.Name}</h2>
      <div style={styles.grid}>
        <div><span style={styles.label}>Trainer ID</span><p style={styles.value}>{trainer.TrainerId}</p></div>
        <div><span style={styles.label}>Technology</span><p style={styles.value}>{trainer.Technology}</p></div>
        <div><span style={styles.label}>Email</span><p style={styles.value}>{trainer.Email}</p></div>
        <div><span style={styles.label}>Phone</span><p style={styles.value}>{trainer.Phone}</p></div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <span style={styles.label}>Skills</span>
        <div style={styles.skillsContainer}>
          {trainer.Skills.map(s => <span key={s} style={styles.skill}>{s}</span>)}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { background: '#fff', maxWidth: '600px', margin: '30px auto', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontFamily: 'Segoe UI, sans-serif' },
  back: { color: '#3498db', textDecoration: 'none', fontSize: '14px' },
  name: { color: '#2c3e50', marginTop: '16px', fontSize: '24px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' },
  label: { color: '#7f8c8d', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  value: { color: '#2c3e50', margin: '4px 0 0 0', fontWeight: '500' },
  skillsContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' },
  skill: { background: '#eaf4fb', color: '#2980b9', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: '500' }
};

export default TrainerDetail;
