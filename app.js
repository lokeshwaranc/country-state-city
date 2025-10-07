const fs = require('fs');

// Step 1. Read JSON files
const countries = JSON.parse(fs.readFileSync('./countries.json', 'utf-8'));
const states = JSON.parse(fs.readFileSync('./states.json', 'utf-8'));
const cities = JSON.parse(fs.readFileSync('./cities.json', 'utf-8'));

// Step 2. Define which country ISO codes you want
const targetCountries = [
  "IN", "US", "GB", "CA", "AU", "DE", "FR", "NL",
  "CH", "SG", "AE", "NZ", "SE", "NO", "DK", "ES",
  "IT", "JP", "KR", "BR", "MX", "IE", "BE", "AT",
  "TH", "ID", "MY", "HK", "IL", "PT", "PL", "CZ",
  "ZA", "CN", "AR", "CL", "GR", "TR", "FI", "PH"
];
// Step 3. Filter by ISO code
const filteredCountries = countries.filter(c => targetCountries.includes(c.isoCode));
const filteredStates = states.filter(s => targetCountries.includes(s.countryCode));
const filteredCities = cities.filter(c => targetCountries.includes(c[1]));

const esc = (val) => {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  return `'${String(val).replace(/'/g, "''")}'`;
};

// Step 4. Generate SQL
let sql = "";

// --- Countries ---
if (filteredCountries.length > 0) {
  const countryValues = filteredCountries.map(c => {
    const timezones = JSON.stringify(c.timezones || []).replace(/'/g, "''");
    return `(${[
      esc(c.name),
      esc(c.isoCode),
      esc(c.flag),
      esc(c.phonecode),
      esc(c.currency),
      esc(c.latitude),
      esc(c.longitude),
      esc(timezones)
    ].join(', ')})`;
  }).join(',\n');
    const countrySQL = `INSERT INTO countries (
    name, iso_code, flag, phone_code, currency, latitude, longitude, timezones
  ) VALUES
  ${countryValues};
`;
fs.writeFileSync('countries.sql', countrySQL);
  console.log(`✅ Wrote ${filteredCountries.length} countries to countries.sql`);
}

// --- States ---
if (filteredStates.length > 0) {
  const stateValues = filteredStates.map(s => `(${[
    esc(s.name),
    esc(s.isoCode),
    esc(s.countryCode),
    esc(s.latitude),
    esc(s.longitude)
  ].join(', ')})`).join(',\n');

  const stateSQL = `INSERT INTO states (
    name, iso_code, country_code, latitude, longitude
  ) VALUES
  ${stateValues};
`;
fs.writeFileSync('states.sql', stateSQL);
console.log(`✅ Wrote ${filteredStates.length} states to states.sql`);
}

// --- Cities ---
if (filteredCities.length > 0) {
  const cityValues = filteredCities.map(c => {
    const [name, countryCode, stateCode, latitude, longitude] = c;
    return `(${[
      esc(name),
      esc(countryCode),
      esc(stateCode),
      esc(latitude),
      esc(longitude)
    ].join(', ')})`;
  }).join(',\n');

  const citySQL = `INSERT INTO cities (
    name, country_code, state_code, latitude, longitude
  ) VALUES
  ${cityValues};
  
`;
fs.writeFileSync('cities.sql', citySQL);
console.log(`✅ Wrote ${filteredCities.length} cities to cities.sql`);
}
