import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { BaseRepository } from "utils/base/repository.base";
import { UsersEntity } from "./users.entity";
import { Repository } from "typeorm";
import { FindUserType } from "./types/users.type";
import { HandlerRepository } from "@utils-decorators/index";



@Injectable()
export class UsersRepository extends BaseRepository<UsersEntity>{

  @Inject('USER_REPOSITORY')
  protected readonly repository: Repository<UsersEntity>;

  @HandlerRepository()
  public async getUserforLogin(props: FindUserType): Promise<UsersEntity> {
    const {email} = props
    const userExist = await this.repository.findOne(
      {
        where:{email}, 
        select:{ 
          id: true, 
          user: true,
          password: true
        }
      }
    );
    if(!userExist)
      throw new BadRequestException("La informacion proporcionada no es correcta.");
    return userExist
  }
  
  @HandlerRepository()
  public async getAll(): Promise<UsersEntity[]> {
    const users = await this.repository.find();
    return users;
}
}
