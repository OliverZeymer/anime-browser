"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function BackgroundBlur({ children, isOpen, setIsOpen }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "initial";
    }

    return () => {
      body.style.overflow = "initial";
    };
  }, [setIsOpen]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="blurry-background fixed w-screen h-screen top-0 left-0 bg-black/50 backdrop-blur-lg z-[99999] flex justify-center flex-col items-center"
      onClick={(e) => {
        const hasTargetClassName = e.target.className;
        if (typeof hasTargetClassName === "string") {
          if (e.target.className.includes("blurry-background")) {
            setIsOpen(false);
          } else {
            return;
          }
        }
      }}>
      <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 w-8 h-8 flex justify-center items-center rounded-full bg-primary backdrop-blur-xl">
        <X strokeWidth={2} className="text-primary-foreground w-6 h-6" />
      </button>
      {children}
    </motion.div>
  );
}
