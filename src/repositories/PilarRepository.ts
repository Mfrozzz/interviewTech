import { AppDataSource } from "../data-source";
import Pilar from "../entities/Pilar";

export const pilarRepository = AppDataSource.getRepository(Pilar);