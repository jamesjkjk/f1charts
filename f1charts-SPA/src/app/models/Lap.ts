export interface Lap {
    date_start: string; // ISO 8601 date string
    driver_number: number;
    duration_sector_1: number;
    duration_sector_2: number;
    duration_sector_3: number;
    i1_speed: number;
    i2_speed: number;
    is_pit_out_lap: boolean;
    lap_duration: number;
    lap_number: number;
    meeting_key: number;
    segments_sector_1: number[];
    segments_sector_2: number[];
    segments_sector_3: number[];
    session_key: number;
    st_speed: number;
    date_end?: string;
}
