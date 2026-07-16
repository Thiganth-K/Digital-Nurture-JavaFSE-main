import React, { Component } from 'react';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: null
    };
  }

  loadPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ posts: data.slice(0, 10), loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  componentDidMount() {
    this.loadPosts();
  }

  componentDidCatch(error, info) {
    alert('An error occurred in the component: ' + error.message);
  }

  render() {
    const { posts, loading, error } = this.state;

    if (loading) {
      return (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading posts from API...</p>
        </div>
      );
    }

    if (error) {
      return <div style={styles.error}>⚠️ Error: {error}</div>;
    }

    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>📰 Blog Posts</h1>
        <p style={styles.subtitle}>Fetched from: https://jsonplaceholder.typicode.com/posts</p>
        {posts.map(post => (
          <div key={post.id} style={styles.card}>
            <h3 style={styles.postTitle}>#{post.id} — {post.title}</h3>
            <p style={styles.postBody}>{post.body}</p>
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  heading: { color: '#2c3e50', borderBottom: '3px solid #3498db', paddingBottom: '10px' },
  subtitle: { color: '#7f8c8d', fontSize: '13px', marginTop: '-10px' },
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '16px 20px',
    margin: '12px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    borderLeft: '4px solid #3498db'
  },
  postTitle: { color: '#2980b9', margin: '0 0 8px 0', fontSize: '16px', textTransform: 'capitalize' },
  postBody: { color: '#555', margin: 0, lineHeight: '1.6', fontSize: '14px' },
  loading: { textAlign: 'center', padding: '60px', color: '#7f8c8d', fontFamily: 'Segoe UI' },
  spinner: {
    width: '40px', height: '40px',
    border: '4px solid #ecf0f1',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    margin: '0 auto 16px'
  },
  error: {
    background: '#fdedec', color: '#c0392b',
    padding: '20px', borderRadius: '8px',
    fontFamily: 'Segoe UI', margin: '20px'
  }
};

export default Posts;
