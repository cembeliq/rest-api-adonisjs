import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publisher from 'App/Models/Publisher'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PublishersController {
  public async create(ctx: HttpContextContract) {
    const newPublisherSchema = schema.create({
      name: schema.string(),
      city: schema.string.nullable(),
    })
    const payload = await ctx.request.validate({ schema: newPublisherSchema })
    try {
      const publisher = await Publisher.create(payload)
      return ctx.response.status(201).json({ code: 200, status: 'success', data: publisher })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async getAll(ctx: HttpContextContract) {
    const publishers = await Publisher.all()
    return ctx.response.status(200).json({ code: 200, status: 'success', data: publishers })
  }

  public async getById(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const publisher = await Publisher.findBy('id', id)
      return ctx.response.status(200).json({ code: 200, status: 'success', data: publisher })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update(ctx: HttpContextContract) {
    const newPublisherSchema = schema.create({
      name: schema.string(),
      city: schema.string.nullable(),
    })
    const payload = await ctx.request.validate({ schema: newPublisherSchema })
    const id = ctx.params.id
    try {
      const publisher = await Publisher.findBy('id', id)
      publisher?.merge(payload)

      await publisher?.save()

      return ctx.response.status(200).json({ code: 200, status: 'success', data: publisher })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async delete(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const publisher = await Publisher.findBy('id', id)
      await publisher?.delete()

      return ctx.response.status(200).json({ code: 200, status: 'success', data: publisher })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
}
