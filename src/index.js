const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

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
  const { genre, sort } = req.query;
  console.log(req.query);
  const conex = await getConnection(); //este siempre es igual.

  let listMovies = []; //variable global para guardar lo que devuelve la BD.
  if (genre === '') {
    const selectMovie = `SELECT * FROM movies order by title ${sort}`;
    const [resultMovies] = await conex.query(selectMovie);
    listMovies = resultMovies;
  } else {
    const selectMovie = `SELECT * FROM movies where genre = ? order by title ${sort}`;
    const [resultMovies] = await conex.query(selectMovie, [genre]);
    listMovies = resultMovies;
  }

  conex.end();
  //devuelvo respuesta siempre:
  res.json({
    success: true,
    movies: listMovies,
  });
  //para comprobar que funciona: postman o navegador (pegar el localhost:4000/movies en google o en postman).
});

server.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const conex = await getConnection();
  const selectUser = 'SELECT * FROM users WHERE email = ?';
  const [resultUser] = await conex.query(selectUser, [email]);
  console.log(resultUser);
  if (resultUser.length !== 0) {
    const isOkPass = await bcrypt.compare(password, resultUser[0].password);
    if (isOkPass) {
      const infoToken = {
        id: resultUser[0].id,
        email: resultUser[0].email,
      };
      const token = generateToken(infoToken);
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, msg: 'Contraseña incorrecta' });
    }
  } else {
    res.json({ success: false, msg: 'El correo no existe' });
  }
});

server.get('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const conex = await getConnection();
  const selectMovie = 'SELECT * FROM movies WHERE idMovies = ?';
  const [foundMovie] = await conex.query(selectMovie, [movieId]);
  console.log(foundMovie);
  res.render('movie', { movie: foundMovie[0] });
});

server.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;
  const conex = await getConnection();
  const selectUser = 'SELECT * FROM users WHERE email = ?';
  const [resultUser] = await conex.query(selectUser, [email]);
  if (resultUser.length === 0) {
    const passwordHashed = await bcrypt.hash(password, 10);
    const insertUser = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const [resultInsert] = await conex.query(insertUser, [
      email,
      passwordHashed,
    ]);
    res.json({ success: true, userId: resultInsert.insertId });
    console.log(resultInsert);
  } else {
    res.json({ message: 'El email ya está registrado' });
  }
});

const staticServ = './src/public-react';
server.use(express.static(staticServ));

const staticServImg = './src/public-movies-image';
server.use(express.static(staticServImg));

const statisStyle = './src/public-css';
server.use(express.static(statisStyle));
