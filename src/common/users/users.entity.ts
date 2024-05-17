import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from "utils/entities/base.entity";

import * as bcrypt from 'bcrypt';

@Entity('users')
export class UsersEntity extends BaseEntity {
  
  @Column({
    name: 'user', 
    type: 'varchar',
    length: 20
  })
  user: string;
  
  @Column({
    name: 'email', 
    type: 'varchar',
    unique: true
  })
  email: string;
  
  @Column({
    name: 'password', 
    type: 'varchar',
    select: false
  })
  password: string;
  
}