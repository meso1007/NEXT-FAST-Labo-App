"use client";
import React, { useState } from "react";
import Button from "./Button/Button";
import Nav from "./Nav/Nav";
import styles from "./Header.module.scss";
import { AnimatePresence, motion } from "framer-motion";
type HeaderProps = {
  title: string;
  className?: string;
};

const variants = {
  open: {
    width: 400,
    height: 650,
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: 100,
    height: 40,
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
};

const Header: React.FC<HeaderProps> = ({}) => {
  const [isActive, setIsActive] = useState(false);
  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className={styles.header}>
      <motion.div
        className={styles.menu}
        variants={variants}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
      </motion.div>
      <Button isActive={isActive} label="Menu" onClick={handleButtonClick} />
    </header>
  );
};

export default Header;
