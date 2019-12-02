# OpenWeatherMap Essentials
Receive only the essential data back from the OpenWeatherMap API.

```
Weather {
  cloudiness: 90,
  sun: { 
    rise: '7:07:21',
    set: '16:51: 6'
  },
  location: {
    city: 'San Francisco',
    country: 'US',
    timezone: -28800
  },
  temp: {
    current: 55.8,
    min: 51.8,
    max: 60.01
  },
  air: {
    humidity: 82,
    pressure: 1018
  },
  type: {
    description: 'Rain',
    detailedDescription: 'light rain'
  },
  wind: {
    direction: 'NE',
    speed: 3
  },
  zip: 94108,
  apiKey: 'YOUR_KEY_HERE',
  units: 'imperial'
}
```

## Getting Started
Create a new Weather object, passing in options in an object.

Options include `apiKey` (string), `zip` (number), and an optional `units` argument.

The `units` option accepts "imperial", "standard", or "metric" but will default to "imperial". 

`const weather = new Weather({ apiKey: 'YOUR_KEY_HERE', zip: 94108, units: 'imperial' })`

## Interpreting Data
### Cloudiness
`cloudiness` returns the percentage of cloudiness (number)
### Sun
`sun.rise` and `sun.set` return a formatted time string in the timezone local to the zip code (string)
### Location
`location.city` returns the city name belonging to the zip code (string)

`location.country` returns the country name belonging to the zip code (string)

`location.timezone` returns the millisecond offset between your computer's time and the time local to the zip code (number)
### Temp
`temp.current` returns the current temperature in the specified zip code (number)

`temp.min` returns the minimum temperature in the specified zip code (number)

`temp.max` returns the maximum temperature in the specified zip code (number)
### Air
`air.humidity` returns the humidity percentage in the zip code (number)

`air.pressure` returns the atmospheric pressure in the zip code in hPa (number)
### Type
`type.description` returns a short description of the weather in a zip code (string)

`type.detailedDescription` returns a long description of the weather in a zip code (string)
### Wind
`wind.direction` returns the direction the wind is blowing in a zip code (string)

`wind.speed` returns the speed the wind is blowing in a zip code (number)