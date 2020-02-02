import { Result, fail, unit, map, then } from "./railroad"

type User = { firstname: string, lastname: string }

const getUser = (): Result<User, 'no-user'> => fail('no-user')

const formatName = (u: User): Result<string, 'no-name'> => {
  if (u.firstname && u.lastname) return unit(`${u.firstname} ${u.lastname}`)
  return fail('no-name')
}
const renderUser = (): Result<string, 'no-user'| 'no-name'> => {
  const user = getUser()
  if (user.kind == 'failure') return user
  return formatName(user.value)
}

const renderUser1 = () => then<User, string, 'no-name'|'no-user'>(formatName)(getUser())

const greet = (name: string) => `hello ${name}`

const greetUser = () =>  map(greet)(renderUser())