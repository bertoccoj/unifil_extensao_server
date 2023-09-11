import { Repository } from 'typeorm';

export type EntityAndRepository<T = any> = [Constructor<T>, Constructor<(Repository<T>)> | AbstractConstructor<Repository<T>>];
