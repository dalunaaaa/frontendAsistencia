import { registrarAsistencia } from './asistenciaService.js';

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
  `;

  // Evento para guardar
  table.querySelector('#btn-guardar').addEventListener('click', async () => {
    const rows = table.querySelectorAll('tbody tr');
    const alumnosActualizados = Array.from(rows).map(row => ({
      id: parseInt(row.dataset.id),
      estado: row.querySelector('.estado-select').value
    }));

    try {
      await registrarAsistencia(alumnosActualizados);
      alert('✅ Asistencia guardada correctamente');
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  });

  return table;
}