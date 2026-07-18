export type CreditCategory = 'regional' | 'community' | 'educational';

export interface TheaterCredit {
    year: number;
    show: string;
    theater: string;
    category: CreditCategory;
    // Opening night, ISO 'YYYY-MM-DD'. Orders shows within a year; entries
    // without one sort as late-in-their-year (they're usually upcoming/TBD).
    startDate?: string;
    note?: string;           // e.g. "sub", "co-music director, drums", "original show"
    youtubeLink?: string;
    isUpcoming?: boolean;
}

export interface CategoryMeta {
    key: CreditCategory;
    label: string;
}

export const CATEGORY_ORDER: CategoryMeta[] = [
    { key: 'regional', label: 'Regional & Professional' },
    { key: 'community', label: 'Community' },
    { key: 'educational', label: 'Youth & College' },
];

// Credits from this year onward render as full rows; earlier ones as a condensed list.
export const FEATURED_YEAR_MIN = 2024;

// Within a year, entries keep the order they appear here — put the credits you
// want most prominent first.
export const theaterCredits: TheaterCredit[] = [
    // ── 2027 ─────────────────────────────────────────────────────────────────
    {
        year: 2027,
        startDate: '2027-04-08',
        show: 'Urinetown',
        theater: 'Wilmington High School',
        category: 'educational',
        isUpcoming: true,
    },
    {
        year: 2027,
        startDate: '2027-01-14',
        show: 'Frozen Jr.',
        theater: 'Wilmington Middle School',
        category: 'educational',
        isUpcoming: true,
    },

    // ── 2026 ─────────────────────────────────────────────────────────────────
    {
        year: 2026,
        startDate: '2026-11-20',
        show: 'Come From Away',
        theater: 'Concord Community Players',
        category: 'community',
        isUpcoming: true,
    },
    {
        year: 2026,
        show: '25th Annual Putnam County Spelling Bee',
        theater: 'Greater Boston Stage Company',
        category: 'educational',
        isUpcoming: true,
    },
    {
        year: 2026,
        show: 'Footloose',
        theater: 'Greater Boston Stage Company',
        category: 'educational',
        isUpcoming: true,
    },
    {
        year: 2026,
        startDate: '2026-07-19',
        show: 'The Wild Party',
        theater: 'Common Thread Theatre',
        category: 'community',
        isUpcoming: true,
    },
    {
        year: 2026,
        startDate: '2026-07-16',
        show: 'The Sound of Music',
        theater: 'Wellesley Theatre Project',
        category: 'community',
    },
    {
        year: 2026,
        startDate: '2026-06-08',
        show: 'Come From Away',
        theater: 'Winnipesaukee Playhouse',
        category: 'regional',
    },
    {
        year: 2026,
        startDate: '2026-05-07',
        show: 'Seussical',
        theater: 'Wheelock Family Theater',
        category: 'educational',
        note: 'sub',
    },
    {
        year: 2026,
        startDate: '2026-04-23',
        show: 'Hairspray',
        theater: 'Umbrella Arts Center',
        category: 'regional',
        note: 'sub',
    },
    {
        year: 2026,
        startDate: '2026-04-11',
        show: 'Mary Poppins',
        theater: 'Weston Friendly Society for the Performing Arts',
        category: 'community', // TODO(category): confirm — community vs professional?
    },
    {
        year: 2026,
        startDate: '2026-03-19',
        show: 'Mean Girls',
        theater: 'Wilmington High School',
        category: 'educational',
    },
    {
        year: 2026,
        startDate: '2026-02-19',
        show: 'Legally Blonde',
        theater: 'Suffolk University',
        category: 'educational',
    },
    {
        year: 2026,
        startDate: '2026-01-29',
        show: 'Wizard of Oz Jr.',
        theater: 'Greater Boston Stage Company',
        category: 'educational', // TODO(category): youth production at a professional venue — move to regional?
    },
    {
        year: 2026,
        startDate: '2026-01-29',
        show: 'Beetlejuice Jr.',
        theater: 'Greater Boston Stage Company',
        category: 'educational', // TODO(category): same as above
    },
    {
        year: 2026,
        startDate: '2026-01-14',
        show: 'Shrek Jr.',
        theater: 'Wilmington Middle School',
        category: 'educational',
    },

    // ── 2025 ─────────────────────────────────────────────────────────────────
    {
        year: 2025,
        show: 'Wizard of Oz',
        theater: 'The Un-Common Theatre Company',
        category: 'educational', // TODO(category): youth theater company — confirm
    },
    {
        year: 2025,
        startDate: '2025-10-17',
        show: 'Something Rotten!',
        theater: 'A Common Thread Theater',
        category: 'community', // TODO(category): confirm
    },
    {
        year: 2025,
        startDate: '2025-09-14',
        show: 'Hadestown Jr.',
        theater: 'Misfit Artist Company',
        category: 'educational', // TODO(category): confirm
    },
    {
        year: 2025,
        startDate: '2025-08-14',
        show: 'Reefer Madness',
        theater: 'The Rockwell',
        category: 'community',
    },
    {
        year: 2025,
        startDate: '2025-08-06',
        show: 'Legally Blonde',
        theater: 'Greater Boston Stage Company',
        category: 'educational',
    },
    {
        year: 2025,
        startDate: '2025-08-06',
        show: 'Bye Bye Birdie',
        theater: 'Greater Boston Stage Company',
        category: 'educational',
    },
    {
        year: 2025,
        startDate: '2025-07-17',
        show: 'Legally Blonde',
        theater: 'Chelmsford Center for the Arts',
        category: 'educational',
    },
    {
        year: 2025,
        startDate: '2025-06-20',
        show: 'Songs for a New World',
        theater: 'Concord Players',
        category: 'community',
    },
    {
        year: 2025,
        startDate: '2025-06-13',
        show: 'Beetlejuice Jr.',
        theater: 'North Shore Childrens Theatre',
        category: 'educational',
    },
    {
        year: 2025,
        startDate: '2025-06-05',
        show: 'The Lightning Thief',
        theater: 'Cambridge School of Weston',
        category: 'educational',
    },
    {
        year: 2025,
        startDate: '2025-05-09',
        show: 'Fun Home',
        theater: 'Burlington Players',
        category: 'community',
        note: 'sub',
    },
    {
        year: 2025,
        startDate: '2025-04-06',
        show: 'Honk',
        theater: 'Ayer-Shirley High School',
        category: 'educational',
        note: 'sub',
    },
    {
        year: 2025,
        startDate: '2025-04-04',
        show: 'Cinderella',
        theater: 'Chelsea High School',
        category: 'educational',
    },
    {
        year: 2025,
        startDate: '2025-03-07',
        show: 'Something Rotten!',
        theater: 'Curtain Call Theatre',
        category: 'community',
    },
    {
        year: 2025,
        startDate: '2025-02-13',
        show: "The Guy Who Didn't Like Musicals",
        theater: 'Boston Center for the Arts',
        category: 'community',
    },

    // ── 2024 ─────────────────────────────────────────────────────────────────
    {
        year: 2024,
        startDate: '2024-11-26',
        show: 'Winter Wonderettes',
        theater: 'Greater Boston Stage Company',
        category: 'regional',
        youtubeLink: 'https://www.youtube.com/watch?v=nZW-FA_QTS4&list=PLfbyNxCSa0lVzJytuJww20mEhiVKui1_O&index=1',
    },
    {
        year: 2024,
        startDate: '2024-07-26',
        show: 'Kiss of the Spider Woman',
        theater: 'A Common Thread Theater',
        category: 'community', // TODO(category): confirm
    },
    {
        year: 2024,
        startDate: '2024-05-30',
        show: 'The Prom',
        theater: 'Cambridge School of Weston',
        category: 'educational',
    },
    {
        year: 2024,
        startDate: '2024-05-03',
        show: 'Cabaret',
        theater: 'Vokes Theater',
        category: 'community',
    },
    {
        year: 2024,
        startDate: '2024-02-22',
        show: 'Newsies',
        theater: 'Suffolk University',
        category: 'educational',
    },

    // ── 2023 & earlier ───────────────────────────────────────────────────────
    {
        year: 2023,
        show: 'The Muses',
        theater: 'CMU (Carnegie Mellon) School of Drama',
        category: 'educational',
        note: 'original show',
        youtubeLink: 'https://www.youtube.com/watch?v=R_uwYc8AShY&feature=youtu.be',
    },
    {
        year: 2023,
        show: '9 to 5',
        theater: "Scotch'n'Soda Theater",
        category: 'educational',
    },
    {
        year: 2022,
        show: 'Newsies',
        theater: 'McKeesport Little Theater',
        category: 'community',
        note: 'sub',
    },
    {
        year: 2022,
        show: 'This Old Haunt',
        theater: 'CMU School of Drama',
        category: 'educational',
        note: 'original show',
    },
    {
        year: 2022,
        show: 'Something Rotten!',
        theater: "Scotch'n'Soda Theater",
        category: 'educational',
        note: 'co-music director, drums',
    },
    {
        year: 2021,
        show: 'Rocky Horror',
        theater: "Scotch'n'Soda Theater",
        category: 'educational',
    },
    {
        year: 2021,
        show: 'Little Shop of Horrors',
        theater: "Scotch'n'Soda Theater",
        category: 'educational',
    },
    {
        year: 2020,
        show: 'Behind Closed Doors',
        theater: "Scotch'n'Soda Theater",
        category: 'educational',
        note: 'original show',
        youtubeLink: 'https://www.youtube.com/watch?v=PReWoscQbFQ&t=1s',
    },
    {
        year: 2019,
        show: 'This Side Up',
        theater: 'CMU School of Music',
        category: 'educational',
        note: 'original show',
        youtubeLink: 'https://www.youtube.com/watch?v=xkq9TU1V5Lo&list=PLfbyNxCSa0lUr6mnf6x2bsAVvnaY3gfAR',
    },
    {
        year: 2019,
        show: 'Catch Me If You Can',
        theater: "Scotch'n'Soda Theater",
        category: 'educational',
    },
];

export interface GroupedCredits {
    meta: CategoryMeta;
    featured: TheaterCredit[];
    condensed: TheaterCredit[];
}

// Grouping logic lives in ./content.ts (groupCredits), where it runs over
// live content rather than only these bundled defaults.
