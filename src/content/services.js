/**
 * Service catalogue for King Business Studio.
 *
 * Every service is fully editable from this file. All customer-facing copy
 * exists in English, Kinyarwanda and French under `locales`.
 *
 * HONESTY RULES ENCODED HERE:
 * - No prices, packages, discounts, revision counts, deadlines or guarantees.
 *   Pricing stays quote-based until the owner confirms real figures.
 * - No claims about employment, funding, contracts, rankings or revenue.
 */

export const services = [
  {
    id: 'business-documents',
    slug: 'business-documents',
    icon: 'file-text',
    image: '/images/services/business-documents.svg',
    accent: 'royal',
    relatedFaqs: ['faq-documents-what', 'faq-request-process', 'faq-turnaround'],
    relatedProjects: ['professional-company-profile'],
    order: 1,
    locales: {
      en: {
        name: 'Business Documents',
        headline: 'Documents That Move Your Business Forward.',
        summary:
          'Clear, well-structured, professionally presented documents designed to help individuals and businesses communicate effectively.',
        description:
          'Every document is a business tool. A CV, a company profile or a proposal is often the first thing a client, employer or partner reads about you. We build documents that are easy to read, consistent with your brand, and structured so the important information is easy to find.',
        deliverables: [
          'CV and resume writing or improvement',
          'Cover letters',
          'Company profiles',
          'Business proposals',
          'Business plans',
          'Professional letters and reports',
          'Presentation decks',
          'Editable document templates',
          'Document formatting and proofreading',
        ],
        suitableFor: [
          'Professionals preparing a CV, resume or cover letter',
          'Start-ups and small businesses that need a company profile',
          'Teams responding to tenders or business proposals',
          'Students and graduates preparing academic or professional documents',
          'Anyone who needs an existing document reformatted and polished',
        ],
        provide: [
          'Your current document, if you already have one',
          'The role, client or purpose the document is for',
          'Your contact details and any relevant experience',
          'Your preferred style, tone or brand guidelines',
          'Any deadline you are working towards',
        ],
        outcomes: [
          'A clearer structure that guides the reader',
          'Consistent formatting that reflects a professional standard',
          'Content edited for clarity, accuracy and tone',
        ],
      },
      rw: {
        name: "Amanduku y'Ubucuruzi",
        headline: 'Amanduku arizavera Umurongo w’Umubiri w’Ubucuruzi.',
        summary:
          "Amanduku arangwa neza, yoherejwe neza, asanganira ubumenyi, byafasha indi n'abucuruzi kuganira neza.",
        description:
          "Buri gicece k'umwanduku ni gikoresho cy'ubucuruzi. CV, icyo makuru y'ikigo cyangwa imyaka y'umusanzwe ni byo mbwirwa na mugenzi, umu employer cyangwa u mugirane w'umusanzwe. Twiyungura amanduku ashyushye kandi ubyuma bwinshi, akora n'umwirongo w'ikigo wowe, akabyangana ibintu bikene by'umwuka.",
        deliverables: [
          "Gushyiramo no kunoza CV na imyaka",
          "Ibutumwa ry'ibanira imirimo",
          'Amarwi y’ikigo',
          'Imyaka y’ubucuruzi',
          'Gahunda y’ubucuruzi',
          'Amagambo n’ibikoresho by’abaturage by’umwuga',
          'Ibintu byerekana (presentations)',
          'Amateka y’amanduku ashobora guhindurwa',
          'Gutondeka no kugenzura amanduku',
        ],
        suitableFor: [
          "Umunyamuryango witegura CV, imyaka cyangwa ibutumwa ry'ibanira imirimo",
          "Ingabo z'umucuruzi n'ibigo bitandukanye bijyanye n'ikigo cyangwa icyo kinyabiziga",
          'Itsinda ryegura ibyifashisha cyangwa imyaka y’ubucuruzi',
          'Abanyamuryango bandi abagabwe',
          'Umuntu wese ukeneye guhindura no gutondeka igicece kindi',
        ],
        provide: [
          'Igiyanduku cyawe ukirahari, niba ukirahari',
          'Imirimo, ikigo cyangwa icyo urimo gukora',
          'Amafaranga yo guhamagara n’ubumenyi bwose bwawe',
          "Ibutumwa ry'uburyo busanzwe, imyitwarire cyangwa amabwiriza y'ikigo",
          'Igihe wishobora gukora',
        ],
        outcomes: [
          'Ubushakashatsi busobanutuwe neza',
          'Gihangamye ngiro gishyushye n’umurongo w’abah professionalism',
          'Umwanduku wozi ku ibisobanuro, ukuri no imyitwarire',
        ],
      },
      fr: {
        name: 'Documents Professionnels',
        headline: 'Des documents qui font avancer votre activité.',
        summary:
          'Des documents clairs, bien structurés et présentés de manière professionnelle pour aider les particuliers et les entreprises à communiquer efficacement.',
        description:
          "Chaque document est un outil de travail. Un CV, un profil d'entreprise ou une proposition est souvent la première chose qu'un client, un employeur ou un partenaire lit à votre sujet. Nous construisons des documents faciles à lire, cohérents avec votre image et structurés pour que l'information importante soit facile à trouver.",
        deliverables: [
          'Rédaction et amélioration de CV',
          'Lettres de motivation',
          "Profils d'entreprise",
          'Propositions commerciales',
          "Plans d'affaires",
          'Lettres et rapports professionnels',
          'Présentations',
          'Modèles de documents modifiables',
          'Mise en forme et relecture de documents',
        ],
        suitableFor: [
          'Professionnels préparant un CV ou une lettre de motivation',
          "Start-ups et petites entreprises nécessitant un profil d'entreprise",
          'Équipes répondant à des appels d’offres ou des propositions',
          'Étudiants et jeunes diplômés préparant des documents professionnels',
          "Toute personne ayant besoin de mettre en forme et d'embellir un document existant",
        ],
        provide: [
          'Votre document actuel, si vous en avez déjà un',
          "Le poste, le client ou l'objectif du document",
          'Vos coordonnées et votre expérience',
          'Votre style, ton ou vos règles de marque',
          "L'échéance que vous visez",
        ],
        outcomes: [
          'Une structure plus claire qui guide le lecteur',
          'Une mise en forme cohérente qui reflète un niveau professionnel',
          'Un contenu révisé pour la clarté, la précision et le ton',
        ],
      },
    },
  },
  {
    id: 'graphic-design',
    slug: 'graphic-design',
    icon: 'palette',
    image: '/images/services/graphic-design.svg',
    accent: 'bright',
    relatedFaqs: ['faq-design-brand', 'faq-request-process', 'faq-turnaround'],
    relatedProjects: ['modern-brand-identity'],
    order: 2,
    locales: {
      en: {
        name: 'Graphic Design',
        headline: 'Design That Makes Your Brand Memorable.',
        summary:
          'Creative visual materials that help businesses communicate consistently and present their brands professionally.',
        description:
          'A consistent visual identity makes a business easier to recognise and easier to trust. We create the visual building blocks your brand needs — from a logo and colour system to the flyers, posts and documents that carry your message in the real world.',
        deliverables: [
          'Logo design',
          'Brand identity concepts',
          'Business cards and stationery',
          'Flyers and posters',
          'Brochures',
          'Social media graphics',
          'Marketing materials',
          'Presentation and document layouts',
        ],
        suitableFor: [
          'New businesses that need a first visual identity',
          'Growing companies refreshing how they look',
          'Teams preparing consistent social media content',
          'Organisations that print flyers, posters or brochures regularly',
          'Professionals who need their documents to match their brand',
        ],
        provide: [
          'Your existing logo and brand materials, if you have them',
          'Your industry, audience and what you want people to remember',
          'Preferred colours, or examples of brands you like',
          'The formats you need the artwork in (print, screen, both)',
          'Where the artwork will be used first',
        ],
        outcomes: [
          'A visual system you can apply consistently',
          'Materials that look professional across print and screen',
          'A clearer brand impression for customers and partners',
        ],
      },
      rw: {
        name: 'Ugaragaza Ibinyabiziga',
        headline: 'Ugaragaza Ushoza Igihano cy’ikigo wowe.',
        summary:
          "Ibinyabiziga byiza bigafasha abucuruzi kuganira mu buryo bumwe, no kwerekana ikigo cyabo mu buryo bw'abaherezevuga.",
        description:
          "Umurongo w'ububonerangura wihanganira umugaragaza mu buryo bwinshi byiwuza ibucuruzi kurusho no gukoreshwa neza. Twiyungura ibisanzwe by'umubiriro ukenerwa n'ikigo wowe — ukusuka ku logo n'ubugara bw'amabara, kugeza ku mashusho, ibyoherezijwe no mu binyabiziga byoherekana ubutumwa bwanyu mu mazi y'ukuri.",
        deliverables: [
          'Gushyiramo logo',
          'Gutegereza igihano cy’ikigo',
          "Ibyimpande by'umukoro n'ibindi byanditse",
          'Amashusho n’amabare',
          'Amazu y’amaguru',
          'Ibinyabiziga by’uburasobe',
          'Ibikoresho by’ubucuruzi',
          'Iburaganzwe by’ibyerekana n’amanduku',
        ],
        suitableFor: [
          "Ibigo bishya bijyanye n'igihano cy'umubiriro",
          "Ibigo bigura bikaba bikongera gukura",
          'Itsinda ryategura ibinyabiziga by’uburasobe bishyushye',
          'Amashyiramo y’isanganya ry’amashusho n’amabare',
          "Abahereza bageneye amanduku yabo ahangana n'igihano cy'ikigo",
        ],
        provide: [
          'Logo yawe na ibinyabiziga by’ikigo, niba ubibikora',
          'Urwego w’akazi, abagenera b’umusanzwe, ibyo ushaka abakigira',
          'Amabara ukunda, cyangwa ingero z’ibigo ukunda',
          'Uburyo ukeneye ishusho (imyerekana, ikirangantego, byombi)',
          'Aho ishusho igiye gukoreshwa mbere',
        ],
        outcomes: [
          'Gahinga k’ububonerangura ukashyushyeye',
          'Ishusho rifite imbere y’umwuga bwa profesionali',
          'Igihano gisobanutuwe neza ku bakiriya n’abagirane',
        ],
      },
      fr: {
        name: 'Design Graphique',
        headline: 'Un design qui rend votre marque mémorable.',
        summary:
          'Des supports visuels créatifs qui aident les entreprises à communiquer de façon cohérente et à présenter leur marque de manière professionnelle.',
        description:
          "Une identité visuelle cohérente rend une entreprise plus facile à reconnaître et plus facile à faire confiance. Nous créons les éléments visuels dont votre marque a besoin — du logo et du système de couleurs aux flyers, publications et documents qui portent votre message dans le monde réel.",
        deliverables: [
          'Création de logo',
          "Concepts d'identité de marque",
          'Cartes de visite et papeterie',
          'Flyers et affiches',
          'Brochures',
          'Visuels pour les réseaux sociaux',
          'Supports marketing',
          "Mises en page de présentations et de documents",
        ],
        suitableFor: [
          "Nouvelles entreprises nécessitant une première identité visuelle",
          "Entreprises en croissance qui rafraîchissent leur image",
          "Équipes préparant des contenus sociaux cohérents",
          'Organisations qui impriment régulièrement flyers, affiches ou brochures',
          'Professionnels souhaitant harmoniser leurs documents avec leur marque',
        ],
        provide: [
          'Votre logo et vos supports actuels, si vous en avez',
          "Votre secteur, votre audience et ce que vous souhaitez qu'on retienne",
          'Vos couleurs préférées ou des exemples de marques que vous aimez',
          "Les formats dont vous avez besoin (impression, écran, les deux)",
          "Le premier endroit où la création sera utilisée",
        ],
        outcomes: [
          'Un système visuel que vous pouvez appliquer de façon cohérente',
          'Des supports d aspect professionnel sur impression et écran',
          'Une impression de marque plus claire auprès de vos clients et partenaires',
        ],
      },
    },
  },
  {
    id: 'web-development',
    slug: 'web-development',
    icon: 'monitor',
    image: '/images/services/web-development.svg',
    accent: 'deep',
    relatedFaqs: ['faq-website-process', 'faq-web-support', 'faq-request-process'],
    relatedProjects: ['business-website-concept'],
    order: 3,
    locales: {
      en: {
        name: 'Web Development',
        headline: 'Modern Websites Built Around Your Goals.',
        summary:
          'Responsive, user-focused digital experiences built to present businesses professionally and support their objectives.',
        description:
          'A website should make it easy for a visitor to understand what you do and take the next step. We build clean, responsive sites that load quickly, read well on every screen, and give you the structure you need to keep the content up to date.',
        deliverables: [
          'Business websites',
          'Personal portfolios',
          'Landing pages',
          'E-commerce websites',
          'Custom web applications',
          'Website redesigns',
          'Maintenance and improvements',
        ],
        suitableFor: [
          'Businesses that need a credible online presence',
          'Professionals building a personal portfolio',
          'Companies launching a product or campaign with a landing page',
          'Traders who want to sell online',
          'Teams with an existing site that no longer works for them',
        ],
        provide: [
          'The purpose of the site and the action you want visitors to take',
          'Your content (text, images, logos, contact details)',
          'Examples of sites you like and what you like about them',
          'Any features you know you need (contact form, products, booking, languages)',
          'Your domain preference, if you already have one',
        ],
        outcomes: [
          'A site that works well on phones, tablets and desktops',
          'A clear path for visitors to understand you and get in touch',
          'A structure you can extend as the business grows',
        ],
      },
      rw: {
        name: "Ubunyangamugayo b'Website",
        headline: 'Website za kijyariji zoherejwe ku Intego zanyu.',
        summary:
          'Ibyuma by’ubukoranyi bishyushye, bifite uburyo bwo kugaragara neza, byubatswe kugira ngo bigeze igihano cyawe ngo bikwiganye intego zawe.',
        description:
          "Website igomba kugira ngo umusura yarebe ko ibyo ukora bibonekana byose, maze akomeze inzira. Twiyungura websites nziza, zishyushye kandi zihanganira buri screen, zikora vuba, kandi ukabona imbaraga yo kugenda mu iterambere uko ikigo kigura.",
        deliverables: [
          'Websites z’abucuruzi',
          'Portfolio z’abahereza',
          'Landing pages',
          'Websites z’ubucuruzi bwo kucuruzwa',
          'Porogaramu za web zihangaywe igihe',
          'Kongera websites zashariwe',
          'Gubungura no guteza imbere websites',
        ],
        suitableFor: [
          'Abucuruzi bafite ubwihisho bwo kugaragara',
          "Abahereza bareka portfolio yabo",
          'Ibigo bigaragaza igicuruzwa cyangwa icyitegerezo',
          'Abacuruzi bashaka kucuruzha kuri internet',
          "Itsinda rifite website ishingiye gukora",
        ],
        provide: [
          'Intego ya website n’icyo ushaka umusura akore',
          'Ibyo birimo (ibinyandiko, amafoto, logo, contact details)',
          'Ingero z Websites ukunda n’ibyo ukunda ku byazo',
          'Ibyiciro wuzigire ko ukeneye (contact form, ibicuruzwa, kunyereza igihe, indimi)',
          "Iteka domain wowe niba ushikiye",
        ],
        outcomes: [
          'Website ikora neza kuri telefoni,tableti naMudashobha',
          'Inzira igaragara ku musura yo kumanya ibyo ukora no kutuhuza',
          'Imbaraga wowe wongera ubukene uko ikigo kigura',
        ],
      },
      fr: {
        name: 'Développement Web',
        headline: 'Des sites web modernes pensés pour vos objectifs.',
        summary:
          'Des expériences numériques responsives et centrées sur l’utilisateur, conçues pour présenter votre activité de façon professionnelle.',
        description:
          "Un site web doit permettre à un visiteur de comprendre rapidement ce que vous faites et de passer à l'étape suivante. Nous créons des sites nets, responsives et rapides à charger, qui se lisent bien sur tous les écrans et vous donnent une structure que vous pourrez faire évoluer.",
        deliverables: [
          "Sites web d'entreprise",
          'Portfolios personnels',
          'Landing pages',
          'Sites e-commerce',
          'Applications web sur mesure',
          'Refonte de sites existants',
          'Maintenance et améliorations',
        ],
        suitableFor: [
          "Entreprises qui ont besoin d'une présence en ligne crédible",
          'Professionnels qui construisent un portfolio',
          "Entreprises qui lancent un produit ou une campagne",
          'Commerçants qui souhaitent vendre en ligne',
          "Équipes dont le site actuel ne correspond plus à leurs besoins",
        ],
        provide: [
          "L'objectif du site et l'action attendue de vos visiteurs",
          'Vos contenus (textes, images, logos, coordonnées)',
          'Des exemples de sites que vous aimez et ce que vous y aimez',
          'Les fonctionnalités dont vous avez besoin (formulaire, produits, réservation, langues)',
          'Votre préférence de nom de domaine, si vous en avez déjà un',
        ],
        outcomes: [
          'Un site qui fonctionne bien sur mobile, tablette et ordinateur',
          'Un parcours clair pour comprendre votre activité et vous contacter',
          'Une structure que vous pourrez faire évoluer avec votre activité',
        ],
      },
    },
  },
]

export const serviceSlugs = services.map((service) => service.slug)

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug) ?? null
}

export function getServiceById(id) {
  return services.find((service) => service.id === id) ?? null
}

export default services
