import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { App, applicationDefault, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { User, UserRepository } from 'src/domain';
import { In } from 'typeorm';

export interface PushBody {
    title: string;
    message: string;
}

@Injectable()
export class PushService implements OnApplicationBootstrap {
    private app: App;

    constructor(
        private userRepository: UserRepository,
    ) { }

    async onApplicationBootstrap() {
        this.app = initializeApp({
            credential: applicationDefault(),
            projectId: 'minha-cidade-f1a0b',
        });
    }

    async sendPush(body: PushBody, ids: User['id'][]) {
        console.log('Enviando push de solicitação atualizada')
        const users = await this.userRepository.find({ where: { id: In(ids) } })
        const tokens = users.map(u => u.fcmToken).filter(Boolean);

        for (const token of tokens) {
            const message = {
                notification: {
                    title: body.title,
                    body: body.message,
                },
                token,
            }
            getMessaging()
                .send(message)
                .then(
                    () => console.log('Push enviado ao token', token),
                    (error) => console.error('Push error ao token', token, error),
                )
        }
    }
}