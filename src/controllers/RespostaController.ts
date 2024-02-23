import { Request, Response } from "express";
import { respostaRepository } from "../repositories/RespostaRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

type JwtToken={
    id:number
}

export default class RespostaController{
    // metodo para criar a resposta final
    async create(req: Request, res: Response){
        const {answer} = req.body
        const {authorization} = req.headers
        // apenas consegue criar e enviar se estiver devidamente autorizado
        if(!authorization){
            return res.status(403).json({message:"missing_credentials"});
        }
        let token = authorization.split(" ")[1]
        const {id} = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtToken
        if(!id){
            return res.status(401).json({message:"unauthorized"});
        }
        // apenas se os dados estiverem escritos
        if(!answer){
            return res.status(403).json({message:"missing_credentials"})
        }
        try{
            //concatenando
            const jsonString = JSON.stringify(answer);
            // base64
            const finalizacao = Buffer.from(jsonString, 'base64').toString('utf-8');
            // salvando resposta
            const newResposta = respostaRepository.create({answer:finalizacao})
            await respostaRepository.save(newResposta)
            return res.json({
                newResposta
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error'})
        }
    }
}