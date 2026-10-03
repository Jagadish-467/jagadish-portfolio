import { motion } from "motion/react";
import { ContactForm } from "./ContactForm";
import { EmailDispatch } from "./EmailDispatch";
import { NodeStatus } from "./NodeStatus";
import { PlatformMatrix } from "./PlatformMatrix";

const rise = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function ContactSection() {
  return (
    <section className="relative min-h-screen lg:h-screen lg:min-h-0 flex flex-col justify-center overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 tech-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1400px] bg-hairline"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-8 sm:px-10 lg:px-16 lg:py-10">
        <motion.header {...rise} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-meta">02 // Transmission &amp; Network</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl leading-[1.02] font-extrabold sm:text-4xl lg:text-5xl">
            Let&apos;s build something intelligent.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Open for research collaborations, engineering challenges, and high-impact distributed
            systems.
          </p>
        </motion.header>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          <motion.div
            {...rise}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col gap-4"
          >
            <EmailDispatch />
            <PlatformMatrix />
            <NodeStatus />
          </motion.div>

          <motion.div {...rise} transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="h-full">
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
