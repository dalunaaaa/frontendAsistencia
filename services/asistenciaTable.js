import { registrarAsistencia } from '../services/asistenciaService.js';

export async function renderAsistenciaTable(alumnos) {
  const table = document.createElement('div');
  table.className = 'asistencia-container';
  
  table.innerHTML = `
    <h2>📅 Registrar Asistencia</h2>
    <table>
      <thead>
        <tr>
          <th>Alumno</th>
          <th>Grado</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        ${alumnos.map(alumno => `
          <tr data-id="${alumno.id}">
            <td>${alumno.nombre} ${alumno.apellido}</td>
            <td>${alumno.grado}</td>
            <td>
              <select class="estado-select">
                <option value="Presente">✅ Presente</option>
                <option value="Ausente">❌ Ausente</option>
                <option value="Tarde">⌛ Tarde</option>
              </select>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <button id="btn-guardar" class="btn-guardar">Guardar Asistencia</button>
    <div class="asistencia-status"></div>
  `;

  table.querySelector('#btn-guardar').addEventListener('click', async () => {
    const rows = table.querySelectorAll('tbody tr');
    const registros = Array.from(rows).map(row => ({
      alumnoId: parseInt(row.dataset.id),
      estado: row.querySelector('.estado-select').value
    }));

    const btnGuardar = table.querySelector('#btn-guardar');
    const statusDiv = table.querySelector('.asistencia-status');
    
    btnGuardar.disabled = true;
    statusDiv.textContent = 'Guardando...';
    statusDiv.style.color = 'blue';

    try {
      await registrarAsistencia(registros);
      statusDiv.textContent = '✅ Asistencia guardada';
      statusDiv.style.color = 'green';
    } catch (error) {
      statusDiv.textContent = `❌ Error: ${error.message}`;
      statusDiv.style.color = 'red';
    } finally {
      btnGuardar.disabled = false;
      setTimeout(() => statusDiv.textContent = '', 3000);
    }
  });

  return table;
}