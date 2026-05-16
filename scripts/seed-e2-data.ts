#!/usr/bin/env node
/**
 * seed-e2-data.ts
 * Generates stub JSON files for E-2 programmatic SEO pages.
 * Idempotent — skips files that already exist.
 * Run: npx tsx scripts/seed-e2-data.ts
 */

import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

async function writeIfNotExists(filePath: string, content: object) {
  try {
    await fs.access(filePath)
    // File exists — skip
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, JSON.stringify(content, null, 2))
    console.log(`  Created: ${path.relative(ROOT, filePath)}`)
  }
}

// ─── Treaty Countries ─────────────────────────────────────────────────────────

const TREATY_COUNTRIES: Array<{
  slug: string
  name: string
  adjective: string
  treatyYear?: number
  visaValidity?: string
  annualIssuances?: number
  consulate?: string
}> = [
  { slug: 'japan', name: 'Japan', adjective: 'Japanese', treatyYear: 1953, visaValidity: '5 years', annualIssuances: 15367, consulate: 'U.S. Embassy Tokyo' },
  { slug: 'canada', name: 'Canada', adjective: 'Canadian', treatyYear: 1989, visaValidity: '5 years', annualIssuances: 6779, consulate: 'U.S. Consulate Toronto / Vancouver / Calgary' },
  { slug: 'south-korea', name: 'South Korea', adjective: 'Korean', treatyYear: 1956, visaValidity: '5 years', annualIssuances: 5359, consulate: 'U.S. Embassy Seoul' },
  { slug: 'germany', name: 'Germany', adjective: 'German', treatyYear: 1956, visaValidity: '5 years', annualIssuances: 3271, consulate: 'U.S. Embassy Berlin / U.S. Consulate Frankfurt' },
  { slug: 'france', name: 'France', adjective: 'French', treatyYear: 1960, visaValidity: '4 years', annualIssuances: 3574, consulate: 'U.S. Embassy Paris' },
  { slug: 'united-kingdom', name: 'United Kingdom', adjective: 'British', treatyYear: 1815, visaValidity: '5 years', annualIssuances: 2140, consulate: 'U.S. Embassy London' },
  { slug: 'taiwan', name: 'Taiwan', adjective: 'Taiwanese', treatyYear: 1948, visaValidity: '5 years', annualIssuances: 2137, consulate: 'American Institute in Taiwan (AIT), Taipei' },
  { slug: 'mexico', name: 'Mexico', adjective: 'Mexican', treatyYear: 1868, visaValidity: '1 year (renewable)', annualIssuances: 1739, consulate: 'U.S. Embassy Mexico City / multiple consulates' },
  { slug: 'italy', name: 'Italy', adjective: 'Italian', treatyYear: 1961, visaValidity: '5 years', annualIssuances: 1241, consulate: 'U.S. Embassy Rome' },
  { slug: 'spain', name: 'Spain', adjective: 'Spanish', treatyYear: 1903, visaValidity: '2 years', annualIssuances: 1438, consulate: 'U.S. Embassy Madrid' },
  { slug: 'turkey', name: 'Turkey', adjective: 'Turkish', treatyYear: 1930, visaValidity: '2 years', annualIssuances: 950, consulate: 'U.S. Embassy Ankara / U.S. Consulate Istanbul' },
  { slug: 'colombia', name: 'Colombia', adjective: 'Colombian', treatyYear: 1848, visaValidity: '2 years', annualIssuances: 623, consulate: 'U.S. Embassy Bogotá' },
  { slug: 'israel', name: 'Israel', adjective: 'Israeli', treatyYear: 2019, visaValidity: '3 months (renewable)', annualIssuances: 480, consulate: 'U.S. Embassy Jerusalem' },
  { slug: 'portugal', name: 'Portugal', adjective: 'Portuguese', treatyYear: 2025, visaValidity: '2 years', consulate: 'U.S. Embassy Lisbon' },
  { slug: 'australia', name: 'Australia', adjective: 'Australian', treatyYear: 1991, visaValidity: '4 years', annualIssuances: 1100, consulate: 'U.S. Embassy Canberra / U.S. Consulate Sydney' },
  { slug: 'argentina', name: 'Argentina', adjective: 'Argentine', treatyYear: 1853, visaValidity: '1 year', annualIssuances: 675, consulate: 'U.S. Embassy Buenos Aires' },
  { slug: 'netherlands', name: 'Netherlands', adjective: 'Dutch', treatyYear: 1956, visaValidity: '5 years', annualIssuances: 890, consulate: 'U.S. Embassy The Hague' },
  { slug: 'switzerland', name: 'Switzerland', adjective: 'Swiss', treatyYear: 1855, visaValidity: '5 years', annualIssuances: 720, consulate: 'U.S. Embassy Bern' },
  { slug: 'sweden', name: 'Sweden', adjective: 'Swedish', treatyYear: 1961, visaValidity: '5 years', annualIssuances: 560, consulate: 'U.S. Embassy Stockholm' },
  { slug: 'norway', name: 'Norway', adjective: 'Norwegian', treatyYear: 1961, visaValidity: '5 years', annualIssuances: 340, consulate: 'U.S. Embassy Oslo' },
  { slug: 'denmark', name: 'Denmark', adjective: 'Danish', treatyYear: 1961, visaValidity: '5 years', annualIssuances: 310, consulate: 'U.S. Embassy Copenhagen' },
  { slug: 'finland', name: 'Finland', adjective: 'Finnish', treatyYear: 1992, visaValidity: '5 years', annualIssuances: 220, consulate: 'U.S. Embassy Helsinki' },
  { slug: 'austria', name: 'Austria', adjective: 'Austrian', treatyYear: 1931, visaValidity: '5 years', annualIssuances: 410, consulate: 'U.S. Embassy Vienna' },
  { slug: 'belgium', name: 'Belgium', adjective: 'Belgian', treatyYear: 1961, visaValidity: '5 years', annualIssuances: 350, consulate: 'U.S. Embassy Brussels' },
  { slug: 'greece', name: 'Greece', adjective: 'Greek', treatyYear: 1954, visaValidity: '2 years', annualIssuances: 280, consulate: 'U.S. Embassy Athens' },
  { slug: 'poland', name: 'Poland', adjective: 'Polish', treatyYear: 1994, visaValidity: '2 years', annualIssuances: 390, consulate: 'U.S. Embassy Warsaw' },
  { slug: 'czech-republic', name: 'Czech Republic', adjective: 'Czech', treatyYear: 1993, visaValidity: '2 years', annualIssuances: 210, consulate: 'U.S. Embassy Prague' },
  { slug: 'hungary', name: 'Hungary', adjective: 'Hungarian', treatyYear: 1994, visaValidity: '2 years', annualIssuances: 180, consulate: 'U.S. Embassy Budapest' },
  { slug: 'romania', name: 'Romania', adjective: 'Romanian', treatyYear: 1994, visaValidity: '2 years', annualIssuances: 160, consulate: 'U.S. Embassy Bucharest' },
  { slug: 'slovakia', name: 'Slovakia', adjective: 'Slovak', treatyYear: 1993, visaValidity: '2 years', annualIssuances: 95, consulate: 'U.S. Embassy Bratislava' },
  { slug: 'ireland', name: 'Ireland', adjective: 'Irish', treatyYear: 1992, visaValidity: '5 years', annualIssuances: 430, consulate: 'U.S. Embassy Dublin' },
  { slug: 'new-zealand', name: 'New Zealand', adjective: 'New Zealand', treatyYear: 1991, visaValidity: '4 years', annualIssuances: 320, consulate: 'U.S. Embassy Wellington' },
  { slug: 'singapore', name: 'Singapore', adjective: 'Singaporean', treatyYear: 2004, visaValidity: '2 years', annualIssuances: 540, consulate: 'U.S. Embassy Singapore' },
  { slug: 'thailand', name: 'Thailand', adjective: 'Thai', treatyYear: 1968, visaValidity: '2 years', annualIssuances: 290, consulate: 'U.S. Embassy Bangkok' },
  { slug: 'philippines', name: 'Philippines', adjective: 'Filipino', treatyYear: 1955, visaValidity: '1 year', annualIssuances: 210, consulate: 'U.S. Embassy Manila' },
  { slug: 'indonesia', name: 'Indonesia', adjective: 'Indonesian', treatyYear: 1968, visaValidity: '2 years', annualIssuances: 150, consulate: 'U.S. Embassy Jakarta' },
  { slug: 'malaysia', name: 'Malaysia', adjective: 'Malaysian', treatyYear: 1966, visaValidity: '2 years', annualIssuances: 130, consulate: 'U.S. Embassy Kuala Lumpur' },
  { slug: 'chile', name: 'Chile', adjective: 'Chilean', treatyYear: 1871, visaValidity: '1 year', annualIssuances: 310, consulate: 'U.S. Embassy Santiago' },
  { slug: 'costa-rica', name: 'Costa Rica', adjective: 'Costa Rican', treatyYear: 1851, visaValidity: '1 year', annualIssuances: 175, consulate: 'U.S. Embassy San José' },
  { slug: 'ecuador', name: 'Ecuador', adjective: 'Ecuadorian', treatyYear: 1839, visaValidity: '1 year', annualIssuances: 140, consulate: 'U.S. Embassy Quito' },
  { slug: 'honduras', name: 'Honduras', adjective: 'Honduran', treatyYear: 1928, visaValidity: '1 year', annualIssuances: 90, consulate: 'U.S. Embassy Tegucigalpa' },
  { slug: 'panama', name: 'Panama', adjective: 'Panamanian', treatyYear: 1982, visaValidity: '2 years', annualIssuances: 120, consulate: 'U.S. Embassy Panama City' },
  { slug: 'paraguay', name: 'Paraguay', adjective: 'Paraguayan', treatyYear: 1860, visaValidity: '1 year', annualIssuances: 65, consulate: 'U.S. Embassy Asunción' },
  { slug: 'jamaica', name: 'Jamaica', adjective: 'Jamaican', treatyYear: 1997, visaValidity: '1 year', annualIssuances: 75, consulate: 'U.S. Embassy Kingston' },
  { slug: 'trinidad-and-tobago', name: 'Trinidad & Tobago', adjective: 'Trinidadian', treatyYear: 1996, visaValidity: '2 years', annualIssuances: 55, consulate: 'U.S. Embassy Port of Spain' },
  { slug: 'grenada', name: 'Grenada', adjective: 'Grenadian', treatyYear: 1989, visaValidity: '2 years', consulate: 'U.S. Embassy Bridgetown (Barbados)' },
  { slug: 'jordan', name: 'Jordan', adjective: 'Jordanian', treatyYear: 1985, visaValidity: '3 months', annualIssuances: 95, consulate: 'U.S. Embassy Amman' },
  { slug: 'egypt', name: 'Egypt', adjective: 'Egyptian', treatyYear: 1992, visaValidity: '3 months', annualIssuances: 110, consulate: 'U.S. Embassy Cairo' },
  { slug: 'morocco', name: 'Morocco', adjective: 'Moroccan', treatyYear: 1836, visaValidity: '3 months', annualIssuances: 85, consulate: 'U.S. Embassy Rabat' },
  { slug: 'ukraine', name: 'Ukraine', adjective: 'Ukrainian', treatyYear: 1996, visaValidity: '2 years', annualIssuances: 120, consulate: 'U.S. Embassy Kyiv' },
  { slug: 'georgia', name: 'Georgia', adjective: 'Georgian', treatyYear: 1997, visaValidity: '2 years', annualIssuances: 80, consulate: 'U.S. Embassy Tbilisi' },
  { slug: 'kazakhstan', name: 'Kazakhstan', adjective: 'Kazakhstani', treatyYear: 1994, visaValidity: '2 years', annualIssuances: 55, consulate: 'U.S. Embassy Nur-Sultan' },
  { slug: 'mongolia', name: 'Mongolia', adjective: 'Mongolian', treatyYear: 1997, visaValidity: '2 years', annualIssuances: 40, consulate: 'U.S. Embassy Ulaanbaatar' },
  { slug: 'ethiopia', name: 'Ethiopia', adjective: 'Ethiopian', treatyYear: 1953, visaValidity: '3 months', annualIssuances: 30, consulate: 'U.S. Embassy Addis Ababa' },
  { slug: 'cameroon', name: 'Cameroon', adjective: 'Cameroonian', treatyYear: 1989, visaValidity: '3 months', annualIssuances: 25, consulate: 'U.S. Embassy Yaoundé' },
  { slug: 'democratic-republic-of-congo', name: 'Democratic Republic of Congo', adjective: 'Congolese', treatyYear: 1989, visaValidity: '3 months', consulate: 'U.S. Embassy Kinshasa' },
  { slug: 'senegal', name: 'Senegal', adjective: 'Senegalese', treatyYear: 1990, visaValidity: '3 months', consulate: 'U.S. Embassy Dakar' },
  { slug: 'togo', name: 'Togo', adjective: 'Togolese', treatyYear: 1967, visaValidity: '3 months', consulate: 'U.S. Embassy Lomé' },
  { slug: 'tunisia', name: 'Tunisia', adjective: 'Tunisian', treatyYear: 1993, visaValidity: '3 months', consulate: 'U.S. Embassy Tunis' },
  { slug: 'albania', name: 'Albania', adjective: 'Albanian', treatyYear: 1998, visaValidity: '2 years', consulate: 'U.S. Embassy Tirana' },
  { slug: 'estonia', name: 'Estonia', adjective: 'Estonian', treatyYear: 1997, visaValidity: '5 years', consulate: 'U.S. Embassy Tallinn' },
  { slug: 'latvia', name: 'Latvia', adjective: 'Latvian', treatyYear: 1997, visaValidity: '5 years', consulate: 'U.S. Embassy Riga' },
  { slug: 'lithuania', name: 'Lithuania', adjective: 'Lithuanian', treatyYear: 2001, visaValidity: '5 years', consulate: 'U.S. Embassy Vilnius' },
  { slug: 'bulgaria', name: 'Bulgaria', adjective: 'Bulgarian', treatyYear: 1996, visaValidity: '2 years', consulate: 'U.S. Embassy Sofia' },
  { slug: 'croatia', name: 'Croatia', adjective: 'Croatian', treatyYear: 2001, visaValidity: '2 years', consulate: 'U.S. Embassy Zagreb' },
  { slug: 'kosovo', name: 'Kosovo', adjective: 'Kosovar', treatyYear: 2009, visaValidity: '2 years', consulate: 'U.S. Embassy Pristina' },
  { slug: 'north-macedonia', name: 'North Macedonia', adjective: 'Macedonian', treatyYear: 2000, visaValidity: '2 years', consulate: 'U.S. Embassy Skopje' },
  { slug: 'moldova', name: 'Moldova', adjective: 'Moldovan', treatyYear: 1995, visaValidity: '2 years', consulate: 'U.S. Embassy Chișinău' },
  { slug: 'suriname', name: 'Suriname', adjective: 'Surinamese', treatyYear: 1975, visaValidity: '2 years', consulate: 'U.S. Embassy Paramaribo' },
  { slug: 'haiti', name: 'Haiti', adjective: 'Haitian', treatyYear: 1984, visaValidity: '1 year', consulate: 'U.S. Embassy Port-au-Prince' },
  { slug: 'sri-lanka', name: 'Sri Lanka', adjective: 'Sri Lankan', treatyYear: 1993, visaValidity: '2 years', consulate: 'U.S. Embassy Colombo' },
  { slug: 'bangladesh', name: 'Bangladesh', adjective: 'Bangladeshi', treatyYear: 1989, visaValidity: '2 years', consulate: 'U.S. Embassy Dhaka' },
  { slug: 'iran', name: 'Iran', adjective: 'Iranian', treatyYear: 1955, visaValidity: 'Suspended (currently unavailable)', consulate: 'Swiss Embassy (protecting power)' },
  { slug: 'oman', name: 'Oman', adjective: 'Omani', treatyYear: 2009, visaValidity: '2 years', consulate: 'U.S. Embassy Muscat' },
  { slug: 'bahrain', name: 'Bahrain', adjective: 'Bahraini', treatyYear: 2004, visaValidity: '2 years', consulate: 'U.S. Embassy Manama' },
]

