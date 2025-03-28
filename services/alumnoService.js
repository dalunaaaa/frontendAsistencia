export async function registrarAsistencia(alumnos) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/asistencia/marcar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ alumnos })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al guardar');
  }

  return await response.json();
}

export async function obtenerAlumnosPorGrado(gradoId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/alumnos/grado/${gradoId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) throw new Error('Error al cargar alumnos');
  return await response.json();
}
