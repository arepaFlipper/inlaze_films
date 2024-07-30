import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { MoviesModule } from './movies/movies.module';
import { FavoritesModule } from './favorites/favorites.module';
import { Movie } from './movies/entities/movie.entity';
import { Rating } from './movies/entities/rating.entity';
import { Favorite } from './favorites/entities/favorite.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [User, Movie, Rating, Favorite],
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
        };

        return dbConfig;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    FavoritesModule,
  ],
})
export class AppModule {}