// ─── Non-Treaty Countries ─────────────────────────────────────────────────────

const NON_TREATY_COUNTRIES: Array<{
  slug: string
  name: string
  adjective: string
  primaryAlternative: string
}> = [
  { slug: 'india', name: 'India', adjective: 'Indian', primaryAlternative: 'EB-5 Investor Visa or O-1 Extraordinary Ability Visa' },
  { slug: 'china', name: 'China', adjective: 'Chinese', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'brazil', name: 'Brazil', adjective: 'Brazilian', primaryAlternative: 'EB-5 Investor Visa or O-1 Visa' },
  { slug: 'russia', name: 'Russia', adjective: 'Russian', primaryAlternative: 'EB-5 Investor Visa or dual citizenship strategy' },
  { slug: 'vietnam', name: 'Vietnam', adjective: 'Vietnamese', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'nigeria', name: 'Nigeria', adjective: 'Nigerian', primaryAlternative: 'EB-5 Investor Visa or O-1 Visa' },
  { slug: 'south-africa', name: 'South Africa', adjective: 'South African', primaryAlternative: 'EB-5 Investor Visa or O-1 Visa' },
  { slug: 'pakistan', name: 'Pakistan', adjective: 'Pakistani', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'ghana', name: 'Ghana', adjective: 'Ghanaian', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'kenya', name: 'Kenya', adjective: 'Kenyan', primaryAlternative: 'EB-5 Investor Visa or O-1 Visa' },
  { slug: 'peru', name: 'Peru', adjective: 'Peruvian', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'venezuela', name: 'Venezuela', adjective: 'Venezuelan', primaryAlternative: 'EB-5 Investor Visa or dual citizenship strategy' },
  { slug: 'algeria', name: 'Algeria', adjective: 'Algerian', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'saudi-arabia', name: 'Saudi Arabia', adjective: 'Saudi', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'uae', name: 'United Arab Emirates', adjective: 'Emirati', primaryAlternative: 'EB-5 Investor Visa or L-1 Visa' },
  { slug: 'kuwait', name: 'Kuwait', adjective: 'Kuwaiti', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'iraq', name: 'Iraq', adjective: 'Iraqi', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'nepal', name: 'Nepal', adjective: 'Nepali', primaryAlternative: 'EB-5 Investor Visa or O-1 Visa' },
  { slug: 'myanmar', name: 'Myanmar', adjective: 'Myanmar', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'cambodia', name: 'Cambodia', adjective: 'Cambodian', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'cuba', name: 'Cuba', adjective: 'Cuban', primaryAlternative: 'Other immigration pathways (see an attorney)' },
  { slug: 'bolivia', name: 'Bolivia', adjective: 'Bolivian', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'dominican-republic', name: 'Dominican Republic', adjective: 'Dominican', primaryAlternative: 'EB-5 Investor Visa' },
  { slug: 'guatemala', name: 'Guatemala', adjective: 'Guatemalan', primaryAlternative: 'EB-5 Investor Visa' },
]

