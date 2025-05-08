"use client";
import React from "react";
import styles from "./Button.module.scss";
import { motion } from "framer-motion";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({ label, id, onClick, isActive }) => {
  return (
    <button
      className={`${styles.customButton} ${
        id === "rightBigBtn"
          ? styles.rightBigBtn
          : id === "leftBigBtn"
          ? styles.leftBigBtn
          : ""
      }`}
      onClick={onClick}
    >
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0" }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <TextHoverAnimation textLabel={label} />
        <TextHoverAnimation textLabel="Close" />
      </motion.div>
    </button>
  );
};

interface TextHoverAnimationProps {
  textLabel: string;
  className?: string;
}

const TextHoverAnimation: React.FC<TextHoverAnimationProps> = ({
  textLabel,
}) => {
  return (
    <div className={styles.el}>
      <div className={styles.textHover}>
        <p>{textLabel}</p>
        <p>{textLabel}</p>
      </div>
    </div>
  );
};

export default Button;
