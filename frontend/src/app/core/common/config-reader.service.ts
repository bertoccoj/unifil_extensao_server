import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Environment {

  static get apiUrl() {
    const url = '/api';
    return url.endsWith('/') ? url : url + '/';
  }

  static getApiUrl(...content: (string | number)[]) {
    return this.apiUrl + content.join('/');
  }

  static getPlainUrl(...content: (string | number)[]) {
    return '/' + content.join('/');
  }

}
