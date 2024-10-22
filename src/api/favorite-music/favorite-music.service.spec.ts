import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteMusicService } from './favorite-music.service';

describe('FavoriteMusicService', () => {
  let service: FavoriteMusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteMusicService],
    }).compile();

    service = module.get<FavoriteMusicService>(FavoriteMusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
