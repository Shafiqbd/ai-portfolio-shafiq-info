import type { MetadataRoute } from "next";
import { site } from "@shafiq-info/config";
import { getCaseStudies } from "@/services/case-study.service";
import { getArticles } from "@/services/article.service";
import { getServices } from "@/services/service.service";

const STATIC_ROUTES = [
  "",
  "/about",
  "/projects",
  "/case-studies",
  "/articles",
  "/services",
  "/resume",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, articles, services] = await Promise.all([
    getCaseStudies(),
    getArticles(),
    getServices(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: `${site.url}/case-studies/${caseStudy.slug}`,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${site.url}/articles/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${site.url}/services/${service.slug}`,
  }));

  return [...staticEntries, ...caseStudyEntries, ...articleEntries, ...serviceEntries];
}
