export function renderHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
      <h1>📊 Asistencia Escolar</h1>
      <button id="logout-btn" class="btn-logout">Cerrar Sesión</button>
    `;
    return header;
  }