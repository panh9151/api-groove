import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteAlbumService } from './favorite-album.service';

describe('FavoriteAlbumService', () => {
  let service: FavoriteAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteAlbumService],
    }).compile();

    service = module.get<FavoriteAlbumService>(FavoriteAlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
