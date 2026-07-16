import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <div style={styles.card}>
        <h2 style={styles.heading}>📞 Contact</h2>
        <p style={styles.message}>Welcome to the Contact page of the Student Management Portal</p>
      </div>
    );
  }
}

const styles = {
  card: {
    background: '#fef9e7',
    borderLeft: '4px solid #f39c12',
    borderRadius: '6px',
    padding: '16px 20px',
    margin: '16px 0'
  },
  heading: { color: '#d35400', margin: '0 0 8px 0' },
  message: { color: '#34495e', margin: 0, fontSize: '16px' }
};

export default Contact;
