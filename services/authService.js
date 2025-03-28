export async function login(email, password) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al iniciar sesión');
  }

  return await response.json();
}

export async function verifyToken(token) {
  const response = await fetch('http://localhost:3000/auth/verify', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.ok) {
    throw new Error('Token inválido o expirado');
  }
  
  return await response.json();
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}