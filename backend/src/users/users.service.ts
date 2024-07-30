import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly tmdbApiKey: string;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    try {
      const guestSession = await this.createGuestSession(); // TODO:
      savedUser.guestSessionId = guestSession.guest_session_id; // TODO:
      await this.usersRepository.save(savedUser);
    } catch (error) {
      throw new HttpException(
        'Failed to create guest session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return savedUser;
  }

  async findOne(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  private async createGuestSession(): Promise<{ guest_session_id: string }> {
    const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.tmdbApiKey}`;
    try {
      const response: AxiosResponse<{ guest_session_id: string }> =
        await axios.get(url, {
          headers: {
            accept: 'application/json',
          },
        });
      console.log(response); // DELETEME:
      console.log(response.data); // DELETEME:
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to create guest session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
