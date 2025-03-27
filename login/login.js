import { login } from '../services/authService.js';

export function renderLogin() {
  const form = document.createElement('form');
  form.className = 'login-form';
  form.innerHTML = `
    <h2>🔐 Iniciar Sesión</h2>
    <input type="email" placeholder="Correo electrónico" required>
    <input type="password" placeholder="Contraseña" required>
    <button type="submit" class="btn-login">Ingresar</button>
  `;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      const user = await login(email, password);
      localStorage.setItem('token', user.token);
      window.location.reload();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });

  return form;
}