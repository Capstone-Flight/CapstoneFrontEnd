
export class AirportGenerateFlightRequest {
    private airlineName: string;
    private flightIcao: string;
    private departAirport: string;
    private arriveAirport: string;
    
    public getAirlineName(): string {
        return this.airlineName;
    }

    public getFlightIcao(): string {
        return this.flightIcao;
    }

    public setAirlineName(airlineName: string): void {
        this.airlineName = airlineName;
    }

    public setFlightIcao(flightIcao: string): void {
        this.flightIcao = flightIcao;
    }

    public setDepartAirport(departAirport: string): void {
        this.departAirport = departAirport;
    }

    public setArriveAirport(arriveAirport: string): void {
        this.arriveAirport  = arriveAirport;
    }
}
