export type CreditCategory = 'regional' | 'community' | 'educational';

export interface TheaterCredit {
    year: number;
    show: string;
    theater: string;
    category: CreditCategory;
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
        show: 'Urinetown',
        theater: 'Wilmington High School',
        category: 'educational',
        isUpcoming: true,
    },
    {
        year: 2027,
        show: 'Frozen Jr.',
        theater: 'Wilmington Middle School',
        category: 'educational',
        isUpcoming: true,
    },

    // ── 2026 ─────────────────────────────────────────────────────────────────
    {
        year: 2026,
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
        show: 'The Wild Party',
        theater: 'Common Thread Theatre',
        category: 'community',
        isUpcoming: true,
    },
    {
        year: 2026,
        show: 'Come From Away',
        theater: 'Winnipisaukee Playhouse',
        category: 'regional',
    },
    {
        year: 2026,
        show: 'Seussical',
        theater: 'Wheelock Family Theater',
        category: 'educational',
        note: 'sub',
    },
    {
        year: 2026,
        show: 'Hairspray',
        theater: 'Umbrella Arts Center',
        category: 'regional',
        note: 'sub',
    },
    {
        year: 2026,
        show: 'Mary Poppins',
        theater: 'Friendly Society for the Performing Arts',
        category: 'community', // TODO(category): confirm — community vs professional?
    },
    {
        year: 2026,
        show: 'Mean Girls',
        theater: 'Wilmington High School',
        category: 'educational',
    },
    {
        year: 2026,
        show: 'Legally Blonde',
        theater: 'Suffolk University',
        category: 'educational',
    },
    {
        year: 2026,
        show: 'Wizard of Oz Jr.',
        theater: 'Greater Boston Stage Company',
        category: 'educational', // TODO(category): youth production at a professional venue — move to regional?
    },
    {
        year: 2026,
        show: 'Beetlejuice Jr.',
        theater: 'Greater Boston Stage Company',
        category: 'educational', // TODO(category): same as above
    },
    {
        year: 2026,
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
        show: 'Something Rotten!',
        theater: 'A Common Thread Theater',
        category: 'community', // TODO(category): confirm
    },
    {
        year: 2025,
        show: 'Hadestown Jr.',
        theater: 'Misfit Artist Company',
        category: 'educational', // TODO(category): confirm
    },
    {
        year: 2025,
        show: 'Reefer Madness',
        theater: 'The Rockwell',
        category: 'community',
    },
    {
        year: 2025,
        show: 'Legally Blonde',
        theater: 'Greater Boston Stage Company',
        category: 'educational',
    },
    {
        year: 2025,
        show: 'Bye Bye Birdie',
        theater: 'Greater Boston Stage Company',
        category: 'educational',
    },
    {
        year: 2025,
        show: 'Legally Blonde',
        theater: 'Chelmsford Center for the Arts',
        category: 'educational',
    },
    {
        year: 2025,
        show: 'Songs for a New World',
        theater: 'Concord Players',
        category: 'community',
    },
    {
        year: 2025,
        show: 'Beetlejuice Jr.',
        theater: 'North Shore Childrens Theatre',
        category: 'educational',
    },
    {
        year: 2025,
        show: 'The Lightning Thief',
        theater: 'Cambridge School of Weston',
        category: 'educational',
    },
    {
        year: 2025,
        show: 'Fun Home',
        theater: 'Burlington Players',
        category: 'community',
        note: 'sub',
    },
    {
        year: 2025,
        show: 'Honk',
        theater: 'Ayer-Shirley High School',
        category: 'educational',
        note: 'sub',
    },
    {
        year: 2025,
        show: 'Cinderella',
        theater: 'Chelsea High School',
        category: 'educational',
    },
    {
        year: 2025,
        show: 'Something Rotten!',
        theater: 'Curtain Call Theatre',
        category: 'community',
    },
    {
        year: 2025,
        show: "The Guy Who Didn't Like Musicals",
        theater: 'Boston Center for the Arts',
        category: 'community',
    },

    // ── 2024 ─────────────────────────────────────────────────────────────────
    {
        year: 2024,
        show: 'Winter Wonderettes',
        theater: 'Greater Boston Stage Company',
        category: 'regional',
        youtubeLink: 'https://www.youtube.com/watch?v=nZW-FA_QTS4&list=PLfbyNxCSa0lVzJytuJww20mEhiVKui1_O&index=1',
    },
    {
        year: 2024,
        show: 'Kiss of the Spider Woman',
        theater: 'A Common Thread Theater',
        category: 'community', // TODO(category): confirm
    },
    {
        year: 2024,
        show: 'The Prom',
        theater: 'Cambridge School of Weston',
        category: 'educational',
    },
    {
        year: 2024,
        show: 'Cabaret',
        theater: 'Vokes Theater',
        category: 'community',
    },
    {
        year: 2024,
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

export function getGroupedCredits(): GroupedCredits[] {
    return CATEGORY_ORDER.map((meta) => {
        const sorted = theaterCredits
            .filter((c) => c.category === meta.key)
            .sort((a, b) => b.year - a.year);
        return {
            meta,
            featured: sorted.filter((c) => c.year >= FEATURED_YEAR_MIN),
            condensed: sorted.filter((c) => c.year < FEATURED_YEAR_MIN),
        };
    }).filter((g) => g.featured.length + g.condensed.length > 0);
}
