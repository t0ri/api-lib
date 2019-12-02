var fetching = require('node-fetch')

// TypeScript Type Declaration
interface Options {
  apiKey: string,
  zip: number,
  units?: string,
}

interface Air {
  humidity: number,
  pressure: number,
}

interface Type {
  description: string,
  detailedDescription: string,
}

interface Wind {
  direction: string,
  speed: number,
}

interface Location {
  city: string,
  country: string,
  timezone: number,
}

interface Temp {
  current: number,
  min: number,
  max: number,
}

interface Sun {
  rise: string,
  set: string,
}

export default class Weather {
  // TypeScript Type Declaration
  zip: number
  apiKey: string
  units: string
  cloudiness: number
  sun: object
  location: object
  temp: object
  air: object
  type: object
  wind: object
  err: string


  constructor(options?: Options) {
    // Weather Data Properties
    this.cloudiness = undefined
    this.sun = undefined
    this.location = undefined
    this.temp = undefined
    this.air = undefined
    this.type = undefined
    this.wind = undefined

    this.err = undefined

    // If options were passed in,
    if (!options) { return }
    // Then assign values from options arguments to `this`
    const { zip, apiKey, units = 'imperial' } = options
    this.zip = zip
    this.apiKey = apiKey
    this.units = units

    // Call `this.getData()` to populate Weather Data Properties
    this.getData()
  }

  get path () {
    // Return property `this.path` including options arguments added after object instantiation
    const { zip, apiKey, units } = this
    if (zip && apiKey && units ) {
      return `https://api.openweathermap.org/data/2.5/weather?zip=${this.zip}&appid=${this.apiKey}&units=${this.units}`
    }
  }

  async getData() {
    try {
      const response = await fetching(this.path)
      const data = await response.json()
      this.handleData(data)
    } catch(err) {
      this.err = err
    }
  }

  handleData(data: any) {
    const {
      clouds: cloudData,
      main,
      name: city,
      sys,
      timezone,
      weather,
      wind,
    } = data
    const {
      humidity,
      pressure,
      temp: current,
      temp_max: max,
      temp_min: min,
    } = main
    const { country, sunrise, sunset } = sys
    const {
      description: detailedDescription,
      main: description,
    } = weather[0]
    const { deg, speed } = wind
  
    this.air = {
      humidity,
      pressure,
    }
    this.type = {
      description,
      detailedDescription,
    }
    this.wind = {
      direction: this.degToDirection(deg),
      speed: Number(speed.toFixed(0)),
    }
    this.cloudiness = cloudData.all
    this.location = {
      city,
      country,
      timezone,
    }
    this.temp = {
      current,
      min,
      max,
    }
    this.sun = {
      rise: this.timestampToString(sunrise),
      set: this.timestampToString(sunset),
    }
  }

  // eslint-disable-next-line class-methods-use-this
  degToDirection(deg: number) {
    if (deg > 337.5) return 'N'
    if (deg > 292.5) return 'NW'
    if (deg > 247.5) return 'W'
    if (deg > 202.5) return 'SW'
    if (deg > 157.5) return 'S'
    if (deg > 122.5) return 'SE'
    if (deg > 67.5) return 'E'
    if (deg > 22.5) return 'NE'
    return 'N'
  }

  // eslint-disable-next-line class-methods-use-this
  timestampToString(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000)
    const hours = date.getHours()
    const minutes = `0${date.getMinutes()}`
    const seconds = `0 ${date.getSeconds()}`
    const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
    return formattedTime
  }
}

const weather = new Weather({ apiKey: '1429c4bd0156c07f3d7a9629c723828a', zip: 94108 })
setTimeout(() => { console.log(weather) }, 1000)