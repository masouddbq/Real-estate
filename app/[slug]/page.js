import { notFound } from "next/navigation";
import ProjectView from "@/components/ProjectView";
import { destinations, projectBySlug } from "@/lib/content";

export function generateStaticParams() {
  return destinations.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }) {
  const project = projectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} | ریالیویت`,
    description: project.lead,
  };
}

export default function ProjectPage({ params }) {
  const project = projectBySlug(params.slug);
  if (!project) notFound();
  return <ProjectView project={project} />;
}
