import { login } from '../services/authService.js';

export function renderLogin() {
  const form = document.createElement('form');
  form.className = 'login-form';
  form.innerHTML = `
    <h2>🔐 Iniciar Sesión</h2>
    <div class="input-group">
      <input type="email" placeholder="Correo electrónico" required>
    </div>
    <div class="input-group">
      <input type="password" placeholder="Contraseña" required>
    </div>
    <button type="submit" class="btn-login">Ingresar</button>
    <div class="login-status"></div>
  `;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const statusDiv = form.querySelector('.login-status');
    const submitBtn = form.querySelector('.btn-login');

    submitBtn.disabled = true;
    statusDiv.textContent = 'Verificando...';
    statusDiv.style.color = 'blue';

    try {
      const user = await login(email, password);
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      
      statusDiv.textContent = '¡Bienvenido!';
      statusDiv.style.color = 'green';
      
      setTimeout(() => {
        window.dispatchEvent(new Event('auth-change'));
      }, 1000);
    } catch (error) {
      statusDiv.textContent = error.message;
      statusDiv.style.color = 'red';
    } finally {
      submitBtn.disabled = false;
    }
  });

  return form;
}