import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { llaves } from '../config/keys';
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {}
  /*
   * Add service methods here
   */
  GenerarClave(){
    let contrasena = generador(8,false);
    return contrasena;
  }

  CifrarClave(contrasena: string){
    let claveCifrada = cryptoJS.MD5(contrasena).toString();
    return claveCifrada;

  }

  //Login
  IdentificarUsuario(usuario: string, contrasena: string){
    try{
      let u = this.usuarioRepository.findOne({where:{correo:usuario, contrasena:contrasena}});
      if(u){
        return u;
      }
      return false;
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sign({
      data:{
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre
      }
    }, llaves.clavejwt);
    return token;
  }

  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, llaves.clavejwt);
      return datos;
    }catch{
      return false;
    }
  }
}
