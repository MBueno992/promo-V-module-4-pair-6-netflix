const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root.123456',
    database: 'netflix',
  });
  connection.connect();
  return connection;
}

server.get('/movies', async (req, res) => {
  const conex = await getConnection();
  const sql = 'SELECT * FROM movies';
  const [results] = await conex.query(sql);

  conex.end();
  res.json({ success: true, movies: results });
});

const staticServ = './src/public-react';
server.use(express.static(staticServ));

const staticServImg = './src/public-movies-image';
server.use(express.static(staticServImg));
