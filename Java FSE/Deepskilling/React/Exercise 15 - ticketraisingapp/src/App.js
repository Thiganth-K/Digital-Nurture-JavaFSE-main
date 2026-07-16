import React, { Component } from 'react';

class ComplaintRegister extends Component {
  constructor(props) {
    super(props);
    this.state = { empName: '', complaint: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const refNum = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    alert(
      `✅ Complaint Registered Successfully!\n\n` +
      `Employee: ${this.state.empName}\n` +
      `Reference Number: ${refNum}\n\n` +
      `Please use this reference number for further follow-ups.`
    );
    this.setState({ empName: '', complaint: '' });
  }

  render() {
    const { empName, complaint } = this.state;
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>🎫 Complaint Registration</h1>
          <p style={styles.subtitle}>Raise a complaint and get it resolved</p>
          <form onSubmit={this.handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="empName">Employee Name</label>
              <input
                id="empName"
                name="empName"
                type="text"
                value={empName}
                onChange={this.handleChange}
                placeholder="Enter your name"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label} htmlFor="complaint">Complaint Description</label>
              <textarea
                id="complaint"
                name="complaint"
                value={complaint}
                onChange={this.handleChange}
                placeholder="Describe your complaint in detail..."
                style={styles.textarea}
                rows={5}
                required
              />
            </div>
            <button type="submit" style={styles.submitBtn}>
              📩 Submit Complaint
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  page:      { fontFamily: 'Segoe UI, sans-serif', background: '#f0f4f8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  card:      { background: '#fff', borderRadius: '12px', padding: '36px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  title:     { color: '#1a237e', margin: '0 0 6px 0', textAlign: 'center' },
  subtitle:  { color: '#7f8c8d', textAlign: 'center', marginBottom: '28px', fontSize: '14px' },
  form:      {},
  field:     { marginBottom: '20px' },
  label:     { display: 'block', color: '#555', fontSize: '14px', fontWeight: '600', marginBottom: '6px' },
  input:     { width: '100%', border: '1px solid #ddd', borderRadius: '7px', padding: '10px 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  textarea:  { width: '100%', border: '1px solid #ddd', borderRadius: '7px', padding: '10px 14px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box' },
  submitBtn: { width: '100%', background: '#1565c0', color: '#fff', border: 'none', padding: '12px', borderRadius: '7px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }
};

function App() {
  return <ComplaintRegister />;
}

export default App;
