import { motion } from "framer-motion";
import React, { useMemo, useState, useEffect, useRef } from 'react';
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

    const headerRef = useRef<HTMLDivElement | null>(null);
    const [blob1Position, setBlob1Position] = useState({ top: '0px', left: '0px' });
    const [pageHeight, setPageHeight] = useState(0);
    const [pageWidth, setPageWidth] = useState(0);
    const [blob2Positions, setBlob2Positions] = useState<{ top: string; left: string }[]>([]);

    useEffect(() => {
    if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setBlob1Position({
        top: `${rect.top + window.scrollY - rect.height + 100}px`,
        left: `${rect.left + window.scrollX + rect.width / 2}px`,
        });
    }
    }, []);

    useEffect(() => {
        //TODO add protection for when blob is to large
        //TODO make more advanced numBlobs
        const numBlobs = Math.floor(pageHeight / 800);
        const blobWidth = 720;
        const maxLeft = Math.max(0, pageWidth - blobWidth);

        const positions = Array.from({ length: numBlobs }).map((_, i) => ({
            top: `${Math.min(i * 800 + 400, pageHeight - 800)}px`,
            left: `${Math.random() * maxLeft}px`,
        }));

        console.log(positions);

        setBlob2Positions(positions);
    }, [pageHeight, pageWidth]);

    useEffect(() => {
        const updateHeight = () => {
            setPageHeight(document.documentElement.scrollHeight);
            setPageWidth(document.documentElement.scrollWidth);
        };

        updateHeight(); // initial load
        window.addEventListener('resize', updateHeight);
        window.addEventListener('scroll', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('scroll', updateHeight);
        };
    }, []);

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
                    top: blob1Position.top,
                    left: blob1Position.left,
                background:
                    "radial-gradient(closest-side, rgba(251,191,36,0.28), rgba(251,191,36,0) 100%)",
                filter: "blur(80px)",
                }}
                // animate={{ rotate: 360 }}
                // transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />
            {/* <motion.div
                aria-hidden
                className={[styles.blob, styles.blob2].join(" ")}
                style={{
                background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.18), rgba(59,130,246,0) 70%)",
                filter: "blur(90px)",
                }}
                // animate={{ rotate: -360 }}
                // transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
            /> */}
            {blob2Positions.map((pos, i) => (
                <motion.div
                    key={`blob2-${i}`}
                    aria-hidden
                    className={[styles.blob, styles.blob2].join(" ")}
                    style={{
                        top: pos.top,
                        left: pos.left,
                        background:
                            "radial-gradient(closest-side, rgba(0, 98, 255, 0.18), rgba(59,130,246,0) 200%)",
                        filter: "blur(90px)",
                        position: "absolute",
                    }}
                />
            ))}
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
                {header && <div className={styles.header} ref={headerRef}>{header}</div>}
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
        </div>
    );
};

function Search() {
    return (
        <div className={styles.search}>
            <p className={styles.hint}>
            Press <kbd className={styles.kbd}>Enter</kbd> to search
            </p>
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
