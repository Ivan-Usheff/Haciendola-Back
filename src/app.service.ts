import { Injectable } from '@nestjs/common';
import { BaseControllerResponseType } from '@utils-types/base-controller-response.type';

@Injectable()
export class AppService {
  getHello(): BaseControllerResponseType<string> {
    return {status:418, response: 'HTTP_I_AM_A_TEAPOT'};
  }
}
