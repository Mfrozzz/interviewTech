import { Request, Response } from "express";
import { authRepository } from "../repositories/AutenticacaoRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export default class AutenticacaoController{
    // cria usuário
    async create(req: Request, res: Response){
        const {name,password} = req.body

        const userExist = await authRepository.findOneBy({name})
        // não permite duplicidade
        if(userExist){
            return res.status(401).json({message:"User already exist"})
        }
        // deve possuir todos os campos
        if(!name && !password){
            return res.status(401).json({message:"missing_credentials"})
        }
        // encriptando a senha
        const hashPassword = await bcrypt.hash(password,6);

        try{
            const newAuth = authRepository.create({name,password:hashPassword});
            await authRepository.save(newAuth);
            return res.status(201).json(newAuth);
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error'})
        }
    }
    // cria a seção. retornando ao final o usuário e seu token
    async login(req: Request, res: Response){
        const {name,password} = req.body
        const userExist = await authRepository.findOneBy({name})

        if(!userExist){
            return res.status(401).json({message:"Name or password invalid"})
        }
        // login apenas se senhas encriptadas forem iguais
        const verifyPassword = await bcrypt.compare(password,userExist.password);
        if(!verifyPassword){
            return res.status(401).json({message:"Name or password invalid"});
        }
        // configuração do token
        const token = jwt.sign({id:userExist.id},process.env.JWT_PASS ?? "",{expiresIn:'3h'});
        const {password:_,...userLogin} = userExist
        return res.json({
            user: userLogin,
            token: token
        });
    }
}