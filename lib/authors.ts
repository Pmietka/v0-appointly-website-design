export type Author = {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  /** Personal LinkedIn profile, shown on /about. */
  linkedin: string;
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
    givenName: "Patrick",
    familyName: "Mietka",
    linkedin: "https://www.linkedin.com/in/patrickmietka",
    role: "Co-founder, Appointly Solutions",
    bio:
      "Patrick runs the Meta ad campaigns and the numbers behind every Appointly client. He has managed lead generation and appointment booking for floor coating and home service contractors across the US, and writes about what actually turns ad spend into booked estimates.",
    image: `${siteUrl}/images/team/patrick.jpg`,
    url: `${siteUrl}/about#patrick-mietka`,
    sameAs: ["https://www.linkedin.com/in/patrickmietka"],
  },
  jacob: {
    id: "jacob",
    name: "Jacob Mietka",
    givenName: "Jacob",
    familyName: "Mietka",
    linkedin: "https://www.linkedin.com/in/jacob-mietka/",
    role: "Co-founder, Appointly Solutions",
    bio:
      "Jacob makes every call to every Appointly lead himself, texting and calling each homeowner within one minute, qualifying them on intent, and booking the estimate. He has helped scale more than 20 home service businesses and talks to contractors every day about their markets, crews, and calendars.",
    image: `${siteUrl}/images/team/jacob.jpg`,
    url: `${siteUrl}/about#jacob-mietka`,
    sameAs: ["https://www.linkedin.com/in/jacob-mietka/"],
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
    givenName: author.givenName,
    familyName: author.familyName,
    jobTitle: author.role,
    description: author.bio,
    image: author.image,
    url: author.url,
    sameAs: author.sameAs,
    worksFor: { "@id": `${siteUrl}/#organization`, name: "Appointly Solutions" },
    homeLocation: { "@type": "Place", name: "Chicago, IL" },
  };
}
