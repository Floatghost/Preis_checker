import { motion } from "framer-motion";
import React, { useMemo } from 'react';
import styles from "./background.module.css";

type BackgroundProps = {
    header?: React.ReactNode;
    center?: React.ReactNode;
    footer?: React.ReactNode;
};

export default function Background({
    header = <b>test</b>,
    center = <div>
                <Title/>
                <Search/>
            </div>,
    footer = <p>Test © 2025</p>,
}: BackgroundProps) {

    const noise = useMemo(
        () =>
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJElEQVQYV2NkYGD4z8DAwMgABYwZGBgY/jMwMDCMAIYRAwMDAwAAx5kG3d8eOEUAAAAASUVORK5CYII=",
        []
    );

    return (
        <div className={styles.hero}>
            {/* BACKGROUND LAYERS */}
            <div
                aria-hidden
                className={styles.vignette}
                style={{
                background:
                    "radial-gradient(1200px 600px at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0) 60%), radial-gradient(circle at 50% 110%, rgba(0,0,0,0.55), rgba(0,0,0,0.85))",
                }}
            />

            <motion.div
                aria-hidden
                className={[styles.blob, styles.blob1].join(" ")}
                style={{
                background:
                    "radial-gradient(closest-side, rgba(251,191,36,0.28), rgba(251,191,36,0) 75%)",
                filter: "blur(80px)",
                }}
                // animate={{ rotate: 360 }}
                // transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                aria-hidden
                className={[styles.blob, styles.blob2].join(" ")}
                style={{
                background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(59,130,246,0) 70%)",
                filter: "blur(90px)",
                }}
                // animate={{ rotate: -360 }}
                // transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                aria-hidden
                className={[styles.blob, styles.blob3].join(" ")}
                style={{
                background:
                    "radial-gradient(closest-side, rgba(16,185,129,0.16), rgba(16,185,129,0) 70%)",
                filter: "blur(80px)",
                }}
                // animate={{ rotate: 360 }}
                // transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
            />

            <div
                aria-hidden
                className={styles.noise}
                style={{ backgroundImage: `url(${noise})` }}
            />

            <main className={styles.content}>
                {header && <div className={styles.header}>{header}</div>}
                {center && <div className={styles.center}>{center}</div>}
                {footer && <div className={styles.footer}>{footer}</div>}
            </main>

            {/* this is for screen readers */}
            <span className={styles.srOnly}>Decorative spotlight background</span>
        </div>
    );
};

function Title() {
    return (
        <div>
            <h1 className={styles.title}>Preis checker</h1>
            <p className={styles.hint}>
            Press <kbd className={styles.kbd}>Enter</kbd> to search
            </p>
        </div>
    );
};

function Search() {
    return (
        <div className={styles.search}>
            <div className={styles.inputWrap}>
                <input
                placeholder="Search…"
                className={styles.input}
                />
                <div className={styles.inputRing} />
            </div>
        </div>
    );
};
