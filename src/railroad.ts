export interface fun<a, b> { (a: a): b }

export interface Succes<a> {
  kind: 'succes'
  value: a
}

export interface Failure<e> {
  kind: 'failure'
  error: e
}

export type Result<a, e> = Succes<a> | Failure<e>

export const unit = <a>(a: a): Succes<a> => ({ kind: 'succes', value: a })
export const fail = <e>(e: e): Failure<e> => ({ kind: 'failure', error: e })

export const map = <a, b, e>(f: fun<a, b>): fun<Result<a, e>, Result<b, e>> => r =>
  r.kind == 'succes' ? unit(f(r.value)) : r

export const join = <a, e>(r: Result<Result<a, e>, e>): Result<a, e> =>
  r.kind == 'failure' ? r : r.value

export const then = <a, b, e>(f: fun<a, Result<b, e>>) => (r: Result<a, e>) =>
  join(map(f)(r))


export const railRoad = <a, e>(r: Result<a, e>) => ({
  map: <b>(f: (a: a) => b) => railRoad<b, e>(map<a, b, e>(f)(r)),
  then: <b>(f: (a: a) => Result<b, e>) => railRoad(then(f)(r))
})
