import React, { useState, useEffect } from 'react';

function SubadminResultForm() {
  const [results, setResults] = useState([{ name: '', subject: '', score: '', grade: '', email: '' }]);
  const [students, setStudents] = useState([]); // to store all students for dropdown

  useEffect(() => {
    // fetch all students to populate dropdown
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  const calculateGrade = (score) => {
    if (score >= 75) return 'A';
    if (score >= 60) return 'B';
    if (score >= 45) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  };

  const handleChange = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = value;

    if (field === 'score') {
      const scoreVal = parseInt(value, 10);
      if (!isNaN(scoreVal)) {
        updated[index].grade = calculateGrade(scoreVal);
      } else {
        updated[index].grade = '';
      }
    }

    // If email changes, update name as well for convenience
    if (field === 'email') {
      const student = students.find(s => s.email === value);
      updated[index].name = student ? student.name : '';
    }

    setResults(updated);
  };

  const handleAddRow = () => {
    setResults([...results, { name: '', subject: '', score: '', grade: '', email: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Results submitted successfully!');
        setResults([{ name: '', subject: '', score: '', grade: '', email: '' }]);
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
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered table-striped">
          <thead className="table-primary text-center">
            <tr>
              <th>Student Email</th>
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
                  <select
                    className="form-select"
                    value={row.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                    required
                  >
                    <option value="">Select student email</option>
                    {students.map(s => (
                      <option key={s.email} value={s.email}>
                        {s.email}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.name}
                    readOnly
                    placeholder="Student name"
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
