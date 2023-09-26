import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authSercie: NbAuthService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authSercie.getToken().pipe(
            take(1),
            map((token) => {
                let request = req;

                if (token.isValid()) {
                    request = req.clone({
                        setHeaders: {
                            Authorization: 'Bearer ' + token.getValue(),
                        },
                    })
                };
                return request;
            }),
            switchMap((request) => next.handle(request)),
        );
    }
}