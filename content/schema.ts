export type LinkItem = {
  href: string;
  label: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type DetailItem = {
  label: string;
  value: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  eyebrow?: string;
};

export type StepItem = {
  title: string;
  description: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

type BaseSection = {
  id: string;
  enabled?: boolean;
  navigationLabel?: string;
};

export type HeroSectionData = BaseSection & {
  type: "hero";
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: LinkItem;
  secondaryAction?: LinkItem;
  highlights?: string[];
  aside?: {
    eyebrow?: string;
    stats?: StatItem[];
    checklistTitle?: string;
    checklist?: string[];
  };
};

export type FeatureGridSectionData = BaseSection & {
  type: "feature-grid";
  eyebrow?: string;
  title: string;
  description?: string;
  columns?: 2 | 3 | 4;
  items: FeatureItem[];
};

export type StepsSectionData = BaseSection & {
  type: "steps";
  eyebrow?: string;
  title: string;
  description?: string;
  steps: StepItem[];
};

export type SocialProofSectionData = BaseSection & {
  type: "social-proof";
  eyebrow?: string;
  title: string;
  description?: string;
  metrics?: StatItem[];
  testimonials?: TestimonialItem[];
};

export type FaqSectionData = BaseSection & {
  type: "faq";
  eyebrow?: string;
  title: string;
  description?: string;
  items: FaqItem[];
};

export type ContactSectionData = BaseSection & {
  type: "contact";
  eyebrow?: string;
  title: string;
  description?: string;
  details?: DetailItem[];
  formNote?: string;
};

export type PageSection =
  | HeroSectionData
  | FeatureGridSectionData
  | StepsSectionData
  | SocialProofSectionData
  | FaqSectionData
  | ContactSectionData;

export type LandingPageData = {
  sections: PageSection[];
};

export type NavigationItem = {
  href: string;
  label: string;
};

export function getEnabledSections<T extends PageSection>(sections: T[]) {
  return sections.filter((section) => section.enabled !== false);
}

export function getPageNavigation(sections: PageSection[]): NavigationItem[] {
  return getEnabledSections(sections)
    .filter((section) => Boolean(section.navigationLabel))
    .map((section) => ({
      href: `/#${section.id}`,
      label: section.navigationLabel!,
    }));
}

export function getSectionByType<TType extends PageSection["type"]>(
  sections: PageSection[],
  type: TType,
) {
  return sections.find(
    (section): section is Extract<PageSection, { type: TType }> =>
      section.type === type,
  );
}
