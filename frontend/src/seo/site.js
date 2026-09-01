export const SITE = {
  name: "Tunji Paul",
  legalName: "Paul Ogor",
  title: "Tunji Paul | AI Developer in Lagos, Nigeria",
  description:
    "Tunji Paul is an AI developer in Lagos, Nigeria, building intelligent, scalable systems with React, Python, and FastAPI. Explore projects, skills, and get in touch.",
  url: "https://tunjipaul.tech",
  locale: "en_NG",
  twitter: "@tunji_paul_",
  email: "ogorpaul877@gmail.com",
  phone: "+2349019978821",
  jobTitle: "AI Developer",
  location: {
    locality: "Lagos",
    region: "Lagos",
    country: "NG",
    countryName: "Nigeria",
  },
  ogImage:
    "https://res.cloudinary.com/dbadkovof/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_face/v1763236151/TUNJI_nemcvi.png",
  logo: "https://res.cloudinary.com/dbadkovof/image/upload/f_auto,q_auto,w_512,h_512,c_fill/v1763293388/Gemini_Generated_Image_kskrlhkskrlhkskr-removebg-preview_kqycov.png",
  portrait:
    "https://res.cloudinary.com/dbadkovof/image/upload/f_auto,q_auto,w_800,c_limit/v1763236151/TUNJI_nemcvi.png",
  sameAs: [
    "https://github.com/tunjipaul",
    "https://www.linkedin.com/in/paul-ogor-gmnse-9103601b1",
    "https://x.com/tunji_paul_",
    "https://medium.com/@tunji_paul_",
    "https://www.instagram.com/_tunji_paul/",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Python",
    "FastAPI",
    "JavaScript",
    "Frontend Development",
    "Backend Development",
  ],
};

export const PAGES = {
  home: {
    path: "/",
    title: SITE.title,
    description: SITE.description,
  },
  projects: {
    path: "/projects",
    title: "Projects | Tunji Paul — AI & Full-Stack Work",
    description:
      "Browse AI and full-stack projects by Tunji Paul, including live demos and GitHub repositories built with React, Python, and FastAPI.",
  },
  admin: {
    path: "/admin",
    title: "Admin Login | Tunji Paul",
    description: "Private admin login for Tunji Paul portfolio content management.",
    noindex: true,
  },
  dashboard: {
    path: "/dashboard",
    title: "Dashboard | Tunji Paul",
    description: "Private admin dashboard.",
    noindex: true,
  },
  notFound: {
    path: "/404",
    title: "Page Not Found | Tunji Paul",
    description: "This page does not exist. Return to Tunji Paul's portfolio to view projects, skills, and contact details.",
    noindex: true,
  },
};

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE.url,
    image: SITE.portrait,
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.locality,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.country,
    },
    sameAs: SITE.sameAs,
    knowsAbout: SITE.knowsAbout,
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: `${SITE.name} Portfolio`,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE.url}/#person` },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#service`,
    name: `${SITE.name} — AI Development`,
    url: SITE.url,
    image: SITE.logo,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: {
      "@type": "Country",
      name: SITE.location.countryName,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.locality,
      addressCountry: SITE.location.country,
    },
    founder: { "@id": `${SITE.url}/#person` },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(items[items.length - 1]?.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function projectListJsonLd(projects) {
  if (!projects?.length) return null;
  return {
    "@type": "ItemList",
    name: "Featured projects by Tunji Paul",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: project.demo || project.github || absoluteUrl("/projects"),
      description: project.desc,
    })),
  };
}

export const HOME_FAQS = [
  {
    question: "Who is Tunji Paul?",
    answer:
      "Tunji Paul (Paul Ogor) is an AI developer based in Lagos, Nigeria. He builds intelligent, scalable systems and modern frontend applications, and also writes and speaks on technology, politics, and governance.",
  },
  {
    question: "What technologies does Tunji Paul work with?",
    answer:
      "He works across the stack with React, JavaScript, Tailwind CSS, Python, FastAPI, MySQL, Git, and AI tooling — combining frontend engineering with backend and machine-learning systems.",
  },
  {
    question: "How can I hire or contact Tunji Paul?",
    answer:
      "Use the contact form on tunjipaul.tech, email ogorpaul877@gmail.com, or connect on LinkedIn. Resume and CV downloads are available on the contact section.",
  },
];
