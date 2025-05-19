import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import { rotas } from './routes';

dotenv.config();
const app = express();

app.use(cors())
app.use(express.json())
app.use(rotas)



app.listen(3333,()=>{console.log("Servidor rodando na porta 3333")})