import { AppDataSource } from "../data-source";
import Autenticacao from "../entities/Autenticacao";

export const authRepository = AppDataSource.getRepository(Autenticacao);