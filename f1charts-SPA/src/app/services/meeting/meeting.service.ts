import { Injectable } from '@angular/core';
import { Meeting } from 'src/app/models/Meeting';
import { FetchService } from '../fetch.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class MeetingService {
  private readonly DEFAULT_YEAR = 2024
  private readonly years = [2023, 2024]

  private meetings: Meeting[] = []
  private countries: string[] = []

  private selectedYear?: number
  private selectedCountry?: string

  constructor(private fetchService: FetchService) {
    this.selectedYear = this.DEFAULT_YEAR;
  }

  async fetchCountries(): Promise<string[]> {
    let url = environment.apiUrl + '/api/meetings'

    if (!this.selectedYear) throw new Error("A year has not been selected")
    else {
      url = url + `?year=${this.selectedYear}`
    }
    const meetings:Meeting[] = await this.fetchService.fetchData(url)
    const countries = this.filterMeetingsForCountries(meetings)
    this.countries = countries
    return this.countries
  }

  async fetchMeetings(): Promise<Meeting[]> {
    let url = environment.apiUrl + '/api/meetings'
    if (!this.selectedYear) throw new Error("A year has not been selected")
    else {
      url = url + `?year=${this.selectedYear}`
    }
    if (this.selectedCountry) {
      url = url + `&country_name=${this.selectedCountry}`
    }
    this.meetings = await this.fetchService.fetchData(url)
    return this.meetings
  }

  filterMeetingsForCountries(meetings: Meeting[]): string[] {
    const countryNames = Array.from(new Set(meetings.map(meeting => meeting.country_name)));
    const unitedStatesIndex = countryNames.indexOf("United States");

    if (unitedStatesIndex !== -1) {
      countryNames.splice(unitedStatesIndex, 1); // Remove "United States" from the array
      countryNames.sort(); // Sort the remaining countries alphabetically
      countryNames.unshift("United States"); // Add "United States" at the beginning
    } else {
      countryNames.sort(); // Just sort if "United States" is not in the list
    }

    return countryNames;
  }


  getYears() {
    return this.years;
  }

  setSelectedYear(year: number) {
    this.selectedYear = year
  }
  getSelectedYear() {
    return this.selectedYear
  }
  setSelectedCountry(country: string) {
    this.selectedCountry = country
  }
  getSelectedCountry() {
    return this.selectedCountry
  }
}