// ─── Priority Cities ──────────────────────────────────────────────────────────

const CITIES: Array<{
  slug: string
  name: string
  state: string
  stateCode: string
}> = [
  { slug: 'seattle', name: 'Seattle', state: 'Washington', stateCode: 'WA' },
  { slug: 'new-york', name: 'New York City', state: 'New York', stateCode: 'NY' },
  { slug: 'los-angeles', name: 'Los Angeles', state: 'California', stateCode: 'CA' },
  { slug: 'miami', name: 'Miami', state: 'Florida', stateCode: 'FL' },
  { slug: 'san-francisco', name: 'San Francisco', state: 'California', stateCode: 'CA' },
  { slug: 'houston', name: 'Houston', state: 'Texas', stateCode: 'TX' },
  { slug: 'dallas', name: 'Dallas', state: 'Texas', stateCode: 'TX' },
  { slug: 'chicago', name: 'Chicago', state: 'Illinois', stateCode: 'IL' },
  { slug: 'las-vegas', name: 'Las Vegas', state: 'Nevada', stateCode: 'NV' },
  { slug: 'atlanta', name: 'Atlanta', state: 'Georgia', stateCode: 'GA' },
  { slug: 'austin', name: 'Austin', state: 'Texas', stateCode: 'TX' },
  { slug: 'boston', name: 'Boston', state: 'Massachusetts', stateCode: 'MA' },
  { slug: 'washington-dc', name: 'Washington D.C.', state: 'District of Columbia', stateCode: 'DC' },
  { slug: 'phoenix', name: 'Phoenix', state: 'Arizona', stateCode: 'AZ' },
  { slug: 'san-diego', name: 'San Diego', state: 'California', stateCode: 'CA' },
  { slug: 'denver', name: 'Denver', state: 'Colorado', stateCode: 'CO' },
  { slug: 'portland', name: 'Portland', state: 'Oregon', stateCode: 'OR' },
  { slug: 'nashville', name: 'Nashville', state: 'Tennessee', stateCode: 'TN' },
  { slug: 'orlando', name: 'Orlando', state: 'Florida', stateCode: 'FL' },
  { slug: 'minneapolis', name: 'Minneapolis', state: 'Minnesota', stateCode: 'MN' },
  { slug: 'detroit', name: 'Detroit', state: 'Michigan', stateCode: 'MI' },
  { slug: 'charlotte', name: 'Charlotte', state: 'North Carolina', stateCode: 'NC' },
  { slug: 'philadelphia', name: 'Philadelphia', state: 'Pennsylvania', stateCode: 'PA' },
  { slug: 'san-jose', name: 'San Jose', state: 'California', stateCode: 'CA' },
  { slug: 'salt-lake-city', name: 'Salt Lake City', state: 'Utah', stateCode: 'UT' },
  { slug: 'raleigh', name: 'Raleigh', state: 'North Carolina', stateCode: 'NC' },
  { slug: 'tampa', name: 'Tampa', state: 'Florida', stateCode: 'FL' },
  { slug: 'indianapolis', name: 'Indianapolis', state: 'Indiana', stateCode: 'IN' },
  { slug: 'columbus', name: 'Columbus', state: 'Ohio', stateCode: 'OH' },
  { slug: 'kansas-city', name: 'Kansas City', state: 'Missouri', stateCode: 'MO' },
  { slug: 'pittsburgh', name: 'Pittsburgh', state: 'Pennsylvania', stateCode: 'PA' },
  { slug: 'st-louis', name: 'St. Louis', state: 'Missouri', stateCode: 'MO' },
  { slug: 'cincinnati', name: 'Cincinnati', state: 'Ohio', stateCode: 'OH' },
  { slug: 'richmond', name: 'Richmond', state: 'Virginia', stateCode: 'VA' },
  { slug: 'sacramento', name: 'Sacramento', state: 'California', stateCode: 'CA' },
  { slug: 'memphis', name: 'Memphis', state: 'Tennessee', stateCode: 'TN' },
  { slug: 'new-orleans', name: 'New Orleans', state: 'Louisiana', stateCode: 'LA' },
  { slug: 'oklahoma-city', name: 'Oklahoma City', state: 'Oklahoma', stateCode: 'OK' },
  { slug: 'tucson', name: 'Tucson', state: 'Arizona', stateCode: 'AZ' },
  { slug: 'fresno', name: 'Fresno', state: 'California', stateCode: 'CA' },
  { slug: 'albuquerque', name: 'Albuquerque', state: 'New Mexico', stateCode: 'NM' },
  { slug: 'omaha', name: 'Omaha', state: 'Nebraska', stateCode: 'NE' },
  { slug: 'bakersfield', name: 'Bakersfield', state: 'California', stateCode: 'CA' },
  { slug: 'mesa', name: 'Mesa', state: 'Arizona', stateCode: 'AZ' },
  { slug: 'long-beach', name: 'Long Beach', state: 'California', stateCode: 'CA' },
  { slug: 'virginia-beach', name: 'Virginia Beach', state: 'Virginia', stateCode: 'VA' },
  { slug: 'colorado-springs', name: 'Colorado Springs', state: 'Colorado', stateCode: 'CO' },
  { slug: 'bellevue', name: 'Bellevue', state: 'Washington', stateCode: 'WA' },
  { slug: 'redmond', name: 'Redmond', state: 'Washington', stateCode: 'WA' },
  { slug: 'tacoma', name: 'Tacoma', state: 'Washington', stateCode: 'WA' },
  // State capitals not already listed
  { slug: 'juneau', name: 'Juneau', state: 'Alaska', stateCode: 'AK' },
  { slug: 'montgomery', name: 'Montgomery', state: 'Alabama', stateCode: 'AL' },
  { slug: 'little-rock', name: 'Little Rock', state: 'Arkansas', stateCode: 'AR' },
  { slug: 'hartford', name: 'Hartford', state: 'Connecticut', stateCode: 'CT' },
  { slug: 'dover', name: 'Dover', state: 'Delaware', stateCode: 'DE' },
  { slug: 'tallahassee', name: 'Tallahassee', state: 'Florida', stateCode: 'FL' },
  { slug: 'honolulu', name: 'Honolulu', state: 'Hawaii', stateCode: 'HI' },
  { slug: 'boise', name: 'Boise', state: 'Idaho', stateCode: 'ID' },
  { slug: 'springfield-il', name: 'Springfield', state: 'Illinois', stateCode: 'IL' },
  { slug: 'topeka', name: 'Topeka', state: 'Kansas', stateCode: 'KS' },
  { slug: 'frankfort', name: 'Frankfort', state: 'Kentucky', stateCode: 'KY' },
  { slug: 'baton-rouge', name: 'Baton Rouge', state: 'Louisiana', stateCode: 'LA' },
  { slug: 'augusta', name: 'Augusta', state: 'Maine', stateCode: 'ME' },
  { slug: 'annapolis', name: 'Annapolis', state: 'Maryland', stateCode: 'MD' },
  { slug: 'lansing', name: 'Lansing', state: 'Michigan', stateCode: 'MI' },
  { slug: 'st-paul', name: 'St. Paul', state: 'Minnesota', stateCode: 'MN' },
  { slug: 'jackson', name: 'Jackson', state: 'Mississippi', stateCode: 'MS' },
  { slug: 'helena', name: 'Helena', state: 'Montana', stateCode: 'MT' },
  { slug: 'lincoln', name: 'Lincoln', state: 'Nebraska', stateCode: 'NE' },
  { slug: 'carson-city', name: 'Carson City', state: 'Nevada', stateCode: 'NV' },
  { slug: 'concord', name: 'Concord', state: 'New Hampshire', stateCode: 'NH' },
  { slug: 'trenton', name: 'Trenton', state: 'New Jersey', stateCode: 'NJ' },
  { slug: 'santa-fe', name: 'Santa Fe', state: 'New Mexico', stateCode: 'NM' },
  { slug: 'albany', name: 'Albany', state: 'New York', stateCode: 'NY' },
  { slug: 'bismarck', name: 'Bismarck', state: 'North Dakota', stateCode: 'ND' },
  { slug: 'pierre', name: 'Pierre', state: 'South Dakota', stateCode: 'SD' },
  { slug: 'cheyenne', name: 'Cheyenne', state: 'Wyoming', stateCode: 'WY' },
  { slug: 'olympia', name: 'Olympia', state: 'Washington', stateCode: 'WA' },
  { slug: 'charleston-wv', name: 'Charleston', state: 'West Virginia', stateCode: 'WV' },
  { slug: 'madison', name: 'Madison', state: 'Wisconsin', stateCode: 'WI' },
]

