# Railroad Programming in TypeScript

**Failing as an art**

Many developers will agree that one of the hardest parts of programming is taking care of all potential outcomes. Task that sound trivial at first can have a wild variaty of cases to concern. Take for example the task of showing the name of an user on a website, based on a first- and lastname field. Is there a logged in user? Does the user have a name? How do we format the name? What to do if we one of the fields is empty? A possible implementation could look as follows:

```ts
const user = GetUser()
if(user == null) throw new Error('no user')
if(user.firstname && user.lastname) return `${user.firstname} ${user.lastname}`
if(user.firstname) return user.firstname
if(user.lastname) return user.lastname
return ''
```

Here we see that we have to check for `null` and empty strings. And whatever calls this function has to accoutn for both an `Error` and the posiblity of an empty string. This will lead to `try-catch` blocks and more if-statements. When seeing all of this one has to wonder if there is no better way of dealing with unhappy paths and the potential for invalid data.

## Failing is hard
Both all the different ways of representing the absence of data (e.g. `null`, `''`, `0`, `[]`, `undefined`)and the fact that you never no if a function is going to throw an error lead to a world in where we need a lot of boilerplaiting to deal with all the possible scenarios. 

What if there was only one way of failure and we didn't have to explity check after every step for it, but only if we actually process the result of the sequence of steps that make up a certain proccess. Something that would look like this:

```
GetUser
FormatName

if wasAllAGreatSucces doSomething()
else showError
```

## Consistantsy is key

One type for succes, one type for error

a function that can fail return is result inside this

Introudce the concept of building a proccess of those functions via composition

```ts
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
```

## Composing a proccess

composition of functions

```
DoThing -> validateEmpty -> SomeOtherThing -> validateEmpty -> ProcessY
```

validations in the pipeline with composition

## Monadic Implementation

the power of monads for boxing values with a certain behaviour

```ts
const unit = <a>(a:a): Succes<a> => ({kind: 'succes', value: a})
const fail = <e>(e:e): Failure<e> => ({kind: 'failure', error: e})

const map = <a,b, e>(f: fun<a, b>): fun<Result<a,e>, Result<b,e>> => r => 
  r.kind == 'succes' ? unit(f(r.value)) : fail(r.error)

const join = <a, e>(r:Result<Result<a, e>, e>): Result<a, e> => 
  r.kind == 'failure' ? r : r.value

const bind = <a, b, e>(f:fun<a, Result<b, e>>) => (r:Result<a, e>) => 
  join(map(f)(r))
```

## Common Helpers

making it practical

### Validation functions for composition with other api's

```ts
const validateEmpty = (s:string) => 
  s ? fail("empty string") : succes(s)
```

- try-catch
- validateTrue
- validateNotNull

come up with some great examples

put them early on

## Conclusion

FP is epic

Beter and more stable software





