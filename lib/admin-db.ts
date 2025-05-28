// Simple in-memory admin user management
const ADMIN_USER = {
  id: "1",
  name: "Admin",
  email: "admin@example.com",
  username: "admin.av1",
  password: "5XIfAwEB7ZnC%K", // Plain text for simplicity
  role: "admin",
}

export async function getAdminUser(identifier: string) {
  if (identifier === ADMIN_USER.email || identifier === ADMIN_USER.username) {
    return ADMIN_USER
  }
  return null
}

export async function verifyCredentials(identifier: string, password: string) {
  const user = await getAdminUser(identifier)
  if (!user) return null

  if (password === user.password) {
    return user
  }

  return null
}
