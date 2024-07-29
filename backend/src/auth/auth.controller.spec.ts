import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            verifyEmail: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const result = { message: 'User registered successfully' };
      const registerDto: LoginUserDto = { email: 'test@example.com', password: 'password123' };
      
      jest.spyOn(authService, 'register').mockImplementation(async () => result);

      expect(await controller.register(registerDto)).toBe(result);
      expect(authService.register).toHaveBeenCalledWith(registerDto.email, registerDto.password);
    });

    it('should throw a conflict exception if email already exists', async () => {
      const registerDto: LoginUserDto = { email: 'duplicate@example.com', password: 'password123' };
      
      jest.spyOn(authService, 'register').mockImplementation(() => {
        throw new ConflictException('Email already exists');
      });

      await expect(controller.register(registerDto)).rejects.toThrow(ConflictException);
      expect(authService.register).toHaveBeenCalledWith(registerDto.email, registerDto.password);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email successfully', async () => {
      const result = { message: 'Email verified successfully' };
      const token = 'valid-token';
      
      jest.spyOn(authService, 'verifyEmail').mockImplementation(async () => result);

      expect(await controller.verifyEmail(token)).toBe(result);
      expect(authService.verifyEmail).toHaveBeenCalledWith(token);
    });

    it('should throw an unauthorized exception for invalid or expired token', async () => {
      const token = 'invalid-token';
      
      jest.spyOn(authService, 'verifyEmail').mockImplementation(() => {
        throw new UnauthorizedException('Invalid or expired token');
      });

      await expect(controller.verifyEmail(token)).rejects.toThrow(UnauthorizedException);
      expect(authService.verifyEmail).toHaveBeenCalledWith(token);
    });
  });
});

