import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import ReactPlayer from "react-player/youtube";
import heroImg from "./assets/etan-hero.jpg";
import { useContent } from "./content.tsx";
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

const featuredReveal: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
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
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

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

    // On mobile the featured tile flips in on scroll; on desktop it keeps its
    // fade-up on mount alongside the rest of the hero.
    const featuredMotion =
        isMobile && !reduceMotion
            ? {
                  variants: featuredFlip,
                  initial: "hidden" as const,
                  whileInView: "show" as const,
                  viewport: { once: true, amount: 0.3 },
              }
            : {
                  variants: featuredReveal,
                  initial: reduceMotion ? "show" : "hidden",
                  animate: "show" as const,
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
                        <div className="hero-frame-caption">{photoCaption}</div>
                    </div>
                </motion.div>

                <div className="hero-text hero-body">
                    <motion.p className="hero-desc" variants={fadeUp}>
                        {description}
                    </motion.p>

                    <motion.div className="hero-actions" variants={fadeUp}>
                        <a className="hero-btn hero-btn-primary" href="#/experience">
                            See Experience
                        </a>
                        <a
                            className="hero-btn hero-btn-ghost"
                            href="mailto:etan.cohn@gmail.com"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div className="hero-featured" {...featuredMotion}>
                <div className="hero-featured-head">
                    <div className="hero-featured-label">
                        Featured
                        <br />
                        Videos
                    </div>
                </div>
                <div className="hero-featured-row">
                    {featured.map((video) => (
                        <div key={video.url} className="hero-card">
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
                            <div className="hero-card-caption">{video.caption}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;
