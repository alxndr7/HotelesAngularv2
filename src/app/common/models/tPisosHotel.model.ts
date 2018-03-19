export class TPisosHotel {
    pisoHotelId: number;
    hotelId: number;
    piso: number;
    numHabPiso: number;


    constructor(pisoHotelId: number, hotelId: number, piso: number, numHabPiso: number) {
        this.pisoHotelId = pisoHotelId;
        this.hotelId = hotelId;
        this.piso = piso;
        this.numHabPiso = numHabPiso;
    }
}
