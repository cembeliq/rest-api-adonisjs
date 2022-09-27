import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import UserRole from 'App/Models/UserRole'

export default class UsersController {
  public async create(ctx: HttpContextContract) {
    const newUserSchema = schema.create({
      fullname: schema.string(),
      email: schema.string({}, [rules.email()]),
      password: schema.string(),
      role_id: schema.number(),
    })
    const payload = await ctx.request.validate({ schema: newUserSchema })
    try {
      const user = await User.create({
        fullname: payload.fullname,
        email: payload.email,
        password: payload.password,
      })

      const userRole = await UserRole.create({ user_id: user.id, role_id: payload.role_id })

      const data = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role_id: userRole.role_id,
      }
      return ctx.response.status(201).json({ code: 201, status: 'success', data: data })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async getAll(ctx: HttpContextContract) {
    const authors = await User.all()
    return ctx.response.status(200).json({ code: 200, status: 'success', data: authors })
  }

  public async getById(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const user = await User.findBy('id', id)
      return ctx.response.status(200).json({ code: 200, status: 'success', data: user })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update(ctx: HttpContextContract) {
    const newUserSchema = schema.create({
      fullname: schema.string(),
      email: schema.string(),
      password: schema.string(),
    })
    const payload = await ctx.request.validate({ schema: newUserSchema })
    const id = ctx.params.id
    try {
      const user = await User.findBy('id', id)
      user?.merge(payload)

      await user?.save()

      const data = {
        id: user?.id,
        fullname: user?.fullname,
        email: user?.email,
      }
      return ctx.response.status(200).json({ code: 200, status: 'success', data: data })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async delete(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const user = await User.findBy('id', id)
      await user?.delete()

      return ctx.response.status(200).json({ code: 200, status: 'success', data: user })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
}
