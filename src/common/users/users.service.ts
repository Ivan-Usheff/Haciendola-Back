import { Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { HandlerService } from "@utils-decorators/index";



@Injectable()
export class UsersService {

  @Inject()
  private readonly userRepository: UsersRepository;


  @HandlerService()
  public async getAllUsers(){
    return await  this.userRepository.getAll();
  }
}