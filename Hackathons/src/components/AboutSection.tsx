import CardStackSection, { CardStackSectionProps, CardItem, DEFAULT_CARDS } from "./CardStackSection";

export type { CardStackSectionProps, CardItem };
export { DEFAULT_CARDS };

/**
 * AboutSection component - pre-configured instance of CardStackSection for "About" pages.
 * Supports custom overrides for cards, title, tag, height, and className.
 */
export const AboutSection = (props: CardStackSectionProps) => {
  return (
    <CardStackSection
      id="about"
      tag="[ About ]"
      title="Bringing imagination to life"
      subtitle="—crafting immersive 3D worlds that evoke emotion."
      ariaLabel="About Section"
      {...props}
    />
  );
};

export default AboutSection;