import {Injectable} from '@nestjs/common';
import {LoginInput} from './dto/login.input';
import * as bcrypt from 'bcrypt';
import {User} from '../user/entities/user.entity';
import {ConfigService} from '@nestjs/config';

import * as jwt from 'jsonwebtoken';
import {LoginResponse} from './dto/login-response';
import {UserRepository} from '../user/user.repository';
import {SignUpInput} from "./dto/signUp.input";
import {OrganisationService} from "../organisation/organisation.service";
import {Organisation} from "../organisation/entities/organisation.entity";
import {SmsService} from "../sms/sms.service";


@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private organisationService: OrganisationService,
        private readonly configService: ConfigService,
        private readonly smsService: SmsService
    ) {
    }

    async validateUser(loginInput: LoginInput) {
        const {email, password} = loginInput;
        const user = await this.userRepository.findOneByEmailWithOrganisation(email);
        if (!user) {
            throw new Error('User with this email does not exist');
        }
        const isMatch = await bcrypt.compare(password, user.user.password);
        if (!isMatch) {
            throw new Error('Password is invalid');
        }
        return user;
    }

    login(user: { user: User, organisation: Organisation }): LoginResponse {
        const payload = {
            sub: String(user.user.id),
            name: user.user.name,
            email: user.user.email,
            orgId: user.organisation.id,
        };
        return {
            access_token: jwt.sign(payload, this.configService.get('JWT_SECRET'), {
                expiresIn: '1d',
            }),
            refresh_token: jwt.sign(payload, this.configService.get('JWT_SECRET'), {
                expiresIn: '7d',
            }),
            user: {
                id: user.user.id,
                name: user.user.name,
                email: user.user.email,
                orgId: user.organisation.id,
            }
        };
    }

    /**
     * Signup a new user and encrypt the password
     * Signs the user up as an admin of a new organisation
     * @param payload
     */
    async signup(payload: SignUpInput) {
        const {email, password} = payload;
        const user = await this.userRepository.findOneByEmail(email);
        if (user) {
            throw new Error('User already exists, login instead');
        }

        const hash = await bcrypt.hash(password, 10); // Change to payload.password

        const organisation = await this.organisationService.create({name: payload.organisationName});
        const newUser = await this.userRepository.createUser({
            email: payload.email,
            password: hash,
            name: payload.firstName + ' ' + payload.lastName,
            organisationId: organisation.id,
        });
        return {
            access_token: jwt.sign(payload, this.configService.get('JWT_SECRET'), {
                expiresIn: '1d',
            }),
            refresh_token: jwt.sign(payload, this.configService.get('JWT_SECRET'), {
                expiresIn: '7d',
            }),
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            }
        };
    }

    async requestVerification(email: string) {
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            throw new Error('User with this email does not exist');
        }
        const result = await this.smsService.sendOtp(user.phone);
        return {
            msg: result.msg,
            phone: user.phone,
            email: user.email
        }
    }

    async verifyOTP(code: string, email: string) {
        const user = await this.userRepository.findOneByEmail(email);
        if (!user) {
            throw new Error('User with this email does not exist');
        }
        const result = await this.smsService.verifyOtp(user.phone, code);
        if (result.msg === "approved") {
            return {
                reset_password_token: jwt.sign({sub: user.id}, this.configService.get('JWT_SECRET'), {
                    expiresIn: '10m',
                })
            }
        } else {
            throw new Error('Invalid verification code');
        }
    }


    async resetPassword(token: string, password: string) {
        console.log(password);
        const decoded = jwt.verify(token, this.configService.get('JWT_SECRET'));
        const user = await this.userRepository.findOneById(decoded.sub as string);
        if (!user) {
            throw new Error('User with this email does not exist');
        }
        const hash = await bcrypt.hash(password, 10);
        await this.userRepository.updateUser(user.id, {password: hash});
        const userOrg = await this.userRepository.findOneByEmailWithOrganisation(user.email);
        return this.login({user: userOrg.user, organisation: userOrg.organisation});
    }
}
