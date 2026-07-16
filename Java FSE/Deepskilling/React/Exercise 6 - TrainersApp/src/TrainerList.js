import React from 'react';
import { Link } from 'react-router-dom';

function TrainersList({ trainers }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👩‍🏫 Trainers Directory</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>T-ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Stream</th>
            <th style={styles.th}>Skills</th>
            <th style={styles.th}>Details</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((t, idx) => (
            <tr key={t.TrainerId} style={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              <td style={styles.td}>{t.TrainerId}</td>
              <td style={styles.td}><strong>{t.Name}</strong></td>
              <td style={styles.td}>{t.Phone}</td>
              <td style={styles.td}>{t.Email}</td>
              <td style={styles.td}>{t.Technology}</td>
              <td style={styles.td}>{t.Skills.join(', ')}</td>
              <td style={styles.td}>
                <Link to={`/trainer/${t.TrainerId}`} style={styles.link}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  heading: { color: '#2c3e50', marginBottom: '16px' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  headerRow: { background: '#2c3e50', color: 'white' },
  th: { padding: '12px 14px', textAlign: 'left', fontWeight: '600', fontSize: '13px' },
  td: { padding: '10px 14px', fontSize: '14px', color: '#34495e' },
  rowEven: { background: '#f9f9f9' },
  rowOdd:  { background: '#ffffff' },
  link: { color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }
};

export default TrainersList;
