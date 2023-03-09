import { PrismaClient } from "@prisma/client"
import { createPassword, loginUser, signUpUser } from "../src/server/schema/User/helpers/authentication"


const prisma = new PrismaClient()


test("pass hash", async () => {
    const inputedPassword = 'hello'
    const generatedPassword = await createPassword(inputedPassword)
    expect(generatedPassword).not.toBe(inputedPassword)
})


test("signup authenicator", async () => {
    await prisma.user.delete({ where: { username: 'john123' } })
    const signedUp = await signUpUser(prisma, {
        name: 'john',
        password: 'test',
        email: 'john123@john.john',
        username: 'john123'
    })
    expect(signedUp).toBe(true)
})

test("login authenicator incorrect username", async () => {
    await prisma.user.delete({ where: { username: 'john123' } })
    await signUpUser(prisma, {
        name: 'john',
        password: 'test',
        email: 'john123@john.john',
        username: 'john123'
    })

   const token = await loginUser(prisma, {
        password: 'test',
        username: 'john1234'
    })
    expect(token).toBe(null)
})

test("login authenicator correct username", async () => {
    await prisma.user.delete({ where: { username: 'john123' } })
    await signUpUser(prisma, {
        name: 'john',
        password: 'test',
        email: 'john123@john.john',
        username: 'john123'
    })

   const token = await loginUser(prisma, {
        password: 'test',
        username: 'john123'
    })
    expect(token).not.toBe(null)
})
