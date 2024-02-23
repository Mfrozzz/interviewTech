import { AppDataSource } from "../data-source";
import Resposta from "../entities/Resposta";

export const respostaRepository = AppDataSource.getRepository(Resposta);