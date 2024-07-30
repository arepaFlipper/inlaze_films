import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  private tmdbApiKey: string;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY');
  }

  async register(email: string, password: string) {
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password });
    await this.usersRepository.save(user);

    const guestSessionId = await this.createGuestSession();

    user.guestSessionId = guestSessionId;
    await this.usersRepository.save(user);
    console.log(`🎒%cauth.service.ts:42 - guestSessionId`,'font-weight:bold; background:#8a7500;color:#fff;'); //DELETEME:
    console.log(guestSessionId); // DELETEME:

    const verificationToken = await this.sendVerificationEmail(user);

    return {
      message: 'User registered successfully',
      verificationToken,
      guestSessionId,
    };
  }

  async sendVerificationEmail(user: User) {
    const token = this.jwtService.sign({ sub: user.id }, { expiresIn: '2d' });
    return token;
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      user.isVerified = true;
      await this.usersRepository.save(user);
      return { message: 'Email verified successfully' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async createGuestSession(): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.tmdbApiKey}`,
        { headers: { accept: 'application/json' } },
      );
      console.log(`🛵%cauth.service.ts:114 - response.data`,'font-weight:bold; background:#c63900;color:#fff;'); //DELETEME:
      console.log(response.data); // DELETEME:
      return response.data.guest_session_id;
    } catch (error) {
      throw new Error('Failed to create guest session');
    }
  }
}
