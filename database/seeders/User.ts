import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        fullname: 'admin admin',
        email: 'admin@yopmail.com',
        password: '123456',
      },
      {
        fullname: 'user user',
        email: 'user@yopmail.com',
        password: '123456',
      },
    ])
  }
}
