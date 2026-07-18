import YouTubeIcon from '@mui/icons-material/YouTube';
import { CATEGORY_ORDER, TheaterCredit } from './data/theaterCredits';
import { compareCreditsDesc } from './data/content';
import { useContent } from './content.tsx';
import Reveal from './Reveal';
import './RecentExperience.css';

// Home page shows only the last couple of seasons; everything lives on #/experience.
const RECENT_YEAR_MIN = 2023;

const SHORT_LABELS: Record<string, string> = {
    regional: 'Regional & Professional',
    community: 'Community',
    educational: 'Youth & College',
};

function RecentRow({ credit }: { credit: TheaterCredit }) {
    return (
        <li
            className="recent-exp__row"
            title={`${credit.year} · ${credit.show} · ${credit.theater}`}
        >
            <span
                className="recent-exp__dot"
                data-cat={credit.category}
                aria-hidden="true"
            />
            <span className="recent-exp__year">{credit.year}</span>
            <span className="recent-exp__show">{credit.show}</span>
            {credit.note && (
                <span className="recent-exp__note">({credit.note})</span>
            )}
            <span className="recent-exp__theater">{credit.theater}</span>
            {credit.isUpcoming && <span className="recent-exp__pill">Upcoming</span>}
            {credit.youtubeLink && (
                <a
                    className="recent-exp__yt"
                    href={credit.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${credit.show} on YouTube`}
                >
                    <YouTubeIcon />
                </a>
            )}
        </li>
    );
}

function RecentExperience() {
    const { credits } = useContent().theaterCredits;
    const recent = credits
        .filter((c) => c.year >= RECENT_YEAR_MIN)
        .sort(compareCreditsDesc);
    const earlierCount = credits.length - recent.length;

    return (
        <section className="recent-exp" aria-label="Recent pit experience">
            <Reveal>
                <div className="recent-exp__head">
                    <div className="recent-exp__heading">
                        <h2 className="recent-exp__title">Recent Pit Experience</h2>
                        <ul className="recent-exp__legend">
                            {CATEGORY_ORDER.map((cat) => (
                                <li key={cat.key} className="recent-exp__legend-item">
                                    <span
                                        className="recent-exp__dot"
                                        data-cat={cat.key}
                                        aria-hidden="true"
                                    />
                                    {SHORT_LABELS[cat.key] ?? cat.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a className="recent-exp__all" href="#/experience">
                        Full experience
                        <span aria-hidden="true"> →</span>
                    </a>
                </div>

                <ul className="recent-exp__list">
                    {recent.map((c) => (
                        <RecentRow key={`${c.year}-${c.show}-${c.theater}`} credit={c} />
                    ))}
                </ul>

                <a className="recent-exp__more" href="#/experience">
                    + {earlierCount} earlier productions, bands &amp; recitals
                </a>
            </Reveal>
        </section>
    );
}

export default RecentExperience;
