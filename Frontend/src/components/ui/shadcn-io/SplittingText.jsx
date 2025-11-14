// src/components/ui/SplittingText.jsx
import React, { useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import { motion, useInView } from "framer-motion";

const defaultItemVariant = {
  hidden: { x: 150, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const SplittingText = forwardRef(
  (
    {
      text,
      type = "chars",
      motionVariants = {},
      inView = false,
      inViewMargin = "0px",
      inViewOnce = true,
      delay = 0,
      className = "",
      ...props
    },
    ref
  ) => {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);

    const isInView = useInView(localRef, { once: inViewOnce, margin: inViewMargin }) || !inView;

    const items = useMemo(() => {
      if (Array.isArray(text)) {
        return text.flatMap((line, i) => [
          <React.Fragment key={`line-${i}`}>{line}</React.Fragment>,
          i < text.length - 1 ? <br key={`br-${i}`} /> : null,
        ]);
      }

      if (type === "words") {
        const tokens = text.match(/\S+\s*/g) || [];
        return tokens.map((token, i) => <React.Fragment key={i}>{token}</React.Fragment>);
      }

      return text.split("").map((char, i) => <React.Fragment key={i}>{char}</React.Fragment>);
    }, [text, type]);

    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          delayChildren: delay / 1000,
          staggerChildren:
            motionVariants.stagger ??
            (type === "chars" ? 0.05 : type === "words" ? 0.2 : 0.3),
        },
      },
    };

    const itemVariants = {
      hidden: { ...defaultItemVariant.hidden, ...(motionVariants.initial || {}) },
      visible: {
        ...defaultItemVariant.visible,
        ...(motionVariants.animate || {}),
        transition: { ...(defaultItemVariant.visible.transition || {}), ...(motionVariants.transition || {}) },
      },
    };

    return (
      <motion.span
        ref={localRef}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        {...props}
      >
        {items.map((item, index) =>
          item ? (
            <motion.span
              key={index}
              variants={itemVariants}
              style={{ display: "inline-block", whiteSpace: type === "chars" ? "pre" : "pre" }}
            >
              {item}
            </motion.span>
          ) : null
        )}
      </motion.span>
    );
  }
);

export default SplittingText;
