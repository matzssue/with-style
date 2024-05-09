'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
export const MotionCard = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      className='flex h-screen justify-center rounded-sm p-2'
      initial={{
        opacity: 0,
        // if odd index card,slide from right instead of left
        x: index % 2 === 0 ? 50 : -50,
      }}
      whileInView={{
        opacity: 1,
        x: 0, // Slide in to its original position
        transition: {
          duration: 1, // Animation duration
        },
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
