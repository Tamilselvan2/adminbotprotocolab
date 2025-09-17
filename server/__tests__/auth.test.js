const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { expect } = require('chai');
const authRouter = require('../routes/auth');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('should not register a user with an existing email', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    const res = await request(app).post('/api/auth/register').send({
      name: 'Another User',
      email: 'test@example.com',
      password: 'password456',
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.msg).to.equal('User already exists');
  });

  it('should login an existing user', async () => {
    await request(app).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).to.equal(400);
    expect(res.body.msg).to.equal('Invalid credentials');
  });
});
