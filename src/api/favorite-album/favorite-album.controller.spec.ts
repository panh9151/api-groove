import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteAlbumController } from './favorite-album.controller';
import { FavoriteAlbumService } from './favorite-album.service';

describe('FavoriteAlbumController', () => {
  let controller: FavoriteAlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteAlbumController],
      providers: [FavoriteAlbumService],
    }).compile();

    controller = module.get<FavoriteAlbumController>(FavoriteAlbumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
