import { renderHeader } from './header/header.js';
import { renderLogin } from './login/login.js';
import { renderAsistenciaTable } from './services/asistenciaTable.js';
//import { renderAsistenciaTable } from './asistenciaTable.js';
import { verifyToken } from './services/authService.js';
import { getAlumnosPorGrado } from './services/asistenciaService.js';

const DOM = document.getElementById('root');

async function initApp() {
  DOM.innerHTML = '';
  DOM.appendChild(renderHeader());

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    DOM.appendChild(renderLogin());
    return;
  }

  try {
    await verifyToken(token);
    const alumnos = await getAlumnosPorGrado(1); // Cambia el grado según necesites
    DOM.appendChild(await renderAsistenciaTable(alumnos));
  } catch (error) {
    console.error('Error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    DOM.appendChild(renderLogin());
  }
}

window.addEventListener('auth-change', initApp);
document.addEventListener('DOMContentLoaded', initApp);

// Manejar logout
document.addEventListener('click', (e) => {
  if (e.target.closest('#logout-btn')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
  }
});