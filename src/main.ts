interface fun<a, b> {
  (a:a): b
}

interface Succes<a> {
  kind: 'succes'
  value: a
}

interface Failure<e> {
  kind: 'failure'
  error: e
}

type Result<a, e> = Succes<a> | Failure<e>

const unit = <a>(a:a): Succes<a> => ({kind: 'succes', value: a})
const fail = <e>(e:e): Failure<e> => ({kind: 'failure', error: e})

const x: Result<string, Error> = unit("asd")

const map = <a,b, e>(f: fun<a, b>): fun<Result<a,e>, Result<b,e>> => r => 
  r.kind == 'succes' ? unit(f(r.value)) : fail(r.error)

const join = <a, e>(r:Result<Result<a, e>, e>): Result<a, e> => 
  r.kind == 'failure' ? r : r.value

const bind = <a, b, e>(f:fun<a, Result<b, e>>) => (r:Result<a, e>) => 
  join(map(f)(r))



  