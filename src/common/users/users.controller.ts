import { Controller, Get, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from 'express';



@Controller('users')
export class UsersController {
  
  constructor(private readonly service: UsersService){}

  @Get('all')
  public async getAllUsers(@Res() res: Response) {
    // return this.service.getAllUsers()
    const response = await this.service.getAllUsers()
    return res
      .status(200)
      .json(response);
  }
}
