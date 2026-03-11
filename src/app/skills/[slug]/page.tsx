import { notFound } from 'next/navigation'
import { skills, getSkillBySlug } from '@/lib/skills-data'
import SkillDetailClient from './skill-detail-client'

export function generateStaticParams() {
  return skills.map((skill) => ({
    slug: skill.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function SkillDetailPage({ params }: Props) {
  const { slug } = await params
  const skill = getSkillBySlug(slug)

  if (!skill) {
    notFound()
  }

  return <SkillDetailClient skill={skill} />
}
