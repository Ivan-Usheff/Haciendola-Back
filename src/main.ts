import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DataBaseService } from '@common/database/database.service';
import { DatabaseModule } from '@common/database/database.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();
async function bootstrap() {
  const logger = new ConsoleLogger('boostrap()',{timestamp: true});
  const PORT = +process.env.PORT;

  try{
    logger.log(`initiating...`);

    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
      logger
    });

    app.setGlobalPrefix('api');
    app.enableCors({origin: '*'});
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        enableDebugMessages: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );
    
    const config = new DocumentBuilder()
      .setTitle('Haciendola Test Backend')
      .setDescription('Backend API description')
      .setVersion('1.0')
      .addTag('Backend')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
    // const databaseService = app.select(DatabaseModule).get(DataBaseService,{strict:true})
    // await databaseService.seedDataBase()

    await app.listen(PORT);
    logger.log(`running on port ${PORT}`);
      
  }catch(error){

    logger.fatal(`Backend fail: ${error}`);
    process.exit(1);

  }
}
bootstrap();
