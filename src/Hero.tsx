import { motion, type Variants } from "framer-motion";
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

function Hero() {
    return (
        <section className="hero">
            <motion.div
                className="hero-inner"
                variants={container}
                initial="hidden"
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
                        At home in the pit orchestra — drumming for musical
                        theater on regional and community stages across Greater
                        Boston, with plenty of band experience beyond the
                        theater.
                    </motion.p>

                    <motion.div className="hero-actions" variants={fadeUp}>
                        <a className="hero-btn hero-btn-primary" href="#experience">
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
        </section>
    );
}

export default Hero;
