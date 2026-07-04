import YouTubeIcon from '@mui/icons-material/YouTube';
import { getGroupedCredits, GroupedCredits, TheaterCredit } from './data/theaterCredits';
import Reveal from './Reveal';
import './TheaterCreditsSection.css';

function YouTubeLink({ href, show }: { href: string; show: string }) {
    return (
        <a
            className="credit-yt-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${show} on YouTube`}
        >
            <YouTubeIcon />
        </a>
    );
}

function CreditRow({ credit }: { credit: TheaterCredit }) {
    return (
        <li className="credit-row">
            <div className="credit-row__top">
                <span className="credit-row__show">{credit.show}</span>
                {credit.youtubeLink && <YouTubeLink href={credit.youtubeLink} show={credit.show} />}
                {credit.isUpcoming && <span className="credit-pill">Upcoming</span>}
            </div>
            <div className="credit-row__meta">
                {credit.theater} · {credit.year}
                {credit.note && <span className="credit-row__note"> ({credit.note})</span>}
            </div>
        </li>
    );
}

function CondensedCredit({ credit }: { credit: TheaterCredit }) {
    return (
        <li className="condensed-credit">
            {credit.year} · <span className="condensed-credit__show">{credit.show}</span> · {credit.theater}
            {credit.note && ` (${credit.note})`}
            {credit.youtubeLink && <> <YouTubeLink href={credit.youtubeLink} show={credit.show} /></>}
        </li>
    );
}

function CreditGroup({ group }: { group: GroupedCredits }) {
    const total = group.featured.length + group.condensed.length;
    return (
        <Reveal className="credit-group">
            <div className="credit-group__rail">
                <h4 className="credit-group__label">{group.meta.label}</h4>
                <span className="credit-group__count">
                    {total} {total === 1 ? 'production' : 'productions'}
                </span>
            </div>
            <div className="credit-group__body">
                <ul className="credit-group__grid">
                    {group.featured.map((c) => (
                        <CreditRow key={`${c.year}-${c.show}-${c.theater}`} credit={c} />
                    ))}
                </ul>
                {group.condensed.length > 0 && (
                    <div className="credit-group__earlier">
                        <span className="credit-group__earlier-label">Earlier</span>
                        <ul className="credit-group__earlier-list">
                            {group.condensed.map((c) => (
                                <CondensedCredit key={`${c.year}-${c.show}-${c.theater}`} credit={c} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Reveal>
    );
}

function TheaterCreditsSection() {
    const groups = getGroupedCredits();
    return (
        <section className="theater-credits" aria-label="Musical theater experience">
            {groups.map((g) => (
                <CreditGroup key={g.meta.key} group={g} />
            ))}
        </section>
    );
}

export default TheaterCreditsSection;
