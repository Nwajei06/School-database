import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SubadminResultForm() {
  const [results, setResults] = useState([{ name: '', subject: '', score: '', grade: '' }]);
  const [message, setMessage] = useState('');

  const calculateGrade = (score) => {
    if (score >= 75) return 'A';
    if (score >= 60) return 'B';
    if (score >= 60) return 'C';
    if (score >= 45) return 'D';
    if (score >= 40) return 'E';
    return 'F';
  };

  const handleChange = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = value;

    // Auto-calculate grade based on score if score is modified
    if (field === 'score') {
      const scoreVal = parseInt(value, 10);
      if (!isNaN(scoreVal)) {
        updated[index].grade = calculateGrade(scoreVal);
      } else {
        updated[index].grade = '';
      }
    }

    setResults(updated);
  };

  const handleAddRow = () => {
    setResults([...results, { name: '', subject: '', score: '', grade: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(results)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Results submitted successfully!');
        setResults([{ name: '', subject: '', score: '', grade: '' }]);
      } else {
        alert(data.message || 'Error submitting results.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    }
  };


  return (
    <div className="container mt-5">
      <h3 className="text-center text-primary mb-4">Sub-Admin Result Entry</h3>
      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered table-striped">
          <thead className="table-primary text-center">
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.subject}
                    onChange={(e) => handleChange(index, 'subject', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="100"
                    value={row.score}
                    onChange={(e) => handleChange(index, 'score', e.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.grade}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleAddRow}>
            Add Row
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Results
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubadminResultForm;
