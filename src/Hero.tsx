import { motion, useReducedMotion, type Variants } from "framer-motion";
import ReactPlayer from "react-player/youtube";
import heroImg from "./assets/etan-hero.jpg";
import "./Hero.css";

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

const featured = [
    {
        url: "https://www.youtube.com/watch?v=QetcQ_k17VM",
        caption: "Dancing Through Life — Wicked",
    },
    {
        url: "https://www.youtube.com/watch?v=HpSeqORjsks",
        caption: "Live at City Winery",
    },
];

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

    return (
        <section className="hero">
            <motion.div
                className="hero-inner"
                variants={container}
                initial={reduceMotion ? "show" : "hidden"}
                animate="show"
            >
                <div className="hero-text">
                    <motion.div className="hero-overline" variants={fadeUp}>
                        Drummer&ensp;·&ensp;Boston, MA
                    </motion.div>

                    <motion.h1 className="hero-name" variants={fadeUp}>
                        Etan Cohn
                    </motion.h1>

                    <motion.p className="hero-desc" variants={fadeUp}>
                        Pit musician and versatile professional drummer, with
                        experience across regional and community theaters and in
                        bands.
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

                <motion.div className="hero-photo" variants={photoReveal}>
                    <div className="hero-frame">
                        <img
                            src={heroImg}
                            alt="Etan Cohn playing drums in a pit orchestra"
                        />
                        <div className="hero-frame-caption">♪&ensp;in the pit for Come From Away</div>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="hero-featured"
                variants={featuredReveal}
                initial={reduceMotion ? "show" : "hidden"}
                animate="show"
            >
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
