import { GenerateFlightRequest } from './generate-flight-request';

describe('GetNoFlyZonesResponse', () => {
  it('should create an instance', () => {
    expect(new GenerateFlightRequest()).toBeTruthy();
  });

  it('should be able to get and set airline name', () => {
    let flightReq = new GenerateFlightRequest();
    let airlineName = "Example";
    flightReq.setAirlineName(airlineName);
    expect(flightReq.getAirlineName()).toEqual(airlineName);
  });

  it('should be able to get and set flight ICAO', () => {
    let flightReq = new GenerateFlightRequest();
    let flightICAO = "EX1234";
    flightReq.setFlightIcao(flightICAO);
    expect(flightReq.getFlightIcao()).toEqual(flightICAO);
  });

  it('should be able to get and set longitude', () => {
    let flightReq = new GenerateFlightRequest();
    let longitude = Math.floor(Math.random() * 1234);
    flightReq.setLongitude(longitude);
    expect(flightReq.getLongitude()).toEqual(longitude);
  });

  it('should be able to get and set latitude', () => {
    let flightReq = new GenerateFlightRequest();
    let latitude = Math.floor(Math.random() * 1234);
    flightReq.setLatitude(latitude);
    expect(flightReq.getLatitude()).toEqual(latitude);
  });

  it('should be able to get and set altitude', () => {
    let flightReq = new GenerateFlightRequest();
    let altitude = Math.floor(Math.random() * 1234);
    flightReq.setAltitude(altitude);
    expect(flightReq.getAltitude()).toEqual(altitude);
  });

  it('should be able to get and set longitude change', () => {
    let flightReq = new GenerateFlightRequest();
    let longitudeChange = Math.floor(Math.random() * 1234);
    flightReq.setLongitudeChange(longitudeChange);
    expect(flightReq.getLongitudeChange()).toEqual(longitudeChange);
  });

  it('should be able to get and set latitude change', () => {
    let flightReq = new GenerateFlightRequest();
    let latitudeChange = Math.floor(Math.random() * 1234);
    flightReq.setLatitudeChange(latitudeChange);
    expect(flightReq.getLatitudeChange()).toEqual(latitudeChange);
  });

  it('should be able to get and set altitude change', () => {
    let flightReq = new GenerateFlightRequest();
    let altitudeChange = Math.floor(Math.random() * 1234);
    flightReq.setAltitudeChange(altitudeChange);
    expect(flightReq.getAltitudeChange()).toEqual(altitudeChange);
  });
});
