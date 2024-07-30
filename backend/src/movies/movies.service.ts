import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async rateMovie(
    userId: number,
    movieId: number,
    value: number,
  ): Promise<Rating> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    if (!user || !movie) {
      throw new NotFoundException('User or movie not found');
    }

    let rating = await this.ratingRepository.findOne({
      where: { user, movie },
    });

    if (rating) {
      rating.value = value;
    } else {
      rating = this.ratingRepository.create({ user, movie, value });
    }

    return this.ratingRepository.save(rating);
  }

  async getAverageRating(movieId: number): Promise<number> {
    const result = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.movieId = : movieId', { movieId })
      .select('AVG(rating.value)', 'average')
      .getRawOne();

    return result ? parseFloat(result.average) : 0;
  }

  async addToFavorites(userId: number, movieId: number): Promise<Favorite> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const movie = await this.movieRepository.findOne({
      where: { id: userId },
    });

    if (!user || !movie) {
      throw new NotFoundException('User or movie not found');
    }

    let favorite = await this.favoriteRepository.findOne({where: { user, movie }});

    if (!favorite){
      favorite = this.favoriteRepository.create({user, movie});
      return this.favoriteRepository.save(favorite);
    }

    return favorite;
  }

  async getFavorites(userId: number, page: number = 1, limit: number = 10): Promise<{ favorites: Favorite[], total: number }> {
    const [favorites, total] = await this.favoriteRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['movie'],
      skip: (page - 1 ) * limit,
      take: limit,
    });
    return { favorites, total };
  }

  async getRecommendations(userId: number, limit: number = 5): Promise<Movie[]> {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'],
    });

    const favoriteGenres = favorites.map((fav) => fav.movie.genre);

    return this.movieRepository
      .createQueryBuilder('movie')
      .where('movie.genre IN (:...genres)', { genres: favoriteGenres })
      .andWhere('movie.id NOT IN (:...favoriteIds)', {
        favoriteIds: favorites.map((fav) => fav.movie.id),
      })
      .orderBy('RANDOM()')
      .limit(limit)
      .getMany();
  }
}
