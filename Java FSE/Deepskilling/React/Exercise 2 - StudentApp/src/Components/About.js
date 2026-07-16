import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div style={styles.card}>
        <h2 style={styles.heading}>ℹ️ About</h2>
        <p style={styles.message}>Welcome to the About page of the Student Management Portal</p>
      </div>
    );
  }
}

const styles = {
  card: {
    background: '#eafaf1',
    borderLeft: '4px solid #27ae60',
    borderRadius: '6px',
    padding: '16px 20px',
    margin: '16px 0'
  },
  heading: { color: '#1e8449', margin: '0 0 8px 0' },
  message: { color: '#34495e', margin: 0, fontSize: '16px' }
};

export default About;
