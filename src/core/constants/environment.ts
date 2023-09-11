import * as dotenv from 'dotenv';
dotenv.config({
    override: true,
});

export class Environment {
    static nestJsPort = process.env['NESTJS_PORT']
    static fotoSolicitacaoFolder = process.env['ROOT'] + '/fotos';
    static jsonCidades = process.env['ROOT'] + '/cities.json';
    static postgres = {
        host: process.env['POSTGRES_HOST'],
        port: Number(process.env['POSTGRES_PORT']),
        database: process.env['POSTGRES_DATABASE'],
        username: process.env['POSTGRES_USERNAME'],
        password: process.env['POSTGRES_PASSWORD'],
    };
    static bcryptSaltRounds = Number(process.env['BCRYPT_SALT_ROUNDS']) ?? 10;
    static jwt = {
        secret: process.env['JWT_SECRET'] ?? 'abc',
        expirationTime: process.env['JWT_EXPIRATION_TIME'] ?? 3000000,
    };
}
