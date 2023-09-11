import { Module } from '@nestjs/common';
import { FSystem } from './file/file-system';

const providers = [
    FSystem,
];

@Module({
    providers: [...providers],
    exports: [...providers]
})
export class CommonModule { }
