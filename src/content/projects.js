/**
 * Portfolio projects for King Business Studio.
 *
 * HONESTY RULES:
 * - The three initial entries are CONCEPT / DEMO work produced to demonstrate
 *   KBS capabilities. They are labelled as such everywhere they appear.
 * - No client names, no invented metrics, no invented testimonials and no
 *   "results" claims. `outcomes` describe what the deliverable contains, not
 *   business performance, because no performance data exists for concept work.
 * - `liveUrl` / `sourceUrl` stay empty until a real public URL exists.
 */

export const projectStatus = {
  concept: 'concept',
  demo: 'demo',
  real: 'real',
}

export const projects = [
  {
    id: 'p-001',
    slug: 'professional-company-profile',
    category: 'business-documents',
    status: projectStatus.concept,
    year: null,
    client: null,
    previewImage: '/images/portfolio/company-profile.png',
    galleryImages: [
      '/images/portfolio/company-profile.png',
      '/images/portfolio/company-profile-detail.png',
    ],
    tools: ['Word processing', 'Document layout', 'Editorial review'],
    liveUrl: '',
    sourceUrl: '',
    order: 1,
    locales: {
      en: {
        title: 'Professional Company Profile',
        description:
          'A concept company profile for a fictional business, showing how a clear structure, consistent formatting and concise copy can introduce a company to potential clients and partners.',
        objectives: [
          'Present the company in a single, scannable document',
          'Give the reader a clear understanding of what the business offers',
          'Keep the layout consistent so it can be reused with updated content',
        ],
        outcomes: [
          'A structured company profile covering overview, services and contact details',
          'Consistent typography, spacing and section order',
          'Editable sections so the owner can update content without redesigning the layout',
        ],
        note:
          'This is a concept project created to demonstrate KBS document design. It is not a real client engagement.',
      },
      rw: {
        title: "Icyo Makuru y'Ikigo (Company Profile)",
        description:
          "Uruhererekane rw'ikigo gikora imigani ukurikira kugira ngo twerekane ko ushobora gukora ibintu byose uko biringiye, mu buryo busanzwe, bugatandukanutse neza, no kugira ngo byerekane imirimo y'ikigo ku bintu byose byangobereye umukiriya.",
        objectives: [
          "Kwerekana ikigo mu gicece kimwe gisobanutuwe neza",
          'Kumfura umusura amagufu ko gukora ibintu ikigo gikora',
          'Kubika ibintu byose mu buryo bumwe kugira ngo byakemurwe nyuma y’ibindi',
        ],
        outcomes: [
          "Icyo makuru cy'ikigo gisobanuye ibyo ikigo gikora, ibikora n'uburyo bwo kuvugana",
          'Gihangamye n’uburyo bw’ibinyandiko, intera n’utorder',
          'Ibingi by’ibicece bishobora guhindurwa nta giho guhindura imbere',
        ],
        note:
          "Uyu mushinga ni igiho (concept) cyerekane ubushakashatsi bwa KBS mu gufatanya amanduku. Nta mushinga w'umukiriya nyakuri.",
      },
      fr: {
        title: "Profil d'Entreprise Professionnel",
        description:
          "Un profil d'entreprise conceptuel pour une société fictive, montrant comment une structure claire, une mise en forme cohérente et un texte concis peuvent présenter une entreprise à ses clients et partenaires potentiels.",
        objectives: [
          "Présenter l'entreprise dans un document unique et facile à parcourir",
          "Donner au lecteur une compréhension claire de l'offre de l'entreprise",
          'Conserver une mise en page cohérente pour réutiliser le document avec du contenu mis à jour',
        ],
        outcomes: [
          "Un profil d'entreprise structuré : présentation, services et coordonnées",
          'Une typographie, un espacement et un ordre de sections cohérents',
          "Des sections modifiables pour mettre à jour le contenu sans refaire la mise en page",
        ],
        note:
          "Ceci est un projet concept créé pour démontrer les compétences de KBS en mise en page de documents. Il ne s'agit pas d'une mission client réelle.",
      },
    },
  },
  {
    id: 'p-002',
    slug: 'modern-brand-identity',
    category: 'graphic-design',
    status: projectStatus.concept,
    year: null,
    client: null,
    previewImage: '/images/portfolio/brand-identity-detail.png',
    galleryImages: [
      '/images/portfolio/brand-identity.png',
      '/images/portfolio/brand-identity-detail.png',
    ],
    tools: ['Vector logo study', 'Colour system', 'Layout design'],
    liveUrl: '',
    sourceUrl: '',
    order: 2,
    locales: {
      en: {
        title: 'Modern Brand Identity',
        description:
          'A concept identity for a fictional brand, exploring how a simple logo, a restrained colour palette and a set of consistent applications can make a business recognisable across print and screen.',
        objectives: [
          'Create a logo that stays readable at small sizes',
          'Define a colour and type system that can be reused',
          'Show the identity applied to real-world materials such as cards and flyers',
        ],
        outcomes: [
          'A minimal logo concept with clear usage guidance',
          'A primary and neutral colour palette with type pairing',
          'Sample applications including a business card and a social post',
        ],
        note:
          'This is a concept project created to demonstrate KBS graphic design capability. It is not a real client engagement.',
      },
      rw: {
        title: "Igihano Gihanganara (Brand Identity)",
        description:
          "Igihano cy'igiho (concept) ku ikigo ribaho, gishyushye uko logo nziza, amabara yoroshye n'ibikoresho byose bishyushye byashobora gufasha ikigo kubonekana impande zose, ibinyabiziga no ku murongo w'ibintu.",
        objectives: [
          'Gukora logo isobanutuwe neza no gukomeza ku nto',
          'Gushyira ubuherakare bw’amabara n’ubwiboneke bw’inyandiko byakoreshwa',
          'Kwerekana igihano gikoreshejwe ku bintu bisanzwe, nk’ibikoresho by’ikigo n’amashusho',
        ],
        outcomes: [
          'Igihano cya logo nto, gifite amabwiriza y’ikoresho',
          'Amabara y’ibanze n’ayandi arangwa, hamwe no miterere y’inyandiko',
          "Ingero z'ikoresho: ikarita y'ikigo n'umwanduku w'uburasobe",
        ],
        note:
          'Uyu mushinga ni igiho (concept) cyerekane ubushakashatsi bwa KBS mu gushushanya. Nta mushinga w’umukiriya nyakuri.',
      },
      fr: {
        title: 'Identité de Marque Moderne',
        description:
          "Une identité conceptuelle pour une marque fictive, explorant comment un logo simple, une palette sobre et un ensemble d'applications cohérentes peuvent rendre une entreprise reconnaissable sur print et écran.",
        objectives: [
          'Créer un logo qui reste lisible à petite taille',
          'Définir un système de couleurs et de typographies réutilisable',
          "Montrer l'identité appliquée à des supports réels : cartes de visite, flyers",
        ],
        outcomes: [
          'Un concept de logo minimal accompagné de règles d’utilisation',
          'Une palette de couleurs primaires et neutres avec une typographie associée',
          "Des exemples d'application : carte de visite et publication sociale",
        ],
        note:
          "Ceci est un projet concept créé pour démontrer les compétences de KBS en design graphique. Il ne s'agit pas d'une mission client réelle.",
      },
    },
  },
  {
    id: 'p-003',
    slug: 'business-website-concept',
    category: 'web-development',
    status: projectStatus.demo,
    year: null,
    client: null,
    previewImage: '/images/portfolio/website-concept.png',
    galleryImages: [
      '/images/portfolio/website-concept.png',
      '/images/portfolio/website-concept-detail.png',
    ],
    tools: ['React', 'Tailwind CSS', 'Responsive layout'],
    liveUrl: '',
    sourceUrl: '',
    order: 3,
    locales: {
      en: {
        title: 'Business Website Concept',
        description:
          'A demonstration website concept for a fictional business, showing how a clear page structure, responsive layout and a simple contact path can present a company to new visitors.',
        objectives: [
          'Explain the business clearly within the first screen',
          'Make the next step (requesting a service) easy to find',
          'Keep the layout usable on phones, tablets and desktops',
        ],
        outcomes: [
          'A page structure covering hero, services, work, process and contact',
          'A responsive layout with a mobile navigation pattern',
          'A clear service-request path instead of a generic contact box',
        ],
        note:
          'This is a demo project created to demonstrate KBS web development capability. It is not a real client engagement.',
      },
      rw: {
        title: "Uruhererekane rw'Website y'Ikigo (Demo)",
        description:
          "Website yo kwerekana (demo) ku ikigo ribaho, ishyushye uko imbaraga y'imperusho igaragara neza, uburyo bwo kugaragara kuri buri screen, n'inzira yoroshye yo guhamagara bigatanga niba ibyo ukora bikwiye.",
        objectives: [
          'Kugaragaza ikigo neza mu gicece cy’isura mbere',
          'Gufasha umusura kubona inzira yo gusaba serivisi',
          'Gubungura imbaraga iboneka neza kuri telefoni, tabiti na mudashobha',
        ],
        outcomes: [
          "Imbaraga y'imperusho igira ku hero, serivisi, ibikoresho, uburyo bwo gukora na contact",
          'Imbaraga igaragara kuri buri screen hamwe n’uburyo bwo gushakisha menu',
          'Inzira yo gusaba serivisi idasanzwe, ariko igaragara',
        ],
        note:
          "Uyu mushinga ni demo igerekana ubushakashatsi bwa KBS mu gushyiramo website. Nta mushinga w'umukiriya nyakuri.",
      },
      fr: {
        title: "Concept de Site Web d'Entreprise (Démo)",
        description:
          "Un site web de démonstration pour une entreprise fictive, montrant comment une structure de pages claire, une mise en page responsive et un chemin de contact simple peuvent présenter une entreprise à ses nouveaux visiteurs.",
        objectives: [
          "Présenter clairement l'entreprise dès le premier écran",
          'Rendre la prochaine étape (demander un service) facile à trouver',
          "Garder une mise en page confortable sur mobile, tablette et ordinateur",
        ],
        outcomes: [
          "Une structure de pages : accroche, services, réalisations, processus et contact",
          'Une mise en page responsive avec un modèle de navigation mobile',
          "Un parcours de demande de service clair plutôt qu'un contact générique",
        ],
        note:
          "Ceci est une démo créée pour démontrer les compétences de KBS en développement web. Il ne s'agit pas d'une mission client réelle.",
      },
    },
  },
]

export const projectSlugs = projects.map((project) => project.slug)

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null
}

export function getProjectsByCategory(category) {
  if (!category || category === 'all') return projects
  return projects.filter((project) => project.category === category)
}

export default projects
