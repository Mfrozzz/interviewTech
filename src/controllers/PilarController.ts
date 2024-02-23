import { Request, Response } from "express";
import { pilarRepository } from "../repositories/PilarRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

type JwtToken = {
    id: number
}

export default class PilarController{
    //função auxiliar para criação dos pilares diretamente no banco de dados
    async create(req: Request, res: Response){
        const {description} = req.body
        if(!description){
            return res.status(403).json({message:"missing_credentials"})
        }
        try{
            const newPilar = pilarRepository.create({description})
            await pilarRepository.save(newPilar)
            return res.status(201).json({message:'Envio da pilares'})
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error'})
        }
    }
    //listar todos os pilares
    async list(req: Request, res: Response){
        const {authorization} = req.headers
        //apenas se autorizado
        if(!authorization){
            return res.status(403).json({message:"missing_credentials"});
        }
        //tratamento da string do token
        let token = authorization.split(" ")[1]
        const {id} = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtToken
        if(!id){
            return res.status(401).json({message:"unauthorized"});
        }
        // estando autorizado e apto ao acesso -> mostra todas as informações
        try{
            const pilares = await pilarRepository.find()
            return res.json(pilares);
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error'})
        }
    }
}