import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class BooksController {
  public async create(ctx: HttpContextContract) {
    const newBookSchema = schema.create({
      name: schema.string(),
      isbn: schema.string.nullable(),
      year: schema.string.nullable(),
      author_id: schema.number(),
      publisher_id: schema.number(),
    })
    const payload = await ctx.request.validate({ schema: newBookSchema })
    try {
      const author = await Book.create(payload)
      return ctx.response.status(201).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async getAll(ctx: HttpContextContract) {
    const authors = await Book.all()
    return ctx.response.status(200).json({ code: 200, status: 'success', data: authors })
  }

  public async getById(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const author = await Book.findBy('id', id)
      return ctx.response.status(200).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update(ctx: HttpContextContract) {
    const newBookSchema = schema.create({
      name: schema.string(),
      isbn: schema.string.nullable(),
      year: schema.string.nullable(),
      author_id: schema.number(),
      publisher_id: schema.number(),
    })
    const payload = await ctx.request.validate({ schema: newBookSchema })
    const id = ctx.params.id
    try {
      const author = await Book.findBy('id', id)
      author?.merge(payload)

      await author?.save()

      return ctx.response.status(200).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async delete(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const author = await Book.findBy('id', id)
      await author?.delete()

      return ctx.response.status(200).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
}
