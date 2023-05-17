interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    adddHours(hours: number): Date;
<<<<<<< HEAD
    compareIfBefore(start_date: Date, end_date: Date): boolean;
=======
    compareIfBefore(start_date: Date, end_date: Date): number;
>>>>>>> 54136c3884993d936199b916ac3022217fd374cd
}

export { IDateProvider };
