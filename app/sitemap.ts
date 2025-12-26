import { MetadataRoute } from "next";

const BASE_URL = "https://www.alexandraribeiro.pt";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/pt`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/pt/services`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en/services`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/pt/about`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en/about`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/pt/blog`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en/blog`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/pt/portfolio`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en/portfolio`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/pt/store`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en/store`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/pt/contact`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/en/contact`,
      lastModified: new Date(),
    },
  ];
}