// ─── Seed Functions ───────────────────────────────────────────────────────────

async function seedTreatyCountries() {
  console.log('\nSeeding treaty country files...')
  for (const c of TREATY_COUNTRIES) {
    const stub = {
      slug: c.slug,
      name: c.name,
      adjective: c.adjective,
      treatyYear: c.treatyYear || null,
      visaValidity: c.visaValidity || null,
      annualIssuances: c.annualIssuances || null,
      consulate: c.consulate || null,
      metaTitle: `E-2 Visa for ${c.adjective} Nationals | Watson Immigration Law`,
      metaDescription: `E-2 Treaty Investor Visa information for ${c.name} nationals. Treaty status, visa validity, investment requirements, and consulate processing guidance from Watson Immigration Law.`,
      h1: `E-2 Visa for ${c.adjective} Nationals`,
      intro: '',
      sections: [] as Array<{ heading: string; body: string }>,
      faqs: [] as Array<{ question: string; answer: string }>,
      relatedCountries: [] as Array<{ slug: string; adjective: string }>,
      relatedCities: [] as Array<{ slug: string; name: string }>,
    }
    const filePath = path.join(ROOT, 'content/e2/countries', `${c.slug}.json`)
    await writeIfNotExists(filePath, stub)
  }
}

async function seedNonTreatyCountries() {
  console.log('\nSeeding non-treaty country files...')
  for (const c of NON_TREATY_COUNTRIES) {
    const stub = {
      slug: c.slug,
      name: c.name,
      adjective: c.adjective,
      metaTitle: `E-2 Visa for ${c.adjective} Nationals — Not Eligible | Alternatives | Watson Immigration Law`,
      metaDescription: `${c.name} nationals cannot apply for the E-2 visa — there is no treaty between ${c.name} and the United States. Explore ${c.primaryAlternative} and other pathways.`,
      h1: `Can ${c.adjective} Nationals Apply for the E-2 Visa?`,
      intro: '',
      alternatives: [
        { visaType: 'EB-5 Investor Visa', description: 'Open to all nationalities. Requires a substantial investment ($800,000–$1,050,000 in a Targeted Employment Area). Leads directly to a green card.', href: '/visas/eb-5' },
        { visaType: 'O-1 Visa — Extraordinary Ability', description: 'For individuals with extraordinary ability or achievement in business, science, arts, or athletics. No investment required.', href: '/visas/o-1' },
        { visaType: 'L-1 Intracompany Transfer', description: 'Transfer from a foreign office or subsidiary to a U.S. branch. Requires an existing qualifying employer relationship.', href: '/visas/l-1' },
        { visaType: 'Dual Citizenship Strategy', description: 'Obtain citizenship in a treaty country (such as Grenada via CBI for ~$235,000) and then apply for the E-2 visa using that passport.', href: '/visas/e-2/guide/dual-citizenship' },
      ],
      faqs: [] as Array<{ question: string; answer: string }>,
      relatedPages: ['/visas/eb-5', '/visas/o-1', '/visas/l-1', '/visas/e-2/guide/dual-citizenship'],
    }
    const filePath = path.join(ROOT, 'content/e2/non-treaty', `${c.slug}.json`)
    await writeIfNotExists(filePath, stub)
  }
}

