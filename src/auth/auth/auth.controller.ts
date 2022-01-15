import { RoleGuard } from './../role.guard';
import { JwtGuard } from './jwt.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '../role.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body) {
    return { token: this.authService.login(body.username, body.password) };
  }


  @UseGuards(JwtGuard, RoleGuard)
  @Role('user')
  @UseGuards(JwtGuard, RoleGuard)
  @Get('test-auth')
  test(@Req() req) {
    console.log(req.user);
    return {
      // name1: 'Luiz Carlos',
      name: req.user.name
    };
  }

    // @UseGuards(JwtGuard, RoleGuard)
    @Role('user')
    @UseGuards(JwtGuard, RoleGuard)
    @Get('login')
    login1(@Req() req) {
      console.log(req.user);
      return {
        name: 'Luiz Carlos',
      };
    }

    @UseGuards(JwtGuard)
    @Get('user')
    user(@Req() req) {
      console.log(req.user);
      return req.user;
    }

}
