import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onsubmit = negociacaoController.apaga.bind(negociacaoController);

