export async function renderAsistenciaTable(alumnos) {
  
  const container = document.createElement('div');
  container.className = 'asistencia-container';
  
  container.innerHTML = `
    <h2>📅 Registro de Asistencia Diaria</h2>
    <table class="asistencia-table">
      <thead>
        <tr>
          <th class="col-alumno">Alumno</th>
          <th class="col-grado">Grado</th>
          <th class="col-estado">Estado</th>
        </tr>
      </thead>
      <tbody>
        ${alumnos.map(alumno => `
          <tr data-id="${alumno.id}" class="fila-alumno">
            <td>
              <div class="alumno-info">
                <span class="alumno-nombre">${alumno.nombre} ${alumno.apellido}</span>
                <span class="alumno-id">ID: ${alumno.id}</span>
              </div>
            </td>
            <td>
              <span class="grado-nombre">${alumno.grado}</span>
            </td>
            <td>
              <div class="estado-asistencia">
                <select class="estado-select" data-estado="Presente">
                  <option value="Presente">Presente</option>
                  <option value="Ausente">Ausente</option>
                  <option value="Tarde">Tarde</option>
                </select>
                <span class="estado-badge badge-presente">Presente</span>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="acciones-asistencia">
      <button id="btn-guardar-asistencia" class="btn-guardar">
        <i class="icono-guardar"></i> Guardar Asistencia
      </button>
      <span class="contador-alumnos">Total: ${alumnos.length} alumnos</span>
    </div>
  `;

  // Configurar eventos
  container.querySelectorAll('.estado-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const estado = e.target.value;
      const badge = e.target.nextElementSibling;
      badge.textContent = estado;
      badge.className = `estado-badge badge-${estado.toLowerCase()}`;
    });
  });

  // Evento guardar
  const btnGuardar = container.querySelector('#btn-guardar-asistencia');
  btnGuardar.addEventListener('click', async () => {
    const registros = Array.from(container.querySelectorAll('.fila-alumno')).map(row => ({
      alumnoId: parseInt(row.dataset.id),
      estado: row.querySelector('.estado-select').value
    }));

    try {
      btnGuardar.disabled = true;
      btnGuardar.innerHTML = '<i class="icono-guardar"></i> Guardando...';
      
      await registrarAsistencia(registros);
      
      btnGuardar.innerHTML = '<i class="icono-guardar"></i> Guardado ✓';
      setTimeout(() => {
        btnGuardar.innerHTML = '<i class="icono-guardar"></i> Guardar Asistencia';
        btnGuardar.disabled = false;
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      btnGuardar.innerHTML = '<i class="icono-guardar"></i> Error!';
      setTimeout(() => {
        btnGuardar.innerHTML = '<i class="icono-guardar"></i> Guardar Asistencia';
        btnGuardar.disabled = false;
      }, 2000);
    }
  });

  return container;
}

async function registrarAsistencia(registros) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No hay sesión activa');

  const response = await fetch('http://localhost:3000/api/asistencia', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ registros })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al guardar');
  }

  return await response.json();
}

export async function getAlumnosPorGrado(gradoId) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');

  const response = await fetch(`http://localhost:3000/api/alumnos/${gradoId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) throw new Error('Error al obtener alumnos');
  return await response.json();
}