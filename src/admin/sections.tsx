import {
    BandsContent,
    CoversContent,
    HeroContent,
    PerformancesContent,
    TheaterCreditsContent,
} from '../data/content';
import { CATEGORY_ORDER, CreditCategory, TheaterCredit } from '../data/theaterCredits';
import { CoverVideo } from '../data/covers';
import { Performance } from '../data/performances';
import {
    Checkbox, DateInput, Field, ListEditor, NumberInput, Row, Select, SubHeading, TextArea, TextInput,
} from './fields';
import ImageUpload from './ImageUpload';

// One editor component per content section. Each receives the section's draft
// value and reports the whole next value through onChange — AdminPanel owns
// the draft and the save.

interface EditorProps<T> {
    value: T;
    onChange: (next: T) => void;
}

const YEAR_NOW = new Date().getFullYear();

// Accepts a pasted YouTube link in any common shape (watch?v=, youtu.be,
// shorts, embed, live) and returns just the 11-char video id; anything else
// (including a bare id, or a half-typed value) passes through unchanged.
function parseYouTubeId(input: string): string {
    const m = input.trim().match(
        /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/,
    );
    return m ? m[1] : input;
}

function YouTubeIdField({ value, onChange }: { value: string; onChange: (id: string) => void }) {
    return (
        <Field label="YouTube link" help="Paste the video's link straight from YouTube — the video ID is pulled out automatically. (A bare video ID works too.)">
            <TextInput value={value} onChange={(v) => onChange(parseYouTubeId(v))} placeholder="https://www.youtube.com/watch?v=…" />
        </Field>
    );
}

export function HeroEditor({ value, onChange }: EditorProps<HeroContent>) {
    const set = <K extends keyof HeroContent>(k: K, v: HeroContent[K]) =>
        onChange({ ...value, [k]: v });
    return (
        <div>
            <Field label="Tagline" help="The small line above your name, e.g. “Drummer · Boston, MA”.">
                <TextInput value={value.overline} onChange={(v) => set('overline', v)} />
            </Field>
            <Field label="Intro paragraph">
                <TextArea value={value.description} onChange={(v) => set('description', v)} />
            </Field>
            <Field label="Hero photo">
                <ImageUpload
                    url={value.photoUrl}
                    folder="hero"
                    onChange={(url) => set('photoUrl', url || undefined)}
                />
            </Field>
            <Field label="Photo caption" help="The line under your hero photo.">
                <TextInput value={value.photoCaption} onChange={(v) => set('photoCaption', v)} />
            </Field>

            <SubHeading>Featured videos</SubHeading>
            <ListEditor
                items={value.featured}
                onChange={(featured) => set('featured', featured)}
                makeNew={() => ({ url: '', caption: '' })}
                addLabel="Add featured video"
                itemTitle={(v, i) => v.caption || `Video ${i + 1}`}
                renderItem={(item, setItem) => (
                    <Row>
                        <Field label="YouTube link">
                            <TextInput value={item.url} onChange={(url) => setItem({ ...item, url })} placeholder="https://www.youtube.com/watch?v=…" />
                        </Field>
                        <Field label="Caption">
                            <TextInput value={item.caption} onChange={(caption) => setItem({ ...item, caption })} />
                        </Field>
                    </Row>
                )}
            />
        </div>
    );
}

export function TheaterCreditsEditor({ value, onChange }: EditorProps<TheaterCreditsContent>) {
    const categoryOptions = CATEGORY_ORDER.map((c) => ({ value: c.key, label: c.label }));
    return (
        <div>
            <Field
                label="Show full details from year"
                help="Shows from this year onward appear as full cards; earlier ones as a condensed list."
            >
                <NumberInput
                    value={value.featuredYearMin}
                    fallback={YEAR_NOW - 2}
                    onChange={(featuredYearMin) => onChange({ ...value, featuredYearMin })}
                />
            </Field>

            <SubHeading>Productions</SubHeading>
            <ListEditor
                items={value.credits}
                onChange={(credits) => onChange({ ...value, credits })}
                makeNew={(): TheaterCredit => ({ year: YEAR_NOW, show: '', theater: '', category: 'community' as CreditCategory })}
                addLabel="Add production"
                addFirst
                reorderable={false}
                itemTitle={(c) => (c.show ? `${c.year} · ${c.show}` : 'New production')}
                confirmText="Remove this production? It disappears from the site after you press Save."
                renderItem={(item, setItem) => (
                    <>
                        <Row cols="1fr 1fr">
                            <Field label="Show">
                                <TextInput value={item.show} onChange={(show) => setItem({ ...item, show })} />
                            </Field>
                            <Field label="Theater">
                                <TextInput value={item.theater} onChange={(theater) => setItem({ ...item, theater })} />
                            </Field>
                        </Row>
                        <Row cols="1fr 110px">
                            <Field label="Opening night" help="Shows are ordered by this date, newest first. Filling it in sets the year too.">
                                <DateInput
                                    value={item.startDate}
                                    onChange={(startDate) => setItem({
                                        ...item,
                                        startDate: startDate || undefined,
                                        year: startDate ? Number(startDate.slice(0, 4)) : item.year,
                                    })}
                                />
                            </Field>
                            <Field label="Year" help="Used when there's no date.">
                                <NumberInput value={item.year} fallback={YEAR_NOW} onChange={(year) => setItem({ ...item, year })} />
                            </Field>
                        </Row>
                        <Row>
                            <Field label="Category">
                                <Select value={item.category} onChange={(category) => setItem({ ...item, category })} options={categoryOptions} />
                            </Field>
                            <Field label="Note" help="Optional — e.g. “sub”, “co-music director, drums”.">
                                <TextInput value={item.note} onChange={(note) => setItem({ ...item, note: note || undefined })} />
                            </Field>
                            <Field label="YouTube link" help="Optional.">
                                <TextInput value={item.youtubeLink} onChange={(youtubeLink) => setItem({ ...item, youtubeLink: youtubeLink || undefined })} />
                            </Field>
                        </Row>
                        <div style={{ margin: '2px 0 14px' }}>
                            <Checkbox
                                checked={item.isUpcoming}
                                onChange={(isUpcoming) => setItem({ ...item, isUpcoming: isUpcoming || undefined })}
                                label="Upcoming (shows an “Upcoming” badge)"
                            />
                        </div>
                    </>
                )}
            />
        </div>
    );
}

