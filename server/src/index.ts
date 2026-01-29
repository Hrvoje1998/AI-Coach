import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Aplikacije pokrenuta');
});

app.post('/users', async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Korisnik već postoji ili je greška." });
  }
});

app.listen(PORT, () => {
  console.log(`Server je aktivan na: http://localhost:${PORT}`);
});