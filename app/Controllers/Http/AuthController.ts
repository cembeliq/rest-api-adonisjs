import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const newLoginSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
    })
    const payload = await ctx.request.validate({ schema: newLoginSchema })

    // Lookup user manually
    const user = await User.query().where('email', payload.email).firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, payload.password))) {
      return ctx.response.unauthorized('Invalid credentials')
    }

    // Generate token
    const token = await ctx.auth.use('api').generate(user)
    return ctx.response.status(200).json({ code: 200, status: 'success', data: token })
  }
}
