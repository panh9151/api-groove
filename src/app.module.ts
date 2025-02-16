import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeModule } from "./api/type/type.module";
import { UserModule } from "./api/user/user.module";
import { MusicModule } from "./api/music/music.module";
import { LoggerMiddleware } from "./middleware/logger-middleware/logger.middleware";
import { AuthUser } from "./middleware/logger-middleware/entities/auth-user.entity";
import { LoginModule } from "./api/auth/login/login.module";
import { ProfileModule } from "./api/auth/profile/profile.module";
import { ForgotPasswordModule } from "./api/auth/forgot-password/forgot-password.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { UploadImageModule } from "./api/upload/upload-image/upload-image.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { UploadAudioModule } from "./api/upload/upload-audio/upload-audio.module";
import { ChangePasswordModule } from "./api/auth/change-password/change-password.module";
import { VerifyEmailModule } from "./api/auth/verify-email/verify-email.module";
import { ResetPasswordModule } from "./api/auth/reset-password/reset-password.module";
import { RegisterModule } from "./api/auth/register/register.module";
import { UpdateInforModule } from "./api/auth/update-infor/update-infor.module";
import { AlbumModule } from "./api/album/album.module";
import { ArtistModule } from "./api/artist/artist.module";
import { FavoriteAlbumModule } from "./api/favorite-album/favorite-album.module";
import { FavoriteMusicModule } from "./api/favorite-music/favorite-music.module";
import { FollowModule } from "./api/follow/follow.module";
import { MusicHistoryModule } from "./api/music-history/music-history.module";
import { PlaylistModule } from "./api/playlist/playlist.module";
import { RankingModule } from "./api/ranking/ranking.module";
import { SearchModule } from "./api/search/search.module";
import { ComposerModule } from "./api/composer/composer.module";
import { ChartModule } from "./api/chart/chart.module";
import { CommentModule } from "./api/comment/comment.module";
import { TopTypeModule } from "./api/top-type/top-type.module";
import { NotificationModule } from "./api/notification/notification.module";
// import { CompletePaymentModule } from './api/complete-payment/complete-payment.module';
import { PaymentModule } from "./api/payment/payment.module";
import { PaymentModule as PaymentAuthModule } from "./api/auth/payment/payment.module";
import { ignoreLogger } from "vnpay";
import { VnpayModule } from "nestjs-vnpay";

@Module({
  imports: [
    // Config for env
    ConfigModule.forRoot(),

    // Mailer
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),

    // Config for connect db
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/../**/*.entity.{js,ts}"],
      synchronize: false,
    }),
    VnpayModule.register({
      tmnCode: "RF7NRGDR",
      secureSecret: "E794M73JC4SAUMML2H39RKWEGM6D2OTE",
      vnpayHost: "https://sandbox.vnpayment.vn",
      testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
      hashAlgorithm: "SHA512" as any, // tùy chọn

      /**
       * Sử dụng enableLog để bật/tắt logger
       * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
       */
      enableLog: true, // tùy chọn

      /**
       * Hàm `loggerFn` sẽ được gọi để ghi log
       * Mặc định, loggerFn sẽ ghi log ra console
       * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
       *
       * `ignoreLogger` là một hàm không làm gì cả
       */
      loggerFn: ignoreLogger, // tùy chọn
    }),
    TypeOrmModule.forFeature([AuthUser]),
    TypeModule,
    UserModule,
    MusicModule,
    LoginModule,
    ProfileModule,
    ForgotPasswordModule,
    UploadImageModule,
    CloudinaryModule,
    UploadAudioModule,
    ChangePasswordModule,
    VerifyEmailModule,
    ResetPasswordModule,
    RegisterModule,
    UpdateInforModule,
    AlbumModule,
    ArtistModule,
    FavoriteAlbumModule,
    FavoriteMusicModule,
    FollowModule,
    MusicHistoryModule,
    PlaylistModule,
    RankingModule,
    SearchModule,
    ComposerModule,
    ChartModule,
    CommentModule,
    TopTypeModule,
    NotificationModule,
    PaymentAuthModule,
    PaymentModule,
    // CompletePaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Thêm middleware
      .forRoutes("*"); // Áp dụng cho tất cả các routes
  }
}
