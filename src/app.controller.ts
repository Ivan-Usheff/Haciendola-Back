import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseControllerResponseType } from '@utils-types/base-controller-response.type';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/healthy')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 418, description: 'Forbidden.' })
  public getHello(@Res() res: Response): Response {
    const response = this.appService.getHello();
    return res
      .status(200)
      .json(response);
  }
}
