
export enum TimeUnit {
    MILISECOND,
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    YEAR,
    DECADE,
    CENTURY,
}

export enum TimeDirection {
    PAST,
    FUTURE,
}

export enum RelativeFromStartType {
    NOW,
    TO,
}

export enum RelativeToStartType {
    NOW,
    FROM,
}

export enum RelativeEndType {
    START_OF_SECOND,
    START_OF_MINUTE,
    START_OF_HOUR,
    START_OF_DAY,
    START_OF_WEEK,
    START_OF_MONTH,
    START_OF_QUARTER,
    START_OF_YEAR,
    START_OF_DECADE,
    START_OF_CENTURY,
    END_OF_SECOND,
    END_OF_MINUTE,
    END_OF_HOUR,
    END_OF_DAY,
    END_OF_WEEK,
    END_OF_MONTH,
    END_OF_QUARTER,
    END_OF_YEAR,
    END_OF_DECADE,
    END_OF_CENTURY,
}

export type Period = (
    | { from: Date; }
    | { to: Date; }
    | { from: Date; to: Date; }
);

export type JSONPeriod = (
    | { from: number }
    | { to: number; }
    | { from: number; to: number; }
);

// export const PeriodDateKeyMap: { [key in keyof Period]: true } = { 'from': true, 'to': true };
export const PeriodDateKeyMap: { [PeriodKey: string]: true } = { 'from': true, 'to': true };

export interface PeriodDates {
    from: Date;
    to: Date;
}
