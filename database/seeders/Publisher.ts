import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Publisher from 'App/Models/Publisher'

export default class extends BaseSeeder {
  public async run() {
    await Publisher.createMany([
      {
        name: 'informatika',
        city: 'rembang',
      },
      {
        name: 'gramedia',
        city: 'sulang',
      },
    ])
  }
}
