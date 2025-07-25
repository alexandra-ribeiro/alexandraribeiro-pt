import dbConnect from "../lib/mongodb"
import User from "../models/User"
import { hash } from "bcryptjs"

async function initAdmin() {
  try {
    await dbConnect()

    // Verificar se já existe um admin
    const adminExists = await User.findOne({ email: "admin.av1@example.com" })

    if (adminExists) {
      console.log("Admin já existe, atualizando senha...")
      adminExists.password = await hash("5XIfAwEB7ZnC%K", 10)
      await adminExists.save()
      console.log("Senha do admin atualizada com sucesso!")
    } else {
      // Criar admin
      await User.create({
        name: "Admin",
        email: "admin.av1@example.com",
        password: await hash("5XIfAwEB7ZnC%K", 10),
        role: "admin",
      })
      console.log("Admin criado com sucesso!")
    }

    process.exit(0)
  } catch (error) {
    console.error("Erro ao inicializar admin:", error)
    process.exit(1)
  }
}

initAdmin()
