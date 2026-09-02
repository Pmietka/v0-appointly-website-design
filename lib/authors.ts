export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  url: string;
  sameAs: string[];
};

const siteUrl = "https://getappointly.co";

export const authors: Record<string, Author> = {
  patrick: {
    id: "patrick",
    name: "Patrick Mietka",
    role: "Co-founder, Appointly Solutions",
    bio:
      "Patrick runs the Meta ad campaigns and the numbers behind every Appointly client. He has managed lead generation and appointment booking for floor coating and home service contractors across the US, and writes about what actually turns ad spend into booked estimates.",
    image: `${siteUrl}/images/team/patrick.jpg`,
    url: `${siteUrl}/about#patrick-mietka`,
    sameAs: ["https://www.linkedin.com/company/appointlysolutions"],
  },
  jacob: {
    id: "jacob",
    name: "Jacob Mietka",
    role: "Co-founder, Appointly Solutions",
    bio:
      "Jacob leads speed to lead and appointment booking at Appointly. He has helped scale more than 20 home service businesses and talks to contractors every day about their markets, crews, and calendars.",
    image: `${siteUrl}/images/team/jacob.jpg`,
    url: `${siteUrl}/about#jacob-mietka`,
    sameAs: ["https://www.linkedin.com/company/appointlysolutions"],
  },
};

export function getAuthor(id?: string): Author {
  return authors[id ?? "patrick"] ?? authors.patrick;
}

export function personSchema(author: Author) {
  return {
    "@type": "Person",
    "@id": author.url,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.image,
    url: author.url,
    sameAs: author.sameAs,
    worksFor: { "@id": `${siteUrl}/#organization` },
  };
}
