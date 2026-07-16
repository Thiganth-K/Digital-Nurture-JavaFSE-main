import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div style={styles.card}>
        <h2 style={styles.heading}>🏠 Home</h2>
        <p style={styles.message}>Welcome to the Home page of Student Management Portal</p>
      </div>
    );
  }
}

const styles = {
  card: {
    background: '#e8f4fd',
    borderLeft: '4px solid #3498db',
    borderRadius: '6px',
    padding: '16px 20px',
    margin: '16px 0'
  },
  heading: { color: '#2980b9', margin: '0 0 8px 0' },
  message: { color: '#34495e', margin: 0, fontSize: '16px' }
};

export default Home;