export function BandsEditor({ value, onChange }: EditorProps<BandsContent>) {
    const set = <K extends keyof BandsContent>(k: K, v: BandsContent[K]) =>
        onChange({ ...value, [k]: v });
    return (
        <div>
            <Field label="Band name">
                <TextInput value={value.name} onChange={(v) => set('name', v)} />
            </Field>
            <Field label="Description">
                <TextArea value={value.description} onChange={(v) => set('description', v)} />
            </Field>
            <Field label="Band photo">
                <ImageUpload
                    url={value.photoUrl}
                    folder="bands"
                    onChange={(url) => set('photoUrl', url || undefined)}
                />
            </Field>

            <SubHeading>Videos</SubHeading>
            <ListEditor
                items={value.videos}
                onChange={(videos) => set('videos', videos)}
                makeNew={() => ({ youtubeId: '', caption: '' })}
                addLabel="Add video"
                itemTitle={(v, i) => v.caption || `Video ${i + 1}`}
                renderItem={(item, setItem) => (
                    <Row>
                        <YouTubeIdField value={item.youtubeId} onChange={(youtubeId) => setItem({ ...item, youtubeId })} />
                        <Field label="Caption">
                            <TextInput value={item.caption} onChange={(caption) => setItem({ ...item, caption })} />
                        </Field>
                    </Row>
                )}
            />
        </div>
    );
}

export function PerformancesEditor({ value, onChange }: EditorProps<PerformancesContent>) {
    return (
        <ListEditor
            items={value.items}
            onChange={(items) => onChange({ ...value, items })}
            makeNew={(): Performance => ({ year: YEAR_NOW, title: '', venue: '' })}
            addLabel="Add performance"
            itemTitle={(p) => (p.title ? `${p.year} · ${p.title}` : 'New performance')}
            renderItem={(item, setItem) => (
                <>
                    <Row cols="90px 1fr 1fr">
                        <Field label="Year">
                            <NumberInput value={item.year} fallback={YEAR_NOW} onChange={(year) => setItem({ ...item, year })} />
                        </Field>
                        <Field label="Title">
                            <TextInput value={item.title} onChange={(title) => setItem({ ...item, title })} />
                        </Field>
                        <Field label="Venue">
                            <TextInput value={item.venue} onChange={(venue) => setItem({ ...item, venue })} />
                        </Field>
                    </Row>
                    <Field label="Video link" help="Optional — YouTube or Google Drive.">
                        <TextInput value={item.youtubeLink} onChange={(youtubeLink) => setItem({ ...item, youtubeLink: youtubeLink || undefined })} />
                    </Field>
                </>
            )}
        />
    );
}

function CoverList({ items, onChange }: { items: CoverVideo[]; onChange: (items: CoverVideo[]) => void }) {
    return (
        <ListEditor
            items={items}
            onChange={onChange}
            makeNew={() => ({ youtubeId: '', title: '' })}
            addLabel="Add cover"
            itemTitle={(v, i) => v.title || `Cover ${i + 1}`}
            renderItem={(item, setItem) => (
                <Row>
                    <YouTubeIdField value={item.youtubeId} onChange={(youtubeId) => setItem({ ...item, youtubeId })} />
                    <Field label="Title" help="e.g. “Popular — Wicked”.">
                        <TextInput value={item.title} onChange={(title) => setItem({ ...item, title })} />
                    </Field>
                </Row>
            )}
        />
    );
}

export function CoversEditor({ value, onChange }: EditorProps<CoversContent>) {
    return (
        <div>
            <SubHeading first>Musical theater covers</SubHeading>
            <CoverList items={value.musicalTheater} onChange={(musicalTheater) => onChange({ ...value, musicalTheater })} />
            <SubHeading>Pop covers</SubHeading>
            <CoverList items={value.pop} onChange={(pop) => onChange({ ...value, pop })} />
        </div>
    );
}
