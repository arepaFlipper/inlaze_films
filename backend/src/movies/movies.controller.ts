import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../users/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post(':id/rate')
  rateMovie(
    @GetUser() user: User,
    @Param('id') movieId: number,
    @Body('rating') rating: number,
  ) {
    return this.moviesService.rateMovie(user.id, movieId, rating);
  }

  @Get(':id/rating')
  getAverageRating(@Param('id') movieId: number) {
    return this.moviesService.getAverageRating(movieId);
  }

  @Post(':id/favorite')
  addToFavorites(@GetUser() user: User, @Param('id') movieId: number) {
    return this.moviesService.addToFavorites(user.id, movieId);
  }

  @Get('favorites')
  getFavorites(
    @GetUser() user: User,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.moviesService.getFavorites(user.id, page, limit);
  }

  @Get('recommendations')
  getRecommendations(@GetUser() user: User, @Query('limit') limit: number) {
    return this.moviesService.getRecommendations(user.id, limit);
  }
}
