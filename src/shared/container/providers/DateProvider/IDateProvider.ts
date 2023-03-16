interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    adddHours(hours: number): Date;
}

export { IDateProvider };
