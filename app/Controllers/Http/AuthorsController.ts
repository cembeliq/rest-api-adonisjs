import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Author'

export default class AuthorsController {
  public async create(ctx: HttpContextContract) {
    const input = ctx.request.only(['name', 'address'])
    try {
      const author = await Author.create(input)
      return ctx.response.status(200).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async getAll(ctx: HttpContextContract) {
    const authors = await Author.all()
    return ctx.response.status(200).json({ code: 200, status: 'success', data: authors })
  }

  public async getById(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const author = await Author.findBy('id', id)
      return ctx.response.status(200).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update(ctx: HttpContextContract) {
    const input = ctx.request.only(['name', 'address'])
    const id = ctx.params.id
    try {
      const author = await Author.findBy('id', id)
      author?.merge(input)

      await author?.save()

      return ctx.response.status(200).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async delete(ctx: HttpContextContract) {
    const id = ctx.params.id
    try {
      const author = await Author.findBy('id', id)
      await author?.delete()

      return ctx.response.status(200).json({ code: 200, status: 'success', data: author })
    } catch (err) {
      return ctx.response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
}
