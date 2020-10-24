import { Maison } from './Maison';

  
  export class Reservation {
    startDate: string;
    enddate: string;
    totalCost: number;
    maison: Maison;
    
    constructor(
    startDate?:string,
    enddate?: string,
    totalCost?: number,
    maison?:Maison,
    ) {
        this.startDate=startDate;this.enddate=enddate;this.totalCost=totalCost;this.maison=maison;
    }
  }