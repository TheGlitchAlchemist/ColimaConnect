import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

// Carga las variables del archivo .env (DATABASE_URL)
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors()); 
app.use(express.json()); 


app.get('/api/negocios', async (req, res) => {
    try {
        const negocios = await prisma.businesses.findMany({
            include: {
                services: true, 
                owners: {
                    select: { full_name: true, email: true } 
                }
            }
        });
        res.json(negocios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los negocios de Colima' });
    }
});
/**
 * RUTA: Crear una nueva cita
 * POST /api/citas */
app.post('/api/citas', async (req, res) => {
    
    const { 
        business_id, 
        client_id, 
        service_id, 
        staff_id, 
        start_time, 
        total_price 
    } = req.body;

    try {
        const { client_id } = req.body;


const clienteExiste = await prisma.clients.findUnique({
    where: { id: Number(client_id) }
});

if (!clienteExiste) {
    return res.status(404).json({ 
        error: "Error de Relación", 
        detalle: `El cliente con ID ${client_id} no existe en ColimaConnect. Revisa Prisma Studio.` 
    });
}

      
        const servicio = await prisma.services.findUnique({
            where: { id: service_id }
        });

        if (!servicio) {
            return res.status(404).json({ error: "El servicio no existe" });
        }

        const startDate = new Date(start_time);
        const endDate = new Date(startDate.getTime() + servicio.duration_minutes * 60000);

        
        const nuevaCita = await prisma.appointments.create({
            data: {
                business_id,
                client_id,
                service_id,
                staff_id,
                start_time: startDate,
                end_time: endDate,
                total_price: total_price || servicio.price, 
                status: 'pending' 
            }
        });

        
        res.status(201).json({
            message: "Cita agendada con éxito en ColimaConnect",
            cita: nuevaCita
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la cita. Revisa los IDs y el formato de fecha." });
    }
});
// Ruta de verificacion de conexion
app.get('/', (req, res) => {
    res.send('ColimaConnect API funcionando');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`
    ==================================================
    Servidor corriendo en http://localhost:${PORT}
    Ruta de datos: http://localhost:${PORT}/api/negocios
    ==================================================
    `);
});