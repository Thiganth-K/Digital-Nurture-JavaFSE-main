import React from 'react';
import styles from './CohortDetails.module.css';

function CohortDetails({ cohort }) {
  const statusStyle = {
    color: cohort.status === 'Ongoing' ? '#27ae60' : '#2980b9',
    fontWeight: 'bold'
  };

  return (
    <div className={styles.box}>
      <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '16px' }}>
        {cohort.name}
      </h3>
      <dl>
        <dt>Cohort ID</dt>
        <dd>{cohort.id}</dd>
        <dt>Trainer</dt>
        <dd>{cohort.trainer}</dd>
        <dt>Start Date</dt>
        <dd>{cohort.startDate}</dd>
        <dt>End Date</dt>
        <dd>{cohort.endDate}</dd>
        <dt>Status</dt>
        <dd style={statusStyle}>{cohort.status}</dd>
        <dt>Participants</dt>
        <dd>{cohort.participants}</dd>
      </dl>
    </div>
  );
}

export default CohortDetails;
