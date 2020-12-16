import { Test, TestingModule } from '@nestjs/testing';
import { RedirectControllerController } from './redirect-controller.controller';

describe('RedirectControllerController', () => {
  let controller: RedirectControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectControllerController],
    }).compile();

    controller = module.get<RedirectControllerController>(RedirectControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
