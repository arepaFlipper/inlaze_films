import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import axios from 'axios';
import { CreateUserDto } from './dto/create-user.dto';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('fake_tmdb_api_key'), // Mock the TMDB API key
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and guest session', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
      };

      const user = new User();
      user.email = createUserDto.email;
      user.password = createUserDto.password;

      const savedUser = { ...user, id: 1 } as User;

      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(savedUser);

      const guestSessionResponse = {
        data: { guest_session_id: 'fake_guest_session_id' },
      };
      mockedAxios.get.mockResolvedValue(guestSessionResponse);

      const result = await service.create(createUserDto);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledTimes(2);
      expect(result.guestSessionId).toBe('fake_guest_session_id');
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=fake_tmdb_api_key',
        { headers: { accept: 'application/json' } },
      );
    });

    it('should throw an error if creating guest session fails', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
      };

      const user = new User();
      user.email = createUserDto.email;
      user.password = createUserDto.password;

      const savedUser = { ...user, id: 1 } as User;

      jest.spyOn(repository, 'create').mockReturnValue(user);
      jest.spyOn(repository, 'save').mockResolvedValue(savedUser);

      mockedAxios.get.mockRejectedValue(
        new Error('Failed to create guest session'),
      );

      await expect(service.create(createUserDto)).rejects.toThrow(
        'Failed to create guest session',
      );
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=fake_tmdb_api_key',
        { headers: { accept: 'application/json' } },
      );
    });
  });
});
