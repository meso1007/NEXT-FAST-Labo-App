import React from "react";
import { Links, footerLinks } from "./data";
import styles from "./Nav.module.scss";
import { motion } from "framer-motion";

type NavProps = {
  className?: string;
};

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      opacity: { duration: 0.35 },
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const Nav: React.FC<NavProps> = ({}) => {
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {Links.map((link, i) => (
          <motion.div
            className={`${styles.textHover} hover:underline`}
            key={i}
            custom={i}
            variants={perspective}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <a href={link.href}>{link.title}</a>
          </motion.div>
        ))}
      </div>
      <div className={styles.footer}>
        {footerLinks.map((link, i) => {
          return (
            <motion.a
              className="hover:underline"
              key={`f_${i}`}
              href={link.href}
              custom={i}
              variants={slideIn}
              animate="enter"
              exit="exit"
              initial="initial"
            >
              {link.title}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
