import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteMusicController } from './favorite-music.controller';
import { FavoriteMusicService } from './favorite-music.service';

describe('FavoriteMusicController', () => {
  let controller: FavoriteMusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteMusicController],
      providers: [FavoriteMusicService],
    }).compile();

    controller = module.get<FavoriteMusicController>(FavoriteMusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
