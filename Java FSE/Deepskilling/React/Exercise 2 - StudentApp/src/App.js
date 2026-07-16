import React, { Component } from 'react';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Student Management Portal</h1>
        <hr />
        <Home />
        <About />
        <Contact />
      </div>
    );
  }
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center'
  }
};

export default App;
