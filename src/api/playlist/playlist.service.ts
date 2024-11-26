import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "../../api-entity/Playlist.entity";
import { Repository } from "typeorm";
import { DeletePlaylistDto } from "./dto/delete-playlist.dto";
import { Music } from "../../api-entity/Music.entity";
import { MusicPlaylistDetail } from "../../api-entity/MusicPlaylist.entity";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepo: Repository<Playlist>,
    @InjectRepository(Music)
    private readonly musicRepo: Repository<Music>,
    @InjectRepository(MusicPlaylistDetail)
    private readonly musicPlaylistDetail: Repository<MusicPlaylistDetail>
  ) {}

  async removeMusic(req: any, id_music, id_playlist) {
    const id_user = req.user.id_user;

    // check if user own the playlist
    const userPlaylist = await this.playlistRepo
      .createQueryBuilder("playlist")
      .andWhere("id_playlist = :id_playlist", { id_playlist })
      .andWhere("id_user = :id_user", { id_user })
      .getMany();

    if (userPlaylist.length !== 1)
      throw new NotFoundException(
        "Play list not found or user not own the playlist"
      );

    // Check existing music
    const existingMusic = await this.musicRepo
      .createQueryBuilder("music")
      .andWhere("id_music = :id_music", { id_music })
      .getMany();
    if (existingMusic.length !== 1) {
      throw new NotFoundException("Music not found");
    }

    // Check music playlist detail
    const existingPlaylistDetail = await this.musicPlaylistDetail
      .createQueryBuilder("musicPlaylist")
      .andWhere("id_music = :id_music", { id_music })
      .andWhere("id_playlist = :id_playlist", { id_playlist })
      .getMany();
    if (existingPlaylistDetail.length !== 1) {
      throw new ConflictException("Music not in the playlist");
    }

    // Update db
    const newMusicPlaylistDetail = this.musicPlaylistDetail.delete({
      id_music,
      id_playlist,
    });

    return { message: "Delete music from playlist successfully" };
  }

  async addMusic(body, req) {
    const id_user = req.user.id_user;
    const { id_music, id_playlist, index_order } = body;

    // check if user own the playlist
    const userPlaylist = await this.playlistRepo
      .createQueryBuilder("playlist")
      .andWhere("id_playlist = :id_playlist", { id_playlist })
      .andWhere("id_user = :id_user", { id_user })
      .getMany();

    if (userPlaylist.length !== 1)
      throw new NotFoundException(
        "Play list not found or user not own the playlist"
      );

    // Check existing music
    const existingMusic = await this.musicRepo
      .createQueryBuilder("music")
      .andWhere("id_music = :id_music", { id_music })
      .getMany();
    if (existingMusic.length !== 1) {
      throw new NotFoundException("Music not found");
    }

    // Check music playlist detail
    const existingPlaylistDetail = await this.musicPlaylistDetail
      .createQueryBuilder("musicPlaylist")
      .andWhere("id_music = :id_music", { id_music })
      .andWhere("id_playlist = :id_playlist", { id_playlist })
      .getMany();
    if (existingPlaylistDetail.length !== 0) {
      throw new ConflictException("Music already in the playlist");
    }

    // Update db
    const newMusicPlaylistDetail = this.musicPlaylistDetail.create({
      id_music,
      id_playlist,
      index_order,
    });

    const savePlaylistDetail = await this.musicPlaylistDetail.save(
      newMusicPlaylistDetail
    );

    return { message: "Add music to playlist successfully" };
  }

  async createPlaylist(body: CreatePlaylistDto, req: any) {
    const { name, playlist_index } = body;
    const id_user = req.user.id_user;

    const newPlaylist = this.playlistRepo.create({
      name,
      playlist_index,
      id_user,
    });
    const savePlaylist = await this.playlistRepo.save(newPlaylist);

    return { newID: savePlaylist.id_playlist };
  }

  async findAllPlaylist(req, id_playlist) {
    const id_user = req.user.id_user;
    const playlistRepo = this.playlistRepo
      .createQueryBuilder("playlist")
      .andWhere("playlist.id_user = :id_user", { id_user })
      .leftJoinAndSelect("playlist.musics", "mpd")
      .leftJoinAndSelect("mpd.music", "music")
      .leftJoinAndSelect("music.artists", "mad")
      .leftJoinAndSelect("mad.artist", "artist");

    id_playlist &&
      playlistRepo.andWhere("playlist.id_playlist = :id_playlist", {
        id_playlist,
      });

    let playListList: any[] = await playlistRepo.getMany();

    playListList = playListList.map((playlist) => {
      return {
        ...playlist,
        musics: playlist.musics.map((music) => {
          return {
            ...music.music,
            index_order: music.index_order,
          };
        }),
      };
    });

    return { data: playListList };
  }

  async updatePlaylist(body: UpdatePlaylistDto, req: any) {
    const id_user = req.user.id_user;
    const { name, playlist_index, id_playlist } = body;

    // Tìm playlist thuộc về user hiện tại
    const existingPlaylist = await this.playlistRepo.findOne({
      where: { id_playlist, id_user },
    });

    if (!existingPlaylist)
      throw new NotFoundException("Playlist not found or not owned by user");

    // Cập nhật thông tin playlist
    existingPlaylist.name = name || existingPlaylist.name;
    existingPlaylist.playlist_index =
      playlist_index ?? existingPlaylist.playlist_index;

    await this.playlistRepo.update(
      { id_playlist, id_user },
      {
        name,
        playlist_index,
      }
    );

    return { message: "Playlist updated successfully" };
  }

  async removePlaylist(id_playlist, req: any) {
    const id_user = req.user.id_user;

    // Kiểm tra xem playlist có tồn tại và thuộc về user hiện tại không
    const playlist = await this.playlistRepo.findOne({
      where: { id_playlist, id_user },
    });

    if (!playlist) {
      throw new Error("Playlist not found or not owned by user");
    }

    // Xóa playlist
    await this.playlistRepo.remove(playlist);
    return { message: "Playlist removed successfully" };
  }
}
