import { Router } from 'express'
import RespostaController from './controllers/RespostaController';
import AutenticacaoController from './controllers/AutenticacaoController';
import PilarController from './controllers/PilarController';

const routes = Router()

routes.post('/createUser', new AutenticacaoController().create);
routes.post('/autenticacao', new AutenticacaoController().login)
routes.post('/envia_pilar', new PilarController().create);
routes.get('/listar_pilares', new PilarController().list);
routes.post('/envia_resposta', new RespostaController().create);

export default routes;
//arquivo de rotas