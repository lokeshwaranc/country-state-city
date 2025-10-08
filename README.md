🗺️ JSON to SQL Query Generator (Country, State, City)
This script converts country, state, and city data from JSON files into SQL INSERT statements.
It is based on the country-state-city npm package.

📦 Setup Instructions
1. Install Node.js and npm
Make sure you have Node.js and npm installed.
If not, install them using Homebrew:
bash brew install node
2. Copy Data Files
Download or copy the latest JSON data files from the assets directory of the country-state-city package.
Place these files in your project root directory:
countries.json
states.json
cities.json
3. Run the Script
Execute the script using Node:
bashnode app.js
This will generate three SQL files in your project directory:
countries.sql
states.sql
cities.sql

🧾 Example Output
Example: countries.sql
sqlINSERT INTO "countries" (
  "id", "name", "iso_code", "flag", "phone_code", "currency", "latitude", "longitude", "location", "timezones"
) VALUES
('c1d2e3f4-1234-5678-9101-abcdefabcdef', 'India', 'IN', '🇮🇳', '+91', 'INR', 20.5937, 78.9629, ST_MakePoint(78.9629, 20.5937)::geography, '[{"zoneName":"Asia/Kolkata","gmtOffset":19800,"abbreviation":"IST"}]'),
('a1b2c3d4-5678-1234-9101-fedcbaabcdef', 'United States', 'US', '🇺🇸', '+1', 'USD', 37.0902, -95.7129, ST_MakePoint(-95.7129, 37.0902)::geography, '[{"zoneName":"America/New_York","gmtOffset":-18000,"abbreviation":"EST"}]');
Example: states.sql
sqlINSERT INTO "states" (
  "id", "name", "iso_code", "country_id", "latitude", "longitude", "location"
) VALUES
('d8a3b2f1-2345-6789-9101-abcdefabcdef', 'Maharashtra', 'MH', 'c1d2e3f4-1234-5678-9101-abcdefabcdef', 19.7515, 75.7139, ST_MakePoint(75.7139, 19.7515)::geography);
Example: cities.sql
sqlINSERT INTO "cities" (
  "id", "state_id", "name", "country_code", "state_code", "latitude", "longitude", "location"
) VALUES
('f9e8d7c6-3456-7891-0123-abcdefabcdef', 'd8a3b2f1-2345-6789-9101-abcdefabcdef', 'Mumbai', 'IN', 'MH', 19.076, 72.8777, ST_MakePoint(72.8777, 19.076)::geography);

💡 Notes

The script automatically generates UUIDs for each record.
If latitude or longitude is missing, NULL is used instead of coordinates.
The location field uses PostgreSQL's geography type via ST_MakePoint(lon, lat).

RetryClaude can make mistakes. Please double-check responses.
