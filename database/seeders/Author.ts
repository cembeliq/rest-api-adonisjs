import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Author from 'App/Models/Author'

export default class extends BaseSeeder {
  public async run() {
    await Author.createMany([
      {
        name: 'john',
        address: 'karang sawit',
      },
      {
        name: 'kennedy',
        address: 'rawa bolong',
      },
    ])
  }
}
