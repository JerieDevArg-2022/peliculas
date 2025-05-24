let pagina = 1;

// Función para obtener datos de la API
const obtenerPeliculas = async (pagina) => {
  const respuesta = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`
  );
  return respuesta;
};

// Función para procesar la respuesta de la API
const procesarRespuesta = async (respuesta) => {
  if (respuesta.status === 200) {
    const datos = await respuesta.json();
    return datos.results;
  } else if (respuesta.status === 401) {
    throw new Error("Pusiste la llave mal");
  } else if (respuesta.status === 404) {
    throw new Error("La pelicula que buscas no existe");
  } else {
    throw new Error("Hubo un error y no sabemos que paso");
  }
};

// Función para generar el HTML de las películas
const generarHTMLPeliculas = (peliculas) => {
  return peliculas
    .map(
      (pelicula) => `
    <div class="pelicula">
      <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
      <h3 class="titulo">${pelicula.title}</h3>
    </div>
  `
    )
    .join("");
};

// Función principal para cargar películas
const cargarPeliculas = async () => {
  try {
    const respuesta = await obtenerPeliculas(pagina);
    const peliculas = await procesarRespuesta(respuesta);
    const peliculasHTML = generarHTMLPeliculas(peliculas);
    document.getElementById("contenedor").innerHTML = peliculasHTML;
  } catch (error) {
    console.error(error.message);
  }
};

// Invocar la función para cargar la primera página de películas
cargarPeliculas();

// Gestión de los botones para cambiar de página
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});
