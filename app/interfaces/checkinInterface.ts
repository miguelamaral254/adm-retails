import { Participant } from "./participantinterface";

export interface Checkin {
    idCheckin: number;
    participant: Participant | null
    idActivity: number 
    checkinDateTime: Date;
}
 