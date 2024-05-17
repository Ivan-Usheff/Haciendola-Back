import { UsersEntity } from "@common/users/users.entity";
import { Inject, BadRequestException } from "@nestjs/common";
import { ServerLogger } from "@utils-logger/server.logger.service";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<UsersEntity> {

  @Inject()
  private logger:ServerLogger = new ServerLogger(this.constructor.name)
  
  constructor() {
    this.logger.setContext(this.constructor.name);
  }

  listenTo() {
    return UsersEntity;
  }

  async beforeInsert(event: InsertEvent<UsersEntity>) {
    const {email, password} = event.entity;
    const alreadyExist = await event.manager.getRepository(UsersEntity).findOne({where:{email}});
    
    if(alreadyExist)
      throw new BadRequestException(`Ese corrreo ya se encuetra registrado: [email: ${email} ]`);
    
    event.entity.password = await bcrypt.hash(password, +process.env.HASH_ROUD) as string;

    this.logger.debug(`Se inserto el nuevo usuario`);
  }

}