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
  if (!study) return {};

  const title = `${study.title} case study | MBulan`;
  const url = `/work/${study.slug}`;
  return {
    title,
    description: study.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "MBulan",
      title,
      description: study.description,
      url,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const study = findStudy((await params).slug);
  if (!study) notFound();

  return <CaseStudy {...study} />;
}
