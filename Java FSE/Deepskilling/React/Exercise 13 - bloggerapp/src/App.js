import React, { Component } from 'react';

// ── Book Details Component ──────────────────────────────
function BookDetails({ show }) {
  if (!show) return null; // Way 1: return null to prevent rendering
  const books = [
    { id: 1, title: 'Clean Code',          author: 'Robert C. Martin', genre: 'Programming' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Dave Thomas', genre: 'Programming' },
    { id: 3, title: 'Design Patterns',     author: 'Gang of Four',     genre: 'Architecture' },
  ];
  return (
    <section style={styles.card}>
      <h2 style={styles.cardTitle}>📚 Book Details</h2>
      <ul style={styles.list}>
        {books.map(b => (
          <li key={b.id} style={styles.item}>
            <strong>{b.title}</strong> by {b.author}
            <span style={styles.tag}>{b.genre}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Blog Details Component ──────────────────────────────
function BlogDetails({ show }) {
  // Way 2: Ternary operator
  return show ? (
    <section style={styles.card}>
      <h2 style={styles.cardTitle}>📝 Blog Details</h2>
      {['React Hooks Explained', 'Why TypeScript?', 'REST vs GraphQL'].map((title, i) => (
        <div key={i} style={styles.blogPost}>
          <h4 style={{ margin: '0 0 4px 0', color: '#2c3e50' }}>{title}</h4>
          <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px' }}>Published on July 2024 · 5 min read</p>
        </div>
      ))}
    </section>
  ) : null;
}

// ── Course Details Component ────────────────────────────
function CourseDetails({ show }) {
  const courses = [
    { id: 'C1', name: 'React Fundamentals',  duration: '30 hrs', level: 'Beginner' },
    { id: 'C2', name: 'Advanced JavaScript', duration: '45 hrs', level: 'Advanced' },
    { id: 'C3', name: 'Spring Boot Mastery', duration: '60 hrs', level: 'Intermediate' },
  ];
  // Way 3: Short-circuit &&
  return show && (
    <section style={styles.card}>
      <h2 style={styles.cardTitle}>🎓 Course Details</h2>
      <table style={styles.table}>
        <thead><tr style={styles.thead}><th style={styles.th}>Course</th><th style={styles.th}>Duration</th><th style={styles.th}>Level</th></tr></thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td style={styles.td}>{c.name}</td>
              <td style={styles.td}>{c.duration}</td>
              <td style={styles.td}>{c.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showBooks: true, showBlogs: true, showCourses: true };
  }

  toggle(key) { this.setState(s => ({ [key]: !s[key] })); }

  render() {
    const { showBooks, showBlogs, showCourses } = this.state;
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>📖 Blogger App — Conditional Rendering</h1>
        <div style={styles.controls}>
          <button style={styles.toggleBtn} onClick={() => this.toggle('showBooks')}>
            {showBooks ? 'Hide' : 'Show'} Books
          </button>
          <button style={styles.toggleBtn} onClick={() => this.toggle('showBlogs')}>
            {showBlogs ? 'Hide' : 'Show'} Blogs
          </button>
          <button style={styles.toggleBtn} onClick={() => this.toggle('showCourses')}>
            {showCourses ? 'Hide' : 'Show'} Courses
          </button>
        </div>
        <BookDetails   show={showBooks}   />
        <BlogDetails   show={showBlogs}   />
        <CourseDetails show={showCourses} />
      </div>
    );
  }
}

const styles = {
  page:      { fontFamily: 'Segoe UI, sans-serif', maxWidth: '750px', margin: '0 auto', padding: '24px', background: '#f8f9fa', minHeight: '100vh' },
  title:     { color: '#1a237e', textAlign: 'center' },
  controls:  { display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' },
  toggleBtn: { background: '#3498db', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  card:      { background: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' },
  cardTitle: { color: '#2c3e50', margin: '0 0 14px 0', borderBottom: '2px solid #eee', paddingBottom: '8px' },
  list:      { listStyle: 'none', padding: 0, margin: 0 },
  item:      { padding: '10px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tag:       { background: '#e3f2fd', color: '#1565c0', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' },
  blogPost:  { padding: '12px 0', borderBottom: '1px solid #f0f0f0' },
  table:     { width: '100%', borderCollapse: 'collapse' },
  thead:     { background: '#1a237e', color: 'white' },
  th:        { padding: '10px 14px', textAlign: 'left', fontSize: '13px' },
  td:        { padding: '9px 14px', fontSize: '14px', color: '#34495e', borderBottom: '1px solid #f0f0f0' }
};

export default App;
