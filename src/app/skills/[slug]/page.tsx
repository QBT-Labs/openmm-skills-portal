import { notFound } from 'next/navigation'
import { skills, getSkillBySlug } from '@/lib/skills-data'
import SkillDetailClient from './skill-detail-client'

export function generateStaticParams() {
  return skills.map((skill) => ({
    slug: skill.slug,
  }))
}

export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skill = getSkillBySlug(params.slug)

  if (!skill) {
    notFound()
  }

  return <SkillDetailClient skill={skill} />
}
