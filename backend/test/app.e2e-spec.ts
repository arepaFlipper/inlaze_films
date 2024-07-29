import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
    await app.close();
  });

  it('/auth/register (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201);

    expect(response.body).toEqual({
      message: 'User registered successfully',
    });
  });

  it('/auth/register (POST) - conflict', async () => {
    // First, register the user
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'duplicate@example.com', password: 'password123' })
      .expect(201);

    // Try to register the same user again
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'duplicate@example.com', password: 'password123' })
      .expect(409);

    expect(response.body.message).toBe('Email already exists');
  });
});
