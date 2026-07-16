import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', email: '', password: '',
      errors: { name: '', email: '', password: '' },
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(name, value) {
    switch (name) {
      case 'name':
        return value.length < 5 ? 'Name must have at least 5 characters.' : '';
      case 'email':
        return (!value.includes('@') || !value.includes('.'))
          ? 'Email must contain @ and .' : '';
      case 'password':
        return value.length < 8 ? 'Password must have at least 8 characters.' : '';
      default:
        return '';
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    const error = this.validate(name, value);
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: error }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = this.state;
    const nameErr  = this.validate('name',     name);
    const emailErr = this.validate('email',    email);
    const passErr  = this.validate('password', password);

    if (nameErr || emailErr || passErr) {
      this.setState({ errors: { name: nameErr, email: emailErr, password: passErr } });
      return;
    }
    this.setState({ submitted: true });
  }

  render() {
    const { name, email, password, errors, submitted } = this.state;

    if (submitted) {
      return (
        <div style={styles.page}>
          <div style={{ ...styles.card, textAlign: 'center' }}>
            <div style={{ fontSize: '60px' }}>✅</div>
            <h2 style={{ color: '#2e7d32' }}>Registration Successful!</h2>
            <p>Welcome, <strong>{name}</strong>!</p>
            <button style={styles.submitBtn} onClick={() => this.setState({ submitted: false, name: '', email: '', password: '' })}>
              Register Another
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>📧 Mail Registration</h1>
          <p style={styles.subtitle}>Create your account</p>

          <form onSubmit={this.handleSubmit} noValidate>
            {/* Name Field */}
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                name="name" type="text" value={name}
                onChange={this.handleChange}
                placeholder="Enter your full name (min 5 chars)"
                style={{ ...styles.input, borderColor: errors.name ? '#f44336' : '#ddd' }}
              />
              {errors.name && <p style={styles.errorText}>⚠ {errors.name}</p>}
            </div>

            {/* Email Field */}
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                name="email" type="email" value={email}
                onChange={this.handleChange}
                placeholder="Enter your email (must have @ and .)"
                style={{ ...styles.input, borderColor: errors.email ? '#f44336' : '#ddd' }}
              />
              {errors.email && <p style={styles.errorText}>⚠ {errors.email}</p>}
            </div>

            {/* Password Field */}
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                name="password" type="password" value={password}
                onChange={this.handleChange}
                placeholder="Enter password (min 8 chars)"
                style={{ ...styles.input, borderColor: errors.password ? '#f44336' : '#ddd' }}
              />
              {errors.password && <p style={styles.errorText}>⚠ {errors.password}</p>}
            </div>

            <button type="submit" style={styles.submitBtn}>Register →</button>
          </form>
        </div>
      </div>
    );
  }
}

const styles = {
  page:      { fontFamily: 'Segoe UI, sans-serif', background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card:      { background: '#fff', borderRadius: '14px', padding: '40px', width: '100%', maxWidth: '440px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
  title:     { color: '#1a237e', margin: '0 0 6px 0', textAlign: 'center' },
  subtitle:  { color: '#7f8c8d', textAlign: 'center', marginBottom: '28px', fontSize: '14px' },
  field:     { marginBottom: '18px' },
  label:     { display: 'block', color: '#444', fontSize: '13px', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.4px' },
  input:     { width: '100%', border: '1.5px solid', borderRadius: '7px', padding: '10px 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' },
  errorText: { color: '#f44336', fontSize: '12px', margin: '4px 0 0 0' },
  submitBtn: { width: '100%', background: '#1a237e', color: '#fff', border: 'none', padding: '13px', borderRadius: '7px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }
};

function App() {
  return <Register />;
}

export default App;
