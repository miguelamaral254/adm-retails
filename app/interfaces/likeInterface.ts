import { Participant } from "./participantinterface";

export interface Like {
    idLike: number;
    participant: Participant | null;
    idActivity: number;
}

 