async function seedCities() {
  console.log('\nSeeding city files...')
  for (const c of CITIES) {
    const stub = {
      slug: c.slug,
      name: c.name,
      state: c.state,
      stateCode: c.stateCode,
      metaTitle: `E-2 Visa Attorney in ${c.name}, ${c.stateCode} | Watson Immigration Law`,
      metaDescription: `E-2 Treaty Investor Visa attorneys serving ${c.name}, ${c.state}. Expert guidance for international investors opening or acquiring businesses in ${c.name}.`,
      h1: `E-2 Treaty Investor Visa Attorney in ${c.name}, ${c.stateCode}`,
      intro: '',
      sections: [] as Array<{ heading: string; body: string }>,
      stateTax: '',
      uscisOffice: '',
      industries: [] as string[],
      topNationalities: [] as Array<{ slug: string; adjective: string }>,
      faqs: [] as Array<{ question: string; answer: string }>,
      relatedCities: [] as Array<{ slug: string; name: string }>,
    }
    const filePath = path.join(ROOT, 'content/e2/cities', `${c.slug}.json`)
    await writeIfNotExists(filePath, stub)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Seeding E-2 programmatic SEO data files...')
  console.log('(Skips files that already exist)')

  await seedTreatyCountries()
  await seedNonTreatyCountries()
  await seedCities()

  console.log('\nDone. Run `npm run build` to verify all routes resolve.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
