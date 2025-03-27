import { renderHeader } from './header/header.js';
import { renderLogin } from './login/login.js';
import { renderAsistenciaTable } from './services/asistenciaService.js';
import { login } from './services/authService.js';
import { obtenerAlumnosPorGrado } from './services/alumnoService.js';

const DOM = document.getElementById('root');

async function initApp() {
  DOM.innerHTML = '';
  DOM.appendChild(renderHeader());

  if (!localStorage.getItem('token')) {
    DOM.appendChild(renderLogin());
  } else {
    try {
      const alumnos = await obtenerAlumnosPorGrado(1); 
      DOM.appendChild(await renderAsistenciaTable(alumnos));
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
      DOM.appendChild(renderLogin());
    }
  }
}

// Manejo de login
document.addEventListener('login-submit', async (e) => {
  try {
    const { token, nombre } = await login(e.detail.email, e.detail.password);
    localStorage.setItem('token', token);
    localStorage.setItem('user', nombre);
    initApp();
  } catch (error) {
    alert(error.message);
  }
});

// Logout
document.querySelector('#logout-btn')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  initApp();
});

initApp();