import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@flare/api/prisma';

@Injectable()
export class AuthService {
  failureCallBackUrl = `${this.config.get('FRONT_END_URL')}/auth/login/failure`;
  successCallBackUrl = `${this.config.get('FRONT_END_URL')}/auth/login/success`;

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      rejectOnNotFound: true,
    });
    const isMatching = await bcrypt.compare(password, user.password);
    if (isMatching) {
      return { toke: await this.generateAccessToken(user) };
    } else {
      throw new UnauthorizedException();
    }
  }

  async generateAccessToken(user: Partial<User>) {
    const payload = {
      username: user.email,
      sub: user.id,
      aud: 'flare-web',
      iss: 'flare',
    };
    return this.jwtService.sign(payload);
  }

  async handleSocialLogin(req: Request, res: Response) {
    console.info(req.user);
    if (!req.user) {
      res.redirect(this.failureCallBackUrl);
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { email: req.user.email },
    });
    if (user) {
      const accessToken = await this.generateAccessToken(user);
      res.redirect(
        `${this.successCallBackUrl}?code=SUCCESS&token=${accessToken}`
      );
      return;
    } else await this.signup(req, res);
  }

  private async signup(req: Request, res: Response) {
    const user: Prisma.UserCreateInput = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      image: req.user.image,
    };
    try {
      const userCreated = await this.prisma.user.create({
        data: user,
      });
      const accessToken = await this.generateAccessToken(userCreated);
      res.redirect(
        `${this.successCallBackUrl}?code=SUCCESS&token=${accessToken}`
      );
    } catch (error) {
      console.error(error);
      res.redirect(
        `${this.failureCallBackUrl}?code=ERROR&message=${error.message}`
      );
    }
  }
}