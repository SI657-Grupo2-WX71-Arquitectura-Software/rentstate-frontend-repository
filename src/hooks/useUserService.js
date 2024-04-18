const BASE_URL = 'http://localhost:8080'; // Reemplaza esto con la URL de tu backend

// Función para obtener la información del usuario
export async function getUserInfo(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user information:', error.message);
    throw error;
  }
}
