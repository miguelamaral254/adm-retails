import { Checkin } from "./checkinInterface";
import { Like } from "./likeInterface";
import { Speaker } from "./speakerInterface";

export interface Activity {
    idActivity: number;
    title: string;
    description: string;
    time: string; 
    date: Date;
    location: string;
    speaker: Speaker[];
    checkins?: Checkin[];
    likes?: Like[];
  }