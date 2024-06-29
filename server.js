const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'dg-db.c78s2i2qy0ha.us-east-1.rds.amazonaws.com',
    user: 'admin', 
    password: 'vikram123',
    database: 'hackathon' 
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Unable to connect to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

app.post('/hackathonRegistration', (req, res) => {
    const {
        college_name,
        project_name,
        team_name,
        leader_name,
        email,
        mobile_no,
        mem1,
        mem2,
        mem3,
        mem4
    } = req.body;

    const sql = `INSERT INTO hackathon_1_0(college_name, project_name, team_name, leader_name, email, mobile_no, mem1, mem2, mem3, mem4)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
        college_name,
        project_name,
        team_name,
        leader_name,
        email,
        mobile_no,
        mem1,
        mem2,
        mem3,
        mem4
    ];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error saving form data:', err);
            res.status(500).json({ error: 'Failed to save form data' });
        } else {
            console.log('Form data saved successfully');
            res.json({ message: 'Form data saved successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running`);
});

