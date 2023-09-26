import { HttpParams } from '@angular/common/http';

export function objectToHttpParams(obj: Object): HttpParams {
  let params = new HttpParams();

  Object.entries(obj).forEach(([key, value]) => {
    params = params.append(key, String(value));
  });

  return params;
}
