import { DataClass } from './data-class';

export class Pagination<T> extends DataClass<Pagination<T>> {
  items: T[] = [];
  meta: {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
  } = {
      totalItems: 0,
      itemCount: 0,
      itemsPerPage: 0,
      totalPages: 0,
      currentPage: 0,
    };
}
