import { cn } from "./lib/utils";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link || idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className={`absolute inset-0 h-full w-full bg-gradient-to-r ${item.gradient} rounded-2xl opacity-20 block`}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
            <div className="relative z-10">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 group-hover:border-slate-700",
        className
      )}
    >
      {children}
    </div>
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h3 className={cn("text-xl font-bold text-white mb-2 group-hover:text-white transition-colors", className)}>
      {children}
    </h3>
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p className={cn("text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors", className)}>
      {children}
    </p>
  );
};
