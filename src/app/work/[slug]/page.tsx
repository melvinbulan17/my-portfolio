import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/sections/CaseStudy";
import { caseStudies } from "@/content/caseStudies";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

const findStudy = (slug: string) =>
  caseStudies.find((study) => study.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = findStudy((await params).slug);
  return study
    ? {
        title: `${study.title} case study | MBulan`,
        description: study.description,
      }
    : {};
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const study = findStudy((await params).slug);
  if (!study) notFound();

  return <CaseStudy {...study} />;
}
