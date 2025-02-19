export interface ReadingDay {
  month: number;  // 1-12
  day: number;    // 1-31
  passage: string;
  isCatchupDay?: boolean;
}

export const readingPlan: ReadingDay[] = [
  { month: 1, day: 1, passage: "Genesis 1.1-2.3" },
  { month: 1, day: 2, passage: "Genesis 2.4-4.26" },
  { month: 1, day: 3, passage: "Genesis 5.1-6.8" },
  { month: 1, day: 4, passage: "Genesis 6.9-9.29" },
  { month: 1, day: 5, passage: "Genesis 10.1-11.9" },
  { month: 1, day: 6, passage: "Genesis 11.10-26" },
  { month: 1, day: 7, passage: "Genesis 11.27-12.20" },
  { month: 1, day: 8, passage: "Genesis 13-14" },
  { month: 1, day: 9, passage: "Genesis 15-16" },
  { month: 1, day: 10, passage: "Genesis 17" },
  { month: 1, day: 11, passage: "Genesis 18.1-15" },
  { month: 1, day: 12, passage: "Genesis 18.16-19.38" },
  { month: 1, day: 13, passage: "Genesis 20-21" },
  { month: 1, day: 14, passage: "Genesis 22-23" },
  { month: 1, day: 15, passage: "Genesis 24-25.11" },
  { month: 1, day: 16, passage: "Genesis 25.12-18" },
  { month: 1, day: 17, passage: "Genesis 25.19-26.35" },
  { month: 1, day: 18, passage: "Genesis 27-28" },
  { month: 1, day: 19, passage: "Genesis 29-31" },
  { month: 1, day: 20, passage: "Genesis 32-33" },
  { month: 1, day: 21, passage: "Genesis 34-35" },
  { month: 1, day: 22, passage: "Genesis 36-37.1" },
  { month: 1, day: 23, passage: "Genesis 37.2-38.30" },
  { month: 1, day: 24, passage: "Genesis 39-40" },
  { month: 1, day: 25, passage: "Genesis 41-42" },
  { month: 1, day: 26, passage: "Genesis 43-44" },
  { month: 1, day: 27, passage: "Genesis 45-46" },
  { month: 1, day: 28, passage: "Genesis 47-48" },
  { month: 1, day: 29, passage: "Genesis 49-50" },
  { month: 1, day: 30, passage: "Catch-up day", isCatchupDay: true },
  { month: 1, day: 31, passage: "Catch-up day", isCatchupDay: true },
  { month: 2, day: 1, passage: "Exodus 1-2" },
  { month: 2, day: 2, passage: "Exodus 3-4" },
  { month: 2, day: 3, passage: "Exodus 5.1-6.27" },
  { month: 2, day: 4, passage: "Exodus 6.28-7.29" },
  { month: 2, day: 5, passage: "Exodus 8-9" },
  { month: 2, day: 6, passage: "Exodus 12.1-30" },
  { month: 2, day: 7, passage: "Exodus 12.31-14.31" },
  { month: 2, day: 8, passage: "Exodus 15.1-21" },
  { month: 2, day: 9, passage: "Exodus 15.22-17.7" },
  { month: 2, day: 10, passage: "Exodus 17.8-18.27" },
  { month: 2, day: 11, passage: "Exodus 19-20" },
  { month: 2, day: 12, passage: "Exodus 21-23" },
  { month: 2, day: 13, passage: "Exodus 24.1-11" },
  { month: 2, day: 14, passage: "Exodus 24.12-25.40" },
  { month: 2, day: 15, passage: "Exodus 26-27" },
  { month: 2, day: 16, passage: "Exodus 28-29" },
  { month: 2, day: 17, passage: "Exodus 30-31" },
  { month: 2, day: 18, passage: "Exodus 32-33" },
  { month: 2, day: 19, passage: "Exodus 34" },
  { month: 2, day: 20, passage: "Exodus 35-36" },
  { month: 2, day: 21, passage: "Exodus 37-38" },
  { month: 2, day: 22, passage: "Exodus 39" },
  { month: 2, day: 23, passage: "Exodus 40" },
  { month: 2, day: 24, passage: "Catch-up day", isCatchupDay: true },
  { month: 2, day: 25, passage: "Catch-up day", isCatchupDay: true },
  { month: 2, day: 26, passage: "Leviticus 1-2" },
  { month: 2, day: 27, passage: "Leviticus 3" },
  { month: 2, day: 28, passage: "Leviticus 4.1-5.13" },
  { month: 3, day: 1, passage: "Leviticus 5.14-6.7" },
  { month: 3, day: 2, passage: "Leviticus 6.8-7.38" },
  { month: 3, day: 3, passage: "Leviticus 8-9" },
  { month: 3, day: 4, passage: "Leviticus 10" },
  { month: 3, day: 5, passage: "Leviticus 11-12" },
  { month: 3, day: 6, passage: "Leviticus 13-14" },
  { month: 3, day: 7, passage: "Leviticus 15-16" },
  { month: 3, day: 8, passage: "Leviticus 17-18" },
  { month: 3, day: 9, passage: "Leviticus 19-20" },
  { month: 3, day: 10, passage: "Leviticus 21-22" },
  { month: 3, day: 11, passage: "Leviticus 23.1-24.9" },
  // ... continue with more readings
]; 