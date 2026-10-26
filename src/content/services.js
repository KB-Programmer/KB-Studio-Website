

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
    image: '/images/services/business-documents.png',
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
        name: "Inyandiko z'Ubucuruzi",
        headline: 'Inyandiko zifasha ubucuruzi bwawe gutera imbere.',
        summary:
          'Inyandiko zisobanutse, zitondetse neza kandi ziteguye mu buryo bw’umwuga, zifasha abantu ku giti cyabo n’ibigo gutanga ubutumwa bwabo neza.',
        description:
          "Buri nyandiko ishobora kugira uruhare rukomeye mu bucuruzi. CV, umwirondoro w’ikigo cyangwa inyandiko y’umushinga ni bimwe mu byo umukiriya, umukoresha cyangwa umufatanyabikorwa ashobora kubanza gusoma akumenyaho. Dutegura inyandiko zisomeka neza, zijyanye n’ikirango cyawe kandi zitondetse ku buryo amakuru y’ingenzi aboneka byoroshye.",
        deliverables: [
          'Kwandika cyangwa kunoza CV',
          'Amabaruwa asaba akazi',
          'Imyirondoro y’ibigo',
          'Inyandiko zigaragaza ibyifuzo by’ubucuruzi',
          'Gahunda z’ubucuruzi',
          'Amabaruwa na raporo by’umwuga',
          'Amadosiye y’ibiganiro (presentations)',
          'Inyandikorugero zishobora guhindurwa',
          'Gutegura imiterere y’inyandiko no kugenzura imyandikire',
        ],
        suitableFor: [
          'Abanyamwuga bategura CV cyangwa ibaruwa isaba akazi',
          'Ibigo bishya n’ibigo bito bikenera umwirondoro w’ikigo',
          'Amatsinda ategura ibisubizo by’amasoko cyangwa inyandiko z’imishinga',
          'Abanyeshuri n’abarangije amashuri bategura inyandiko z’amasomo cyangwa iz’umwuga',
          'Umuntu wese ushaka ko inyandiko asanganywe itunganywa kandi inozwa',
        ],
        provide: [
          'Inyandiko usanganywe, niba ihari',
          'Umwanya w’akazi, umukiriya cyangwa intego inyandiko igenewe',
          'Amakuru yawe yo kukubonera no kumenya uburambe bujyanye n’inyandiko',
          'Uburyo, imvugo cyangwa amabwiriza y’ikirango wifuza ko byubahirizwa',
          'Igihe ntarengwa wifuza ko inyandiko iba yarangiye',
        ],
        outcomes: [
          'Imiterere isobanutse iyobora usoma ku makuru y’ingenzi',
          'Imigaragarire ihamye kandi igaragaza ubunyamwuga',
          'Ibikubiye mu nyandiko binonosowe mu busobanuro, ukuri no mu mvugo',
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
    image: '/images/services/graphic-design.png',
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
        name: 'Graphic Design',
        headline: 'Ibishushanyo bituma ikirango cyawe kitibagirana.',
        summary:
          'Dukora ibikoresho bigaragara neza bifasha ibigo gutanga ubutumwa buhamye no kwerekana ibirango byabyo mu buryo bw’umwuga.',
        description:
          "Imigaragarire ihamye y’ikirango ifasha abantu kumenya ikigo no kukizera. Duhanga ibikoresho by’ingenzi bigize imigaragarire y’ikirango cyawe — kuva kuri logo n’amabara yacyo kugeza ku mafiriti, ibyapa, inyandiko n’amashusho yo ku mbuga nkoranyambaga bigaragaza ubutumwa bwawe.",
        deliverables: [
          'Guhanga logo',
          'Ibitekerezo n’imiterere y’ikirango',
          'Amakarita y’ubucuruzi n’ibikoresho byo mu biro',
          'Amafiriti n’ibyapa',
          'Udutabo twamamaza',
          'Ibishushanyo byo ku mbuga nkoranyambaga',
          'Ibikoresho byo kwamamaza',
          'Imiterere y’amadosiye y’ibiganiro n’inyandiko',
        ],
        suitableFor: [
          'Ibigo bishya bikenera imigaragarire ya mbere y’ikirango',
          'Ibigo biri gukura bishaka kuvugurura imigaragarire yabyo',
          'Amatsinda ategura ubutumwa buhamye bwo ku mbuga nkoranyambaga',
          'Imiryango n’ibigo bikenera gucapa amafiriti, ibyapa cyangwa udutabo kenshi',
          'Abanyamwuga bashaka ko inyandiko zabo zijyana n’ikirango cyabo',
        ],
        provide: [
          'Logo n’ibikoresho by’ikirango usanganywe, niba bihari',
          'Urwego ukoreramo, abo ugamije kugeraho n’ubutumwa wifuza ko bibuka',
          'Amabara ukunda cyangwa ingero z’ibirango ukunda',
          'Imiterere y’amadosiye ukeneye (ayo gucapa, ayo gukoresha kuri ecran cyangwa byombi)',
          'Aho igishushanyo kizakoreshwa mbere',
        ],
        outcomes: [
          'Imiterere y’ikirango ushobora gukoresha mu buryo buhamye',
          'Ibikoresho bigaragara neza ku mpapuro no kuri ecran',
          'Ubutumwa bw’ikirango busobanutse ku bakiriya n’abafatanyabikorwa',
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
    image: '/images/services/web-development.png',
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
        name: 'Gukora Imbuga za Internet',
        headline: 'Imbuga za internet zigezweho, zubakiye ku ntego zawe.',
        summary:
          'Dukora imbuga za internet zihuza n’ibikoresho bitandukanye kandi zorohereza abazikoresha, zigafasha ibigo kwigaragaza mu buryo bw’umwuga no kugera ku ntego zabyo.',
        description:
          "Urubuga rwa internet rugomba gufasha urusura kumva vuba ibyo ukora no kumenya intambwe ikurikira agomba gutera. Duhanga imbuga zisukuye, zihuta kandi zigaragara neza kuri ecran z’ubunini butandukanye, zikanaguha imiterere yoroshye kuvugurura uko ibikorwa byawe bigenda bitera imbere.",
        deliverables: [
          'Imbuga za internet z’ibigo n’ubucuruzi',
          'Imbuga zigaragaza ibikorwa n’ubushobozi bw’umuntu (portfolios)',
          'Imbuga zigenewe kwamamaza igicuruzwa cyangwa serivisi (landing pages)',
          'Imbuga z’ubucuruzi bukorerwa kuri internet (e-commerce)',
          'Porogaramu za internet zihariye',
          'Kuvugurura imbuga zisanzweho',
          'Kubungabunga no kunoza imbuga za internet',
        ],
        suitableFor: [
          'Ibigo bikenera kwigaragaza kuri internet mu buryo bwizewe',
          'Abanyamwuga bashaka urubuga rugaragaza ibikorwa byabo',
          'Ibigo bitangiza igicuruzwa cyangwa ubukangurambaga',
          'Abacuruzi bashaka kugurisha kuri internet',
          'Amatsinda afite urubuga rutagihuje n’ibyo akeneye',
        ],
        provide: [
          'Intego y’urubuga n’icyo wifuza ko urusura akora',
          'Ibikubiye ku rubuga: inyandiko, amafoto, logo n’amakuru yo kukubonera',
          'Ingero z’imbuga ukunda n’impamvu uzikunda',
          'Imikorere ukeneye, urugero: ifishi yo kukwandikira, ibicuruzwa, kubika gahunda cyangwa indimi',
          'Izina rya domain wifuza, niba waramaze kurihitamo',
        ],
        outcomes: [
          'Urubuga rukora neza kuri telefoni, tableti na mudasobwa',
          'Uburyo busobanutse bufasha urusura kumenya ibyo ukora no kukugeraho',
          'Imiterere ishobora kwagurwa uko ibikorwa byawe bikura',
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

