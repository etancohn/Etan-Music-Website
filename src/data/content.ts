import { BandVideo, cosmicCaravanVideos } from './bands';
import { CoverVideo, musicalTheaterCovers, popCovers } from './covers';
import { Performance, notablePerformances } from './performances';
import {
    CATEGORY_ORDER,
    FEATURED_YEAR_MIN,
    GroupedCredits,
    TheaterCredit,
    theaterCredits,
} from './theaterCredits';

// The editable site content, one interface per section. Each section is
// stored as one Firestore document in the `content` collection (doc id =
// section key), shallow-merged over these bundled defaults at load time.
// The admin dashboard edits these same shapes.

export interface FeaturedVideo {
    url: string;
    caption: string;
}

export interface HeroContent {
    overline: string;
    description: string;
    // Uploaded photo URL; when absent the bundled hero photo is used.
    photoUrl?: string;
    photoCaption: string;
    featured: FeaturedVideo[];
}

export interface TheaterCreditsContent {
    // Credits from this year onward render as full rows; earlier ones condensed.
    featuredYearMin: number;
    credits: TheaterCredit[];
}

export interface BandsContent {
    name: string;
    description: string;
    // Uploaded photo URL; when absent the bundled band photo is used.
    photoUrl?: string;
    videos: BandVideo[];
}

export interface PerformancesContent {
    items: Performance[];
}

export interface CoversContent {
    musicalTheater: CoverVideo[];
    pop: CoverVideo[];
}

export interface SiteContent {
    hero: HeroContent;
    theaterCredits: TheaterCreditsContent;
    bands: BandsContent;
    performances: PerformancesContent;
    covers: CoversContent;
}

export const defaultContent: SiteContent = {
    hero: {
        overline: 'Drummer · Boston, MA',
        description:
            'Pit musician and versatile professional drummer, with experience across regional and community theaters and in bands.',
        photoCaption:
            '♪ in the pit for Come From Away, at Winnipesaukee Playhouse regional theater',
        featured: [
            {
                url: 'https://www.youtube.com/watch?v=QetcQ_k17VM',
                caption: 'Dancing Through Life — Wicked',
            },
            {
                url: 'https://www.youtube.com/watch?v=HpSeqORjsks',
                caption: 'Live at City Winery',
            },
        ],
    },
    theaterCredits: {
        featuredYearMin: FEATURED_YEAR_MIN,
        credits: theaterCredits,
    },
    bands: {
        name: 'Fox and the Cosmic Caravan',
        description:
            'Rock band that gigged around Carnegie Mellon and Pittsburgh. Wrote and recorded the album Cosmic Caravan, released in 2023.',
        videos: cosmicCaravanVideos,
    },
    performances: {
        items: notablePerformances,
    },
    covers: {
        musicalTheater: musicalTheaterCovers,
        pop: popCovers,
    },
};

// Groups credits by category with featured/condensed split, preserving the
// in-year order they were entered in. (Moved here from theaterCredits.ts so
// it works over live content instead of only the bundled defaults.)
export function groupCredits(section: TheaterCreditsContent): GroupedCredits[] {
    return CATEGORY_ORDER.map((meta) => {
        const sorted = section.credits
            .filter((c) => c.category === meta.key)
            .sort((a, b) => b.year - a.year);
        return {
            meta,
            featured: sorted.filter((c) => c.year >= section.featuredYearMin),
            condensed: sorted.filter((c) => c.year < section.featuredYearMin),
        };
    }).filter((g) => g.featured.length + g.condensed.length > 0);
}
