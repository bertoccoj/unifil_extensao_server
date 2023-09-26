import { Either } from 'fp-ts/lib/Either';
import { map } from 'rxjs/operators';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function'

export function mapEither<Left, Right, LResult, RResult>(
    left: (l: Left) => LResult,
    right: (r: Right) => RResult,
) {
    return map(
        (either: Either<Left, Right>) => pipe(
            either,
            E.foldW(
                (l: Left) => left(l),
                (r: Right) => right(r),
            )
        ),
    );
}