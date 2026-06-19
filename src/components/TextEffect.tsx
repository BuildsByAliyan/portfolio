'use client';

import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Variants,
} from 'framer-motion';
import React from 'react';

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

type TextEffectProps = {
  children: string;
  per?: 'word' | 'char' | 'line';
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  style?: React.CSSProperties;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
};

const defaultStaggerTimes: Record<'char' | 'word' | 'line', number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(12px)' },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
      exit: { x: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  style,
  preset = 'blur',
  delay = 0,
  trigger = true,
  onAnimationComplete,
}: TextEffectProps) {

  // Split cleanly — no empty/space-only segments
  let segments: string[];
  if (per === 'line') {
    segments = children.split('\n').filter(Boolean);
  } else if (per === 'word') {
    segments = children.trim().split(/\s+/);   // ✅ split on whitespace, keep only words
  } else {
    segments = children.split('');
  }

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const selectedVariants = preset
    ? presetVariants[preset]
    : {
        container: defaultContainerVariants,
        item: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        },
      };

  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;
  const stagger = defaultStaggerTimes[per];

  const delayedContainerVariants: Variants = {
    hidden: containerVariants.hidden,
    visible: {
      ...containerVariants.visible,
      transition: {
        ...(containerVariants.visible as TargetAndTransition)?.transition,
        staggerChildren:
          (containerVariants.visible as TargetAndTransition)?.transition
            ?.staggerChildren || stagger,
        delayChildren: delay,
      },
    },
    exit: containerVariants.exit,
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label={children}
          variants={delayedContainerVariants}
          className={className}
          style={style}
          onAnimationComplete={onAnimationComplete}
        >
          {segments.map((segment, index) => (
            <motion.span
              key={`${index}-${segment}`}
              variants={itemVariants}
              aria-hidden="true"
              className="inline-block"
              style={{ marginRight: per === 'word' ? '0.25em' : undefined }}
            >
              {segment}
            </motion.span>
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}