const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sanjana@123',
  database: 'oldage_home'
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL Connected');
  }
});


// GET ALL RESIDENTS
app.get('/residents', (req, res) => {
  db.query('SELECT * FROM residents', (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(result);
    }
  });
});


// INSERT
app.post('/residents', (req, res) => {

  const {
    name,
    date_of_birth,
    gender,
    admission_date,
    room_id,
    primary_contact_id
  } = req.body;

  db.query(
    `INSERT INTO residents 
    (name, date_of_birth, gender, admission_date, room_id, primary_contact_id)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name,
      date_of_birth,
      gender,
      admission_date,
      room_id,
      primary_contact_id
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send('Inserted Successfully');
      }
    }
  );
});


// UPDATE
app.put('/residents/:id', (req, res) => {

  const {
    name,
    date_of_birth,
    gender,
    admission_date,
    room_id,
    primary_contact_id
  } = req.body;

  db.query(
    `UPDATE residents 
     SET name=?, date_of_birth=?, gender=?, admission_date=?, room_id=?, primary_contact_id=? 
     WHERE resident_id=?`,
    [
      name,
      date_of_birth,
      gender,
      admission_date,
      room_id,
      primary_contact_id,
      req.params.id
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send('Updated Successfully');
      }
    }
  );
});


// DELETE
app.delete('/residents/:id', (req, res) => {

  db.query(
    'DELETE FROM residents WHERE resident_id=?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send('Deleted Successfully');
      }
    }
  );
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});