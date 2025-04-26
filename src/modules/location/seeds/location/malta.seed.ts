import { DataSource } from 'typeorm'
import { Country } from '@/modules/location/entities/country.entity'
import { Region } from '@/modules/location/entities/region.entity'
import { Locality } from '@/modules/location/entities/locality.entity'

export const seedMaltaLocation = async (dataSource: DataSource) => {
  const countryRepo = dataSource.getRepository(Country)
  const regionRepo = dataSource.getRepository(Region)
  const localityRepo = dataSource.getRepository(Locality)

  const countryCurrent = "Malta"
  let country = await countryRepo.findOne({ where: { name: countryCurrent } })

  if (!country) {
    country = countryRepo.create({ name: countryCurrent })
    await countryRepo.save(country)
    console.log(`✅ Country '${countryCurrent}' created.`)
  } else {
    console.log(`ℹ️ Country '${countryCurrent}' already exists`)
  }

  const regionsData = {
    'North Region': [
      'Bugibba', 'Qawra', 'Mellieha', 'St Pauls Bay', 'Xemxija', 'Selmun', 'Manikata', 'Mgarr', 'Wardija'
    ],
    'South Region': [
      'Birzebbugia', 'Marsascala', 'Marsaxlokk', 'Zabbar', 'Zejtun', 'Zurrieq', 'Qrendi', 'Safi', 'Ghaxaq', 'Gudja'
    ],
    'East Region': [
      'Valletta', 'Sliema', 'St Julians', 'Paceville', 'Pembroke', 'Swieqi', 'Ta Monita', "Ta' Xbiex", 'Gzira', 'Kalkara', 'Floriana'
    ],
    'West Region': [
      'Dingli', 'Rabat', 'Mdina', 'Siggiewi', 'Buskett', 'Mtahleb', 'Mtarfa'
    ],
    'Central Region': [
      'Birkirkara', 'Balzan', 'Attard', 'Lija', 'Iklin', 'Naxxar', 'San Gwann', 'Hamrun', 'Santa Venera', 'Msida', 'Pieta', 'Qormi'
    ],
    'Gozo Region': [
      'Victoria', 'Xaghra', 'Xewkija', 'Sannat', 'Ghajnsielem', 'Nadur', 'Fontana', 'Gharb', 'Ghasri', 'Kercem', 'Munxar', 'Qala', 'San Lawrenz', 'Zebbug (Gozo)'
    ]
  }

  for (const [regionName, localities] of Object.entries(regionsData)) {
    let region = await regionRepo.findOne({ where: { name: regionName, country: { id: country.id } }, relations: ['country'] })
    if (!region) {
      region = regionRepo.create({ name: regionName, country: country })
      await regionRepo.save(region)
      console.log(`✅ Region '${regionName}' created.`)
    } else {
      console.log(`ℹ️ Region '${regionName}' already exists.`)
    }

    for (const localityName of localities) {
      const exists = await localityRepo.findOne({ where: { name: localityName, region: { id: region.id }, country: { id: country.id } }, relations: ['region', 'country'] })
      if (!exists) {
        await localityRepo.save({ name: localityName, region, country })
        console.log(` ✅ Locality '${localityName}' added.`)
      } else {
        console.log(` ℹ️ Locality '${localityName}' already exists.`)
      }
    }
  }

  console.log(`✅ ${countryCurrent} seed synced with updated regions and localities.`)
}
