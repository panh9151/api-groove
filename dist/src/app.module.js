"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const type_module_1 = require("./api/type/type.module");
const user_module_1 = require("./api/user/user.module");
const music_module_1 = require("./api/music/music.module");
const logger_middleware_1 = require("./middleware/logger-middleware/logger.middleware");
const auth_user_entity_1 = require("./middleware/logger-middleware/entities/auth-user.entity");
const login_module_1 = require("./api/auth/login/login.module");
const profile_module_1 = require("./api/auth/profile/profile.module");
const forgot_password_module_1 = require("./api/auth/forgot-password/forgot-password.module");
const mailer_1 = require("@nestjs-modules/mailer");
const upload_image_module_1 = require("./api/upload/upload-image/upload-image.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const upload_audio_module_1 = require("./api/upload/upload-audio/upload-audio.module");
const change_password_module_1 = require("./api/auth/change-password/change-password.module");
const verify_email_module_1 = require("./api/auth/verify-email/verify-email.module");
const reset_password_module_1 = require("./api/auth/reset-password/reset-password.module");
const register_module_1 = require("./api/auth/register/register.module");
const update_infor_module_1 = require("./api/auth/update-infor/update-infor.module");
const album_module_1 = require("./api/album/album.module");
const artist_module_1 = require("./api/artist/artist.module");
const favorite_album_module_1 = require("./api/favorite-album/favorite-album.module");
const favorite_music_module_1 = require("./api/favorite-music/favorite-music.module");
const follow_module_1 = require("./api/follow/follow.module");
const music_history_module_1 = require("./api/music-history/music-history.module");
const playlist_module_1 = require("./api/playlist/playlist.module");
const ranking_module_1 = require("./api/ranking/ranking.module");
const search_module_1 = require("./api/search/search.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: "smtp.gmail.com",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: process.env.DB_HOST,
                port: 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [__dirname + "/../**/*.entity.{js,ts}"],
                synchronize: false,
            }),
            typeorm_1.TypeOrmModule.forFeature([auth_user_entity_1.AuthUser]),
            type_module_1.TypeModule,
            user_module_1.UserModule,
            music_module_1.MusicModule,
            login_module_1.LoginModule,
            profile_module_1.ProfileModule,
            forgot_password_module_1.ForgotPasswordModule,
            upload_image_module_1.UploadImageModule,
            cloudinary_module_1.CloudinaryModule,
            upload_audio_module_1.UploadAudioModule,
            change_password_module_1.ChangePasswordModule,
            verify_email_module_1.VerifyEmailModule,
            reset_password_module_1.ResetPasswordModule,
            register_module_1.RegisterModule,
            update_infor_module_1.UpdateInforModule,
            album_module_1.AlbumModule,
            artist_module_1.ArtistModule,
            favorite_album_module_1.FavoriteAlbumModule,
            favorite_music_module_1.FavoriteMusicModule,
            follow_module_1.FollowModule,
            music_history_module_1.MusicHistoryModule,
            playlist_module_1.PlaylistModule,
            ranking_module_1.RankingModule,
            search_module_1.SearchModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map