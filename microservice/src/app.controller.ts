import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    description: 'Devuelve hello world.',
    type: String,
  })
  @ApiOperation({
    summary: 'Devuelve hello world',
    description: 'Devuelve hello world',
  })
  
  helloWorld(): string {
    return this.appService.helloWorld();
  }

}
