import { renderHeader } from './header/header.js';
import { renderLogin } from './login/login.js';
import { renderAsistenciaTable } from './services/asistenciaService.js';
import { verifyToken } from './services/authService.js';
import { obtenerAlumnosPorGrado } from './services/alumnoService.js';

const DOM = document.getElementById('root');

async function initApp() {
  DOM.innerHTML = '';
  DOM.appendChild(renderHeader());

  const token = localStorage.getItem('token');
  
  if (!token) {
    DOM.appendChild(renderLogin());
    return;
  }

  try {
    await verifyToken(token);
    const alumnos = await obtenerAlumnosPorGrado(1); 
    DOM.appendChild(await renderAsistenciaTable(alumnos));
  } catch (error) {
    console.error('Error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    DOM.appendChild(renderLogin());
  }
}

// Manejar cambios de autenticación
window.addEventListener('auth-change', initApp);

// Logout
document.addEventListener('click', (e) => {
  if (e.target.matches('#logout-btn')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
  }
});

// Inicializar la aplicación
initApp();