// login

const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  const queryParams = `?genre=${params.genre}&sort=${params.sort}`;

  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`http://localhost:4000/movies${queryParams}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
