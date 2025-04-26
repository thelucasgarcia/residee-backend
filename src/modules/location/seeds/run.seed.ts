import { DataSource } from 'typeorm'
import { seedMaltaLocation } from './location/malta.seed'
import { dataSourceOptions } from '@/config/typeorm.config' // ou onde estiver sua config

const run = async () => {
  const dataSource = new DataSource(dataSourceOptions)

  await dataSource.initialize()
  console.log('📦 Database connected')

  await seedMaltaLocation(dataSource)

  await dataSource.destroy()
  console.log('✅ Seeding finalizado')
}

run().catch((err) => {
  console.error('❌ Seed error:', err)
  process.exit(1)
})
