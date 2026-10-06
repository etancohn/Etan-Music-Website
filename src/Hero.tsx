import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import ReactPlayer from "react-player/youtube";
import { SOCIALS } from "./socials";
import heroImg from "./assets/etan-hero.jpg";
import { useContent } from "./content.tsx";
import { rich } from "./richText";
import "./Hero.css";

// Matches the 900px mobile breakpoint used throughout Hero.css.
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 900px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return isMobile;
}

const container: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.13, delayChildren: 0.1 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

const photoReveal: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 30 },
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
    },
};

// The featured panel sits below the fold, so it reveals as it scrolls into
// view; its cards then pin themselves in one after the other (cardDrop).
const featuredReveal: Variants = {
    hidden: { opacity: 0, y: 36 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delayChildren: 0.25,
            staggerChildren: 0.18,
        },
    },
};

// Mobile-only scroll-triggered flip, reproducing the old AOS "flip-down" the
// tiles used to have (rotateX from a tilted-back angle into place).
const featuredFlip: Variants = {
    hidden: { opacity: 0, rotateX: -100, transformPerspective: 2500 },
    show: {
        opacity: 1,
        rotateX: 0,
        transformPerspective: 2500,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delayChildren: 0.3,
            staggerChildren: 0.14,
        },
    },
};

// Each card rises with the panel from a steeper angle and eases onto its
// resting tilt (the tilt itself lives in CSS on .hero-card). Alternates
// direction by index. A long ease-out rather than a spring, so it settles
// without snapping.
const cardDrop: Variants = {
    hidden: (i: number) => ({
        opacity: 0,
        y: 30,
        rotate: i % 2 ? 3.5 : -3.5,
        scale: 0.96,
    }),
    show: {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.6, ease: "easeOut" },
        },
    },
};

const labelReveal: Variants = {
    hidden: { opacity: 0, x: -14 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

// True once the page has scrolled past `threshold` px. Only re-renders when
// that boolean flips, not on every scroll event.
function useScrolledPast(threshold: number) {
    const [past, setPast] = useState(false);
    useEffect(() => {
        const onScroll = () => setPast(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);
    return past;
}

function PlayBadge() {
    return (
        <span className="hero-play-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
        </span>
    );
}

function Hero() {
    const reduceMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const { overline, description, photoUrl, photoCaption, featured } = useContent().hero;
    const featuredRef = useRef<HTMLDivElement>(null);
    const scrolled = useScrolledPast(40);

    // Both layouts reveal the featured panel on scroll: a flip-down on mobile
    // (the old AOS effect), a rise on desktop.
    const featuredMotion = {
        variants: isMobile ? featuredFlip : featuredReveal,
        initial: reduceMotion ? ("show" as const) : ("hidden" as const),
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.3 },
    };

    return (
        <section className="hero">
            <motion.div
                className="hero-inner"
                variants={container}
                initial={reduceMotion ? "show" : "hidden"}
                animate="show"
            >
                <div className="hero-text hero-head">
                    <motion.div className="hero-overline" variants={fadeUp}>
                        {overline}
                    </motion.div>

                    <motion.h1 className="hero-name" variants={fadeUp}>
                        Etan Cohn
                    </motion.h1>
                </div>

                <motion.div className="hero-photo" variants={photoReveal}>
                    <div className="hero-frame">
                        <img
                            src={photoUrl || heroImg}
                            alt="Etan Cohn playing drums in a pit orchestra"
                        />
                        <div className="hero-frame-caption">{rich(photoCaption)}</div>
                    </div>
                </motion.div>

                <div className="hero-text hero-body">
                    <motion.p className="hero-desc" variants={fadeUp}>
                        {rich(description)}
                    </motion.p>

                    <motion.div className="hero-actions" variants={fadeUp}>
                        <a className="hero-btn hero-btn-primary" href="#/experience">
                            See Experience
                        </a>
                        <a className="hero-btn hero-btn-ghost" href="#/about">
                            About Me
                        </a>
                    </motion.div>

                    <motion.div className="hero-socials" variants={fadeUp}>
                        {SOCIALS.map(({ href, label, Icon }) => (
                            <a
                                key={href}
                                className="hero-social"
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                title={label}
                            >
                                <Icon fontSize="small" />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Desktop-only hint that there's more below; hidden while the
                    page is scrolled, back again at the top. */}
                <button
                    type="button"
                    className={`hero-cue${scrolled ? " is-hidden" : ""}`}
                    onClick={() =>
                        featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                    tabIndex={scrolled ? -1 : undefined}
                >
                    <span className="hero-cue-label">Scroll</span>
                    <span className="hero-cue-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path
                                d="M6 9l6 6 6-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </button>
            </motion.div>

            <motion.div className="hero-featured" ref={featuredRef} {...featuredMotion}>
                <div className="hero-featured-head">
                    <motion.div className="hero-featured-label" variants={labelReveal}>
                        Featured
                        <br />
                        Videos
                    </motion.div>
                </div>
                <div className="hero-featured-row">
                    {featured.map((video, i) => (
                        <motion.div
                            key={video.url}
                            className="hero-card-slot"
                            variants={cardDrop}
                            custom={i}
                        >
                            <div className="hero-card">
                                <div className="hero-card-media">
                                    <ReactPlayer
                                        url={video.url}
                                        light={true}
                                        controls
                                        width="100%"
                                        height="100%"
                                        playIcon={<PlayBadge />}
                                    />
                                </div>
                                <div className="hero-card-caption">{rich(video.caption)}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;
