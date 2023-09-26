import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FSystem } from '../../core/file/file-system';
import { CidadeRepository } from '../../domain/localizacao/cidade';
import { EstadoRepository } from '../../domain/localizacao/estado';
import { Environment } from './../../core/constants/environment';

interface JsonCidades {
    country_name: string;
    country_id: string;
    provinces: {
        province_name: string;
        cities: {
            city_name: string;
        }[];
    }[];
}

@Injectable()
export class ImportadorDeCidades implements OnApplicationBootstrap {
    constructor(
        private cidadesRepository: CidadeRepository,
        private estadosRepository: EstadoRepository,
        private fs: FSystem,
    ) { }

    async onApplicationBootstrap() {
        return;
        const json = await this.fs.readFromJson<JsonCidades>(Environment.jsonCidades);
        for (const estado of json.provinces) {
            let salvo = await this.estadosRepository.findOneBy({ nome: estado.province_name });
            console.info('Mapeando estado: ', estado.province_name);
            const cityCount = await this.cidadesRepository.count({ where: { estado: salvo } });
            if (cityCount === estado.cities.length) {
                continue;
            }
            if (!salvo) {
                salvo = await this.estadosRepository.save({ nome: estado.province_name })
            }
            for (const cidade of estado.cities) {
                console.info('Mapeando cidade: ', cidade.city_name);
                let salva = await this.cidadesRepository.findOneBy({ nome: cidade.city_name });
                if (!salva) {
                    salva = await this.cidadesRepository.save({ nome: cidade.city_name, estado: salvo })
                }
            }
        }
    }

}