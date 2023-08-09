import axios from 'axios';
import './style.css'
import { obtenerTodosLosPj } from './api/obtenerTodosLosPj';
import { obtenerPjPorPagina } from './api/obtenerPjPorPage';
import { obtenerPjPorNombre } from './api/obtenerPjPorNombre';
import { obtenerUbicaciones } from './api/obtenerUbicaciones';
import { obtenerPjPorUbicacion } from './api/obtenerPjPorUbicacion';
import { obtenerPjPorUrl } from './api/obtenerPjPorUrl';


document.querySelector('#app').innerHTML = `
  <div >
      <img src="./src/assets/img/imagen.webp" alt="imagen" class="img-fluid " >
      <img src="./src/assets/img/Logo.png" alt="Logo" style="min-width: 100vw;">
  </div>
  <div class="d-flex justify-content-center align-items-center  text-white" style="min-height: 10vh;">
    <h1>RICK AND MORTY!</h1>
  </div>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <form>
      <div class="input-group m-1" style="max-width: 400px;">
          <input type="text" class="form-control" placeholder="BUSCA UN PERSONAJE" aria-label="Buscar" aria-describedby="basic-addon2" id="inputValue">
          <div class="input-group-append">
              <button class="btn btn-primary" type="button" id="buscarPorId">Buscar por nombre</button>
          </div>
      </div>
    </form>
    <div class="input-group m-3 d-flex flex-wrap" style="max-width: 400px;">
      <select id="ubicaciones" class="form-select m-2">
        <option value="" selected>Selecciona una ubicación</option>
      </select>
      <button class="btn btn-primary m-2" type="button" id="obtenerUbicacionPersonajes">Buscar por ubicacion</button>
    </div>
    <div id="pagination" class="d-flex flex-wrap align-items-center"></div>
    <div id="resultado" class="d-flex flex-wrap"></div>
  </div>
  <footer class="bg-dark text-light py-3 text-center">
    <p class="m-0">Todos los derechos reservados <span>2023</span></p>
  </footer>
`
//SELECTOR DEL DIV CONTENEDOR RESULTADO
const resultado = document.querySelector('#resultado');

//SELECTOR PARA PAGINACION DE PERSONAJES
const paginationContainer = document.querySelector('#pagination');

//LIMPIA EL HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}

//OBTENER TODOS LOS PERSONAJES Y UNA PAGINACION INICIAL
window.addEventListener('load', async () => {
  let allCharactersData = await obtenerTodosLosPj();

  for (let page = 1; page <= allCharactersData.pages; page++) {
    const button = document.createElement('button');
    button.textContent = page;
    button.classList.add('btn', 'btn-primary', 'm-1', 'p-2');

    button.addEventListener('click', async () => {
      limpiarHTML();
      const resultadoTodosLosPersonajes = await obtenerPjPorPagina(page);
      const personajesHTML = resultadoTodosLosPersonajes.map(personaje => `
        <div class="card m-2 shadow" style="width: 20rem;">
          <div class="card-body">
            <h2>${personaje.name}</h2>
            <h5 class="card-title">Género: ${personaje.gender}</h5>
            <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid">
            <p>Especie: ${personaje.species}</p>
            <p>status: ${personaje.status}</p>
          </div>
        </div>
      `);
      resultado.innerHTML = personajesHTML;
    });
    paginationContainer.appendChild(button);
  }
});

//OBTENER PERSONAJE POR NOMBRE
const btnBusquedaByName = document.querySelector('#buscarPorId');
btnBusquedaByName.addEventListener('click', async () => {

  limpiarHTML();

  const valorInput = document.querySelector('#inputValue').value;
  const personajes = await obtenerPjPorNombre(valorInput);

  const personajesHTML = personajes.map(personaje => `
    <div class="card m-2 shadow" style="width: 20rem;">
      <div class="card-body">
        <h2>${personaje.name}</h2>
        <h5 class="card-title">Género: ${personaje.gender}</h5>
        <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid">
        <p>Especie: ${personaje.species}</p>
        <p>Estado: ${personaje.status}</p>
      </div>
    </div>
  `)

  resultado.innerHTML = personajesHTML;
});

//OBTENER PERSONAJES POR UBICACION

window.addEventListener('load', async () => {
  const ubicacionesResponse = await obtenerUbicaciones();
  //selector para el select de ubicaciones
  const selectUbicaciones = document.getElementById('ubicaciones');
  ubicacionesResponse.forEach(ubicacion => {
    const option = document.createElement('option');
    option.value = ubicacion.url;
    option.textContent = ubicacion.name;
    selectUbicaciones.appendChild(option);
  });
});

const ubicacionButton = document.querySelector('#obtenerUbicacionPersonajes');
ubicacionButton.addEventListener('click', async () => {
  limpiarHTML();
  const selectUbicaciones = document.getElementById('ubicaciones').value;
  const urlsPersonajesPorUbi = await obtenerPjPorUbicacion(selectUbicaciones);

  const detallesPersonajes = [];

  for (const url of urlsPersonajesPorUbi) {
    const personaje = await obtenerPjPorUrl(url);
    detallesPersonajes.push(personaje);
  }

  const personajesHTML = detallesPersonajes.map(personaje => `
    <div class="card m-2 shadow" style="width: 20rem;">
      <div class="card-body">
        <h2>${personaje.name}</h2>
        <h5 class="card-title">Género: ${personaje.gender}</h5>
        <img src="${personaje.image}" alt="${personaje.name}" class="img-fluid">
        <p>Especie: ${personaje.species}</p>
        <p>Estado: ${personaje.status}</p>
      </div>
    </div>
  `);

  resultado.innerHTML = personajesHTML.join('');
});
