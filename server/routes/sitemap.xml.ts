import opportunityData from '../../content/opportunities.json'
import type { OpportunityRecord } from '../../app/utils/opportunities'

const siteUrl = 'https://reseraproject.github.io'
const opportunities = opportunityData as OpportunityRecord[]

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'application/xml; charset=UTF-8')

  const staticRoutes = ['/', '/partners/', '/opportunities/']
  const entries = [
    ...staticRoutes.map(path => `  <url><loc>${siteUrl}${path}</loc></url>`),
    ...opportunities.map(item => `  <url><loc>${siteUrl}/opportunities/${item.slug}/</loc><lastmod>${item.published_at}</lastmod></url>`)
  ]

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>'
  ].join('\n')
})
