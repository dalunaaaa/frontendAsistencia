export async function registrarAsistencia(registros) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/asistencia/registrar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ registros })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al guardar asistencia');
  }

  return await response.json();
}

export async function getAlumnosPorGrado(gradoId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3000/api/alumnos/grado/${gradoId}`, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Error al obtener alumnos');
  return await response.json();
}
