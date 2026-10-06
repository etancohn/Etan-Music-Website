import { useCallback, useEffect, useRef, useState } from 'react';
import VideoCard from './VideoCard';
import './VideoCarousel.css';

export interface CarouselVideo {
    youtubeId: string;
    caption: string;
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
                d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// A titled row of videos: one horizontally scrolling (snap) row by default,
// with arrows to page through it, and a "Show all" toggle that expands it
// into the full wrapping grid.
function VideoCarousel({ title, videos }: { title: string; videos: CarouselVideo[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    const updateArrows = useCallback(() => {
        const el = trackRef.current;
        if (!el || expanded) {
            setCanPrev(false);
            setCanNext(false);
            return;
        }
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, [expanded]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return undefined;
        updateArrows();
        el.addEventListener('scroll', updateArrows, { passive: true });
        const ro = new ResizeObserver(updateArrows);
        ro.observe(el);
        return () => {
            el.removeEventListener('scroll', updateArrows);
            ro.disconnect();
        };
    }, [updateArrows, videos.length]);

    const page = (dir: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollBy({ left: dir * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    };

    const toggle = () => {
        const sectionTop = trackRef.current?.parentElement?.getBoundingClientRect().top ?? 0;
        setExpanded((x) => !x);
        // Collapsing a long grid can leave the reader far below this section.
        if (expanded && sectionTop < 80) {
            trackRef.current?.parentElement?.scrollIntoView({ block: 'start' });
        }
    };

    // Everything already fits on one row — no arrows or toggle needed.
    const overflows = canPrev || canNext || expanded;

    return (
        <section className="page-section video-carousel" aria-label={title}>
            <div className="video-carousel__head">
                <h2 className="page-section__label video-carousel__title">
                    {title}
                    <span className="page-section__count">{videos.length}</span>
                </h2>
                {overflows && (
                    <div className="video-carousel__controls">
                        {!expanded && (
                            <>
                                <button
                                    type="button"
                                    className="video-carousel__arrow"
                                    onClick={() => page(-1)}
                                    disabled={!canPrev}
                                    aria-label={`Previous ${title}`}
                                >
                                    <Chevron dir="left" />
                                </button>
                                <button
                                    type="button"
                                    className="video-carousel__arrow"
                                    onClick={() => page(1)}
                                    disabled={!canNext}
                                    aria-label={`Next ${title}`}
                                >
                                    <Chevron dir="right" />
                                </button>
                            </>
                        )}
                        <button
                            type="button"
                            className="video-carousel__toggle"
                            onClick={toggle}
                            aria-expanded={expanded}
                        >
                            {expanded ? 'Show less' : 'Show all'}
                        </button>
                    </div>
                )}
            </div>
            <div
                ref={trackRef}
                className={
                    expanded
                        ? 'video-grid video-carousel__grid'
                        : 'video-carousel__track'
                }
            >
                {videos.map((v) => (
                    <VideoCard key={v.youtubeId} youtubeId={v.youtubeId} caption={v.caption} />
                ))}
            </div>
        </section>
    );
}

export default VideoCarousel;
