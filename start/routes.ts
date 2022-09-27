/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('login', 'AuthController.login')

  Route.group(() => {
    Route.post('user', 'UsersController.create')
    Route.get('user', 'UsersController.getAll')
    Route.get('user/:id', 'UsersController.getById')
    Route.put('user/:id', 'UsersController.update')
    Route.delete('user/:id', 'UsersController.delete')

    Route.post('author', 'AuthorsController.create')
    Route.get('author', 'AuthorsController.getAll')
    Route.get('author/:id', 'AuthorsController.getById')
    Route.put('author/:id', 'AuthorsController.update')
    Route.delete('author/:id', 'AuthorsController.delete')

    Route.post('publisher', 'PublishersController.create')
    Route.get('publisher', 'PublishersController.getAll')
    Route.get('publisher/:id', 'PublishersController.getById')
    Route.put('publisher/:id', 'PublishersController.update')
    Route.delete('publisher/:id', 'PublishersController.delete')

    Route.post('book', 'BooksController.create')
    Route.get('book', 'BooksController.getAll')
    Route.get('book/:id', 'BooksController.getById')
    Route.put('book/:id', 'BooksController.update')
    Route.delete('book/:id', 'BooksController.delete')
  }).middleware('auth:api')
}).prefix('/api/v1')
