import { Injectable, OnModuleInit } from '@nestjs/common';
import geocoder, { AddressObject } from 'local-reverse-geocoder';

export interface LookUpResult {
    cityName: string;
}

@Injectable()
export class Geocoder implements OnModuleInit {

    async onModuleInit() {
        await new Promise<void>((resolve) => {
            geocoder.init({
                countries: ['BR'],
            }, () => resolve());
        })
    }

    lookUp(latitude: number, longitude: number) {
        return new Promise<LookUpResult>((resolve, reject) => {
            geocoder.lookUp({ latitude, longitude }, 1, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    const cityResult = result[0]?.[0];
                    resolve({
                        cityName: cityResult.asciiName,
                    });
                }
            });
        });
    }
}