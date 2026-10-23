

/**
 * KBS Customer Support Assistant — knowledge base.
 *
 * This file is the ONLY source of truth for what the assistant is allowed to
 * say. It is edited by the business owner: add an intent, add aliases, add a
 * reviewed answer in each language, and the assistant picks it up.
 *
 * STRUCTURE OF AN INTENT
 * ----------------------
 * id        unique identifier
 * requires  array of "concept groups". At least ONE group must match for the
 *           intent to be eligible. Each group is an array of interchangeable
 *           terms. This is what stops unrelated questions from matching.
 * aliases   flat list of phrasings per language. Multi-word aliases score
 *           higher because they are more specific.
 * variants  optional more specific answers inside the same intent.
 * answer    the reviewed answer, per language.
 * followUps suggested next questions, per language.
 * links     relevant site pages with localised labels.
 *
 * HONESTY RULES FOR EVERY ANSWER HERE
 * -----------------------------------
 * No prices, no deadlines, no client names, no guarantees, no contact details
 * that have not been confirmed, and never a claim that a request was sent.
 */

export const supportIntents = [
  /* ------------------------------------------------------------------ */
  /* Greetings                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "greeting",
    requires: [
      [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "greetings",
        "salut",
        "bonjour",
        "muraho",
        "muhitamo",
        "muri kazi",
        "muri biki",
      ],
    ],
    aliases: {
      en: [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "hi there",
        "hello there",
      ],
      rw: [
        "muraho",
        "muhitamo",
        "muri kazi",
        "muri biki",
        "ibio munsi",
        "mwaramukanya",
      ],
      fr: ["bonjour", "bonsoir", "salut", "coucou", "bonjour a vous", "hello"],
    },
    answer: {
      en: "Hello, and welcome to King Business Studio. I can help you explore our services, find answers to common questions, and prepare a service request. What would you like to know?",
      rw: "Muraho, murakaza neza muri King Business Studio (KBS). Nshobora kubafasha kumenya serivisi dutanga, gusubiza ibibazo bikunze kubazwa no gutegura ubusabe bwa serivisi. Ni iki mwifuza kumenya?",
      fr: "Bonjour et bienvenue chez King Business Studio. Je peux vous aider à découvrir nos services, à trouver des réponses aux questions fréquentes et à préparer une demande de service. Que souhaitez-vous savoir ?",
    },
    followUps: {
      en: [
        "What services does KBS offer?",
        "How do I request a service?",
        "How much does a project cost?",
      ],
      rw: [
        "Ni izihe serivisi KBS itanga?",
        "Nigute nasaba serivisi?",
        "Igiciro cy’umushinga gitegurwa gite?",
      ],
      fr: [
        "Quels services KBS propose-t-il ?",
        "Comment demander un service ?",
        "Combien coûte un projet ?",
      ],
    },
    links: [
      {
        to: "/services",
        label: {
          en: "Explore our services",
          rw: "Reba serivisi dutanga",
          fr: "Découvrir nos services",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Capabilities / honesty                                              */
  /* ------------------------------------------------------------------ */
  {
    id: "agent_capabilities",
    requires: [
      [
        "are you a human",
        "are you a robot",
        "are you ai",
        "are you real",
        "who are you",
        "what are you",
        "chatbot",
        "chat bot",
        "real person",
        "real human",
        "ni umuntu",
        "imashine",
        "chatbot",
        "eteso",
        "robot",
        "human",
        "qui etes-tu",
        "etes tu un humain",
        "robot",
        "chatbot",
        "une vraie personne",
      ],
    ],
    aliases: {
      en: [
        "are you a human",
        "are you a robot",
        "are you real",
        "who are you",
        "what are you",
        "are you ai",
        "are you chatgpt",
        "is this a real person",
        "am i talking to a bot",
      ],
      rw: [
        "uri umuntu",
        "uri roboti",
        "uri inkina",
        "ni ute",
        "wowe ni iki",
        "uri chatgpt",
        "mugaragaza nta muntu",
      ],
      fr: [
        "es tu un humain",
        "es tu un robot",
        "es tu reel",
        "qui es tu",
        "es tu une ia",
        "es tu chatgpt",
        "je parle avec une vraie personne",
      ],
    },
    answer: {
      en: "I'm the KBS Customer Support Assistant — an automated, rule-based support assistant that answers using King Business Studio's approved website information. I'm not a person and I don't use a generative AI model, so I can only help with the topics in the knowledge base. For anything else, the KBS team can help directly through the Request a Service or Contact pages.",
      rw: "Ndi umufasha w’abakiriya wa KBS ukoresha amategeko n’amakuru yemejwe na King Business Studio. Si umuntu kandi sinakoresha ikoranabuhanga rya AI ribyara ibisubizo bishya; nshobora gusubiza ibibazo biri mu bumenyi nahawe gusa. Ku bindi bibazo, mushobora kuvugana n’itsinda rya KBS munyura ku mapaji yo Gusaba Serivisi cyangwa Aho Mutuvugisha.",
      fr: "Je suis l'assistant de support KBS — un assistant automatisé, fondé sur des règles, qui répond à partir des informations approuvées du site de King Business Studio. Je ne suis pas une personne et je n'utilise pas de modèle d'IA générative : je ne peux donc répondre que sur les sujets présents dans la base de connaissances. Pour le reste, l'équipe KBS peut vous aider via les pages Demander un service ou Contact.",
    },
    followUps: {
      en: ["What services does KBS offer?", "How do I request a service?"],
      rw: ["Ni izihe serivisi KBS itanga?", "Nigute nasaba serivisi?"],
      fr: [
        "Quels services KBS propose-t-il ?",
        "Comment demander un service ?",
      ],
    },
    links: [
      {
        to: "/request-service",
        label: {
          en: "Request a service",
          rw: "Saba serivisi",
          fr: "Demander un service",
        },
      },
      {
        to: "/contact",
        label: { en: "Contact KBS", rw: "Twandikire", fr: "Contacter KBS" },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Services overview                                                  */
  /* ------------------------------------------------------------------ */
  {
    id: "services_overview",
    requires: [
      [
        "services",
        "service",
        "what do you do",
        "offer",
        "offerings",
        "serivisi",
        "serivisi zabo",
        "munaka",
        "offrez",
        "que faites-vous",
        "prestations",
        "votre travail",
      ],
    ],
    aliases: {
      en: [
        "what services",
        "which services",
        "services do you offer",
        "what do you offer",
        "service categories",
        "your services",
        "what can you do",
        "areas of expertise",
        "what kind of work",
        "help me with",
      ],
      rw: [
        "ni ubuhe serivisi",
        "serivisi zabo",
        "serivisi mwo mutanga",
        "ni ubuhe akazi",
        "ibyo mumaze",
        "ibyo mutanga",
      ],
      fr: [
        "quels services",
        "quelles prestations",
        "services proposez",
        "que faites-vous",
        "vos services",
        "votre expertise",
        "que savez-vous faire",
      ],
    },
    answer: {
      en: "King Business Studio provides Business Documents, Graphic Design and Web Development services.\n\n• Business Documents — CVs, cover letters, company profiles, proposals, business plans, professional letters and reports, presentations, editable templates, formatting and proofreading.\n• Graphic Design — logo design, brand identity concepts, business cards and stationery, flyers and posters, brochures, social media graphics and marketing materials.\n• Web Development — business websites, personal portfolios, landing pages, e-commerce websites, custom web applications, redesigns, and maintenance and improvements.\n\nOpen the Services page for the full overview of each service.",
      rw: "King Business Studio itanga serivisi eshatu z’ingenzi:\n\n• **Inyandiko z’Ubucuruzi** — gukora no kunoza CV, amabaruwa asaba akazi, imyirondoro y’ibigo, inyandiko z’imishinga, gahunda z’ubucuruzi, raporo, inyandiko z’umwuga, ibiganiro-mbonerahamwe, inyandikorugero zihindurwa, gutunganya imiterere no gukosora inyandiko.\n• **Igishushanyo mbonera** — gukora logo, imiterere ndangamuranga y’ikigo, amakarita y’akazi, impapuro z’ibiro, ibyapa, udupapuro twamamaza, udutabo n’amashusho yo ku mbuga nkoranyambaga.\n• **Iterambere rya Website** — gukora website z’ibigo, iz’umwirondoro w’umuntu ku giti cye, landing pages, amaduka yo kuri internet, porogaramu za web zihariye, kuvugurura website no kuzibungabunga.\n\nSura ipaji ya Serivisi kugira ngo umenye ibisobanuro birambuye kuri buri serivisi.",
      fr: "King Business Studio propose trois services : Documents Professionnels, Design Graphique et Développement Web.\n\n• Documents Professionnels — CV, lettres de motivation, profils d'entreprise, propositions commerciales, plans d'affaires, lettres et rapports professionnels, présentations, modèles modifiables, mise en forme et relecture.\n• Design Graphique — création de logo, identité de marque, cartes de visite et papeterie, flyers et affiches, brochures, visuels pour les réseaux sociaux, supports marketing.\n• Développement Web — sites d'entreprise, portfolios personnels, landing pages, sites e-commerce, applications web sur mesure, refontes, maintenance et améliorations.\n\nConsultez la page Services pour le détail de chaque prestation.",
    },
    followUps: {
      en: [
        "Can KBS help with a CV?",
        "Do you do logos and brand identity?",
        "Can KBS build an e-commerce website?",
      ],
      rw: [
        "KBS ishobora gufasha mu CV?",
        "Muteka logo n’igihano cy’ikigo?",
        "KBS ishobora gukora website y’ubucuruzi?",
      ],
      fr: [
        "KBS peut-il aider avec un CV ?",
        "Proposez-vous des logos et identités de marque ?",
        "KBS peut-il créer un site e-commerce ?",
      ],
    },
    links: [
      {
        to: "/services",
        label: {
          en: "View all services",
          rw: "Reba serivisi zose dutanga",
          fr: "Voir tous les services",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Business documents                                                  */
  /* ------------------------------------------------------------------ */
  {
    id: "business_documents",
    requires: [
      [
        "document",
        "documents",
        "cv",
        "resume",
        "curriculum vitae",
        "cover letter",
        "proposal",
        "business plan",
        "company profile",
        "report",
        "presentation",
        "proofread",
        "formatting",
        "letter",
        "template",
        "umwanduku",
        "imanduku",
        "cv",
        "imyaka",
        "proposal",
        "rapo",
        "template",
        "document",
        "cv",
        "lettre",
        "rapport",
        "presentation",
        "modele",
      ],
    ],
    aliases: {
      en: [
        "business document",
        "business documents",
        "documents",
        "document",
        "writing services",
        "proofreading",
        "formatting",
        "editable template",
        "professional writing",
        "word processing",
      ],
      rw: [
        "amanduku y’ubucuruzi",
        "umwanduku",
        "imanduku",
        "ibinyandiko by’abahereza",
        "kugenzura imanduku",
        "gutondeka imanduku",
        "ibikoresho bisanzwe",
      ],
      fr: [
        "document professionnel",
        "documents professionnels",
        "documents",
        "document",
        "redaction professionnelle",
        "relecture",
        "mise en forme",
        "modele modifiable",
      ],
    },
    variants: [
      {
        id: "cv",
        requires: [
          [
            "cv",
            "resume",
            "curriculum vitae",
            "cv writing",
            "resume writing",
            "cover letter",
            "lettre de motivation",
          ],
        ],
        aliases: {
          en: [
            "cv",
            "resume",
            "curriculum vitae",
            "cv writing",
            "resume writing",
            "cover letter",
            "help with a cv",
            "write my cv",
            "improve my cv",
            "write a resume",
            "cover letter",
          ],
          rw: [
            "cv",
            "imyaka",
            "curriculum vitae",
            "gufasha mu cv",
            "kunyika cv",
            "imyaka y’abahereza",
            "ibutumwa ry’ibanira imirimo",
          ],
          fr: [
            "cv",
            "resume",
            "curriculum vitae",
            "redaction de cv",
            "ameliorer mon cv",
            "ecrire un cv",
            "lettre de motivation",
          ],
        },
        answer: {
          en: "Yes. Business Documents services may include CV and resume writing or improvement, cover letters, professional document formatting and proofreading. When you request a CV, it helps to share the role you are targeting and any existing version of the document.",
          rw: "Yego. Serivisi y’Inyandiko z’Ubucuruzi ishobora kubamo gukora cyangwa kunoza CV, kwandika ibaruwa isaba akazi, gutunganya imiterere y’inyandiko no gukosora amakosa. Niba ushaka ko tugufasha kuri CV, tubwire umwanya w’akazi ugamije kandi, niba uyifite, wohereze CV usanzwe ukoresha.",
          fr: "Oui. Les Documents Professionnels peuvent inclure la rédaction ou l'amélioration de CV, les lettres de motivation, la mise en forme et la relecture. Pour un CV, indiquez le poste visé et transmettez si possible une version existante du document.",
        },
        followUps: {
          en: [
            "How do I request a service?",
            "What else can you write for me?",
          ],
          rw: ["Nigute nasaba serivisi?", "Ni ubuhe bwoko bwindi bwinyandiko?"],
          fr: [
            "Comment demander un service ?",
            "Que pouvez-vous d’autre rédiger ?",
          ],
        },
        links: [
          {
            to: "/services/business-documents",
            label: {
              en: "Business Documents service",
              rw: "Serivisi y’Inyandiko z’Ubucuruzi",
              fr: "Service Documents Professionnels",
            },
          },
        ],
      },
      {
        id: "proposal",
        requires: [
          [
            "proposal",
            "proposals",
            "business proposal",
            "tender",
            "business plan",
            "company profile",
            "proposition",
            "proposition commerciale",
            "plan d affaires",
            "offre",
          ],
        ],
        aliases: {
          en: [
            "proposal",
            "proposals",
            "business proposal",
            "write a proposal",
            "tender response",
            "business plan",
            "company profile",
            "company profile document",
            "pitch document",
          ],
          rw: [
            "proposal",
            "imyaka y’ubucuruzi",
            "gahunda y’ubucuruzi",
            "amarwi y’ikigo",
            "gusubiza imyaka",
            "inkunga",
          ],
          fr: [
            "proposition",
            "propositions commerciales",
            "proposition commerciale",
            "plan d affaires",
            "profil d entreprise",
            "reponse a un appel d offres",
          ],
        },
        answer: {
          en: "Business Documents services can include business proposals, business plans and company profiles. These are built around your actual content, so the more context you can share — the client, the objectives and the format required — the more useful the document will be.",
          rw: "Serivisi y’Inyandiko z’Ubucuruzi ishobora kubamo inyandiko zerekana umushinga, gahunda y’ubucuruzi n’umwirondoro w’ikigo. Izo nyandiko zitegurwa hashingiwe ku makuru nyayo mutanga. Kugira ngo zirusheho kuba ingirakamaro, muduhe amakuru ku bo zigenewe, intego yazo n’imiterere cyangwa ibisabwa zigomba gukurikiza.",
          fr: "Les Documents Professionnels peuvent inclure des propositions commerciales, des plans d'affaires et des profils d'entreprise. Ils sont construits sur vos contenus réels : plus vous partagez de contexte (client, objectifs, format attendu), plus le document sera utile.",
        },
        followUps: {
          en: ["How do I request a service?", "How long will it take?"],
          rw: ["Nigute nasaba serivisi?", "Umushinga uzamara igihe kingana iki?"],
          fr: [
            "Comment demander un service ?",
            "Combien de temps cela prendra-t-il ?",
          ],
        },
        links: [
          {
            to: "/services/business-documents",
            label: {
              en: "Business Documents service",
              rw: "Serivisi y’Inyandiko z’Ubucuruzi",
              fr: "Service Documents Professionnels",
            },
          },
        ],
      },
    ],
    answer: {
      en: "Business Documents services cover CVs and resumes, cover letters, company profiles, business proposals, business plans, professional letters and reports, presentations, editable document templates, plus formatting and proofreading. The goal is a document that reads clearly and presents you professionally.",
      rw: "Serivisi y’Inyandiko z’Ubucuruzi ikubiyemo gukora no kunoza CV, amabaruwa asaba akazi, imyirondoro y’ibigo, inyandiko z’imishinga, gahunda z’ubucuruzi, amabaruwa na raporo by’umwuga, ibiganiro-mbonerahamwe, inyandikorugero zihindurwa, gutunganya imiterere no gukosora inyandiko. Intego ni ugutegura inyandiko zumvikana neza kandi zigaragaza ubunyamwuga.",
      fr: "Les Documents Professionnels couvrent les CV et resumes, lettres de motivation, profils d'entreprise, propositions et plans d'affaires, lettres et rapports professionnels, présentations, modèles modifiables, ainsi que la mise en forme et la relecture. L'objectif : un document clair qui vous présente de manière professionnelle.",
    },
    followUps: {
      en: [
        "How do I request a service?",
        "How long will my project take?",
        "See an example project",
      ],
      rw: [
        "Nigute nasaba serivisi?",
        "Umushinga wanjye uzamara igihe iki?",
        "Reba umushinga w’icyitegererezo",
      ],
      fr: [
        "Comment demander un service ?",
        "Combien de temps prendra mon projet ?",
        "Voir un projet exemple",
      ],
    },
    links: [
      {
        to: "/services/business-documents",
        label: {
          en: "Business Documents service",
          rw: "Serivisi y’Inyandiko z’Ubucuruzi",
          fr: "Service Documents Professionnels",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Graphic design                                                     */
  /* ------------------------------------------------------------------ */
  {
    id: "graphic_design",
    requires: [
      [
        "design",
        "graphic design",
        "logo",
        "brand",
        "branding",
        "flyer",
        "poster",
        "brochure",
        "business card",
        "stationery",
        "social media graphic",
        "visual identity",
        "ugaraagaza",
        "logo",
        "ikigo",
        "igihano",
        "imashusho",
        "amabare",
        "amazu y’amaguru",
        "ububoni bw’umubiriro",
        "design",
        "graphique",
        "logo",
        "marque",
        "identite",
        "flyer",
        "affiche",
        "brochure",
        "carte de visite",
        "papeterie",
        "visuel",
      ],
    ],
    aliases: {
      en: [
        "graphic design",
        "design services",
        "logo design",
        "design a logo",
        "brand identity",
        "branding",
        "visual identity",
        "flyers",
        "posters",
        "brochures",
        "business cards",
        "stationery",
        "social media graphics",
        "marketing materials",
        "design work",
        "can you design",
      ],
      rw: [
        "ugaragaza ibinyabiziga",
        "gushyiramo logo",
        "igihano cy’ikigo",
        "ububoni bw’umubiriro",
        "amashusho",
        "amabare",
        "amazu y’amaguru",
        "ibikoresho by’ikigo",
        "ibinyabiziga by’uburasobe",
        "ibikoresho by’ubucuruzi",
        "ushobora gushushanya",
      ],
      fr: [
        "design graphique",
        "creation de logo",
        "identite de marque",
        "charte graphique",
        "flyers",
        "affiches",
        "brochures",
        "cartes de visite",
        "papeterie",
        "visuels pour les reseaux sociaux",
        "supports marketing",
        "pouvez-vous designer",
      ],
    },
    variants: [
      {
        id: "logo",
        requires: [
          [
            "logo",
            "logo design",
            "brand mark",
            "emblem",
            "logo",
            "marque",
            "symbole",
          ],
        ],
        aliases: {
          en: [
            "logo",
            "logo design",
            "design a logo",
            "create a logo",
            "need a logo",
            "logo for my business",
            "business logo",
          ],
          rw: [
            "logo",
            "gushyiramo logo",
            "nkeneye logo",
            "logo y’ikigo",
            "gushushanya logo",
          ],
          fr: [
            "logo",
            "creation de logo",
            "faire un logo",
            "j ai besoin d un logo",
            "logo pour mon entreprise",
          ],
        },
        answer: {
          en: "Logo design is part of the Graphic Design service. A good logo starts with a short conversation about your industry, your audience and what you want people to remember. We can then explore a few directions and confirm the scope before any final work is agreed.",
          rw: "Gukora logo ni imwe muri serivisi z’Igishushanyo Mbonera. Dutangira tuganira ku rwego rw’ubucuruzi bwanyu, abo mugamije kugeraho n’ubutumwa mushaka ko logo yanyu itanga. Nyuma y’ibyo, dushobora gutegura ibitekerezo bitandukanye, tukumvikana ku byo umushinga uzaba ukubiyemo mbere yo gutangira imirimo ya nyuma.",
          fr: "La création de logo fait partie du service Design Graphique. Un bon logo commence par un court échange sur votre secteur, votre audience et ce que vous souhaitez qu'on retienne. Nous pouvons ensuite explorer quelques pistes et valider le périmètre avant toute validation finale.",
        },
        followUps: {
          en: ["See a brand identity example", "How do I request a service?"],
          rw: ["Reba urugero rw’imiterere ndangamuranga y’ikigo", "Nigute nasaba serivisi?"],
          fr: [
            "Voir un exemple d'identité de marque",
            "Comment demander un service ?",
          ],
        },
        links: [
          {
            to: "/portfolio/modern-brand-identity",
            label: {
              en: "Brand identity example",
              rw: "Urugero rw’imiterere ndangamuranga y’ikigo",
              fr: "Exemple d’identité de marque",
            },
          },
        ],
      },
    ],
    answer: {
      en: "Graphic Design services cover logo design, brand identity concepts, business cards and stationery, flyers and posters, brochures, social media graphics, marketing materials, and presentation and document layouts. The aim is a visual system you can apply consistently so your business looks the same everywhere it appears.",
      rw: "Serivisi y’Igishushanyo Mbonera ikubiyemo gukora logo, ibitekerezo by’imiterere ndangamuranga y’ikigo, amakarita y’akazi n’impapuro z’ibiro, ibyapa n’udupapuro twamamaza, udutabo, amashusho yo ku mbuga nkoranyambaga n’ibikoresho byo kwamamaza, ndetse no gutunganya imiterere y’inyandiko n’ibiganiro-mbonerahamwe. Intego ni ugufasha ikigo kugira isura ihamye kandi imenyekana aho kigaragariye hose.",
      fr: "Le Design Graphique couvre la création de logo, les concepts d'identité de marque, cartes de visite et papeterie, flyers et affiches, brochures, visuels pour les réseaux sociaux, supports marketing, et mises en page de présentations et documents. L'objectif : un système visuel applicable de façon cohérente, pour une image identique partout.",
    },
    followUps: {
      en: [
        "See a brand identity example",
        "How do I request a service?",
        "How long will it take?",
      ],
      rw: [
        "Reba urugero rw’imiterere ndangamuranga y’ikigo",
        "Nigute nasaba serivisi?",
        "Umushinga uzamara igihe kingana iki?",
      ],
      fr: [
        "Voir un exemple d'identité de marque",
        "Comment demander un service ?",
        "Combien de temps cela prendra-t-il ?",
      ],
    },
    links: [
      {
        to: "/services/graphic-design",
        label: {
          en: "Graphic Design service",
          rw: "Serivisi y’Igishushanyo Mbonera",
          fr: "Service Design Graphique",
        },
      },
      {
        to: "/portfolio/modern-brand-identity",
        label: {
          en: "Brand identity example",
          rw: "Urugero rw’imiterere ndangamuranga y’ikigo",
          fr: "Exemple d’identité de marque",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Web development                                                     */
  /* ------------------------------------------------------------------ */
  {
    id: "web_development",
    requires: [
      [
        "website",
        "web",
        "site",
        "web design",
        "web development",
        "web page",
        "webpage",
        "online presence",
        "landing page",
        "web application",
        "redesign",
        "website",
        "web",
        "site web",
        "page web",
        "presence en ligne",
        "application web",
        "refonte",
        "site",
      ],
    ],
    aliases: {
      en: [
        "web development",
        "build a website",
        "build me a website",
        "create a website",
        "website",
        "business website",
        "web design",
        "landing page",
        "portfolio website",
        "custom web app",
        "web application",
        "redesign my website",
        "responsive site",
        "mobile friendly site",
        "can you build",
        "website for my business",
      ],
      rw: [
        "gushyiramo website",
        "ukora website",
        "website y’abucuruzi",
        "website",
        "gushyira website",
        "landing page",
        "portfolio y|website",
        "porogaramu ya web",
        "ongera website",
        "website y’isura y’ telefone",
        "ushobora gukora website",
      ],
      fr: [
        "developpement web",
        "creer un site web",
        "site web",
        "site internet",
        "site vitrine",
        "landing page",
        "portfolio en ligne",
        "application web",
        "refonte de site",
        "site responsive",
        "pouvez-vous creer un site",
      ],
    },
    variants: [
      {
        id: "ecommerce",
        requires: [
          [
            "ecommerce",
            "e commerce",
            "online store",
            "sell online",
            "shop",
            "catalogue",
            "catalog",
            "products",
            "commerce en ligne",
            "boutique en ligne",
            "vendre en ligne",
            "magasin en ligne",
          ],
        ],
        aliases: {
          en: [
            "ecommerce",
            "e commerce",
            "e-commerce",
            "online store",
            "sell online",
            "selling products",
            "product catalogue",
            "product catalog",
            "shop online",
            "checkout",
            "payment on my website",
          ],
          rw: [
            "ecommerce",
            "e commerce",
            "website y’ubucuruzi",
            "kucuruzha kuri internet",
            "gicuruzwa ibicuruzwa",
            "urugero rw’ibicuruzwa",
            "ishyura kuri website",
          ],
          fr: [
            "ecommerce",
            "e commerce",
            "boutique en ligne",
            "vendre en ligne",
            "catalogue de produits",
            "paiement sur mon site",
            "vendre des produits",
          ],
        },
        answer: {
          en: "E-commerce website development can be discussed under Web Development. Share your requirements so the team can assess the scope: the products you want to sell, how customers should pay, how delivery works, and who will manage the product catalogue afterwards.",
          rw: "Gukora urubuga rw’ubucuruzi bwo kuri internet (e-commerce) biri muri serivisi z’Iterambere rya Website. Mudusangize ibisabwa kugira ngo itsinda risuzume ingano y’umushinga: ibicuruzwa muzacuruza, uburyo abakiriya bazishyura, uko ibicuruzwa bizagezwa ku baguzi n’uzacunga urutonde rw’ibicuruzwa urubuga rumaze kujya ahagaragara.",
          fr: "Un site e-commerce peut être discuté au titre du Développement Web. Partagez vos besoins pour que l'équipe puisse évaluer le périmètre : produits à vendre, mode de paiement des clients, fonctionnement de la livraison, et gestion du catalogue après la mise en ligne.",
        },
        followUps: {
          en: ["How do I request a service?", "See the website concept"],
          rw: ["Nigute nasaba serivisi?", "Reba urugero rwa website"],
          fr: ["Comment demander un service ?", "Voir le concept de site web"],
        },
        links: [
          {
            to: "/services/web-development",
            label: {
              en: "Web Development service",
              rw: "Serivisi y’Iterambere rya Website",
              fr: "Service Développement Web",
            },
          },
        ],
      },
    ],
    answer: {
      en: "Web Development services cover business websites, personal portfolios, landing pages, e-commerce websites, custom web applications, website redesigns, and maintenance and improvements. Websites are built to work well on phones, tablets and desktops, and to make the next step obvious for your visitors.",
      rw: "Serivisi y’Iterambere rya Website ikubiyemo gukora imbuga z’ibigo, portfolio z’abantu ku giti cyabo, landing pages, amaduka yo kuri internet, porogaramu za web zihariye, kuvugurura imbuga zisanzwe no kuzibungabunga no kuzinoza. Imbuga zitegurwa ku buryo zikora neza kuri telefoni, tableti na mudasobwa, kandi zigafasha abazisura kumenya intambwe ikurikira bagomba gutera.",
      fr: "Le Développement Web couvre les sites d'entreprise, portfolios personnels, landing pages, sites e-commerce, applications web sur mesure, refontes de sites, ainsi que la maintenance et les améliorations. Les sites sont conçus pour fonctionner sur mobile, tablette et ordinateur, et rendre l'étape suivante évidente pour vos visiteurs.",
    },
    followUps: {
      en: [
        "Can KBS build an e-commerce website?",
        "How does the website process work?",
        "See the website concept",
      ],
      rw: [
        "KBS ishobora gukora website y’ubucuruzi?",
        "Ni gute mukora website?",
        "Reba urugero rwa website",
      ],
      fr: [
        "KBS peut-il créer un site e-commerce ?",
        "Comment se déroule le processus ?",
        "Voir le concept de site web",
      ],
    },
    links: [
      {
        to: "/services/web-development",
        label: {
          en: "Web Development service",
          rw: "Serivisi y’Iterambere rya Website",
          fr: "Service Développement Web",
        },
      },
      {
        to: "/portfolio/business-website-concept",
        label: {
          en: "Website concept example",
          rw: "Urugero rw’igitekerezo cya website",
          fr: "Exemple de concept de site web",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Pricing / quotations                                               */
  /* ------------------------------------------------------------------ */
  {
    id: "pricing",
    requires: [
      [
        "cost",
        "costs",
        "price",
        "prices",
        "pricing",
        "how much",
        "quotation",
        "quote",
        "budget",
        "rate",
        "fees",
        "expensive",
        "cheap",
        "igiciro",
        "umuzigo",
        "ibiciro",
        "niba",
        "ba bw",
        "umusanzwe w’ibiciro",
        "prix",
        "couter",
        "combien",
        "tarif",
        "devis",
        "budget",
      ],
    ],
    aliases: {
      en: [
        "how much",
        "how much does it cost",
        "price",
        "pricing",
        "cost",
        "costs",
        "quotation",
        "quote",
        "budget",
        "rate",
        "rates",
        "fees",
        "how expensive",
        "price list",
        "packages",
        "pricing plans",
      ],
      rw: [
        "niba ikigera iki",
        "igiciro",
        "ibiciro",
        "umuzigo",
        "ba bw",
        "umusanzwe w’ibiciro",
        "gusaba igiciro",
        "ibiciro by’umushinga",
        "inzengo y’umushinga",
        "im-package",
      ],
      fr: [
        "combien",
        "quel prix",
        "prix",
        "couter",
        "cout",
        "tarif",
        "tarifs",
        "devis",
        "quotation",
        "budget",
        "combien ca coute",
        "packages",
        "formules",
      ],
    },
    answer: {
      en: "Project costs depend on the requirements and the scope of work. We do not publish fixed prices because every project differs. Share your project details through the service request form so KBS can review them and prepare a quotation that matches your needs.",
      rw: "Igiciro cy’umushinga giterwa n’ibyo mukeneye n’ingano y’akazi kagomba gukorwa. Ntidushyiraho ibiciro bihamye ku mishinga yose, kuko buri mushinga ugira umwihariko. Ohereza ibisobanuro by’umushinga wawe ukoresheje ifishi yo Gusaba Serivisi kugira ngo itsinda rya KBS ribisuzume ritegure inyandiko igaragaza igiciro kijyanye n’ibyo ukeneye.",
      fr: "Le coût d'un projet dépend des besoins et du périmètre des travaux. Nous ne publions pas de prix fixes, car chaque projet est différent. Partagez les détails de votre projet via le formulaire de demande de service : l'équipe KBS pourra les examiner et préparer un devis adapté à vos besoins.",
    },
    followUps: {
      en: [
        "How do I request a service?",
        "What information should I include?",
        "How long will it take?",
      ],
      rw: [
        "Nigute nasaba serivisi?",
        "Ni ayahe makuru ngomba gutanga?",
        "Umushinga uzamara igihe kingana iki?",
      ],
      fr: [
        "Comment demander un service ?",
        "Quelles informations dois-je fournir ?",
        "Combien de temps cela prendra-t-il ?",
      ],
    },
    links: [
      {
        to: "/request-service",
        label: {
          en: "Request a service",
          rw: "Saba serivisi",
          fr: "Demander un service",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Timelines                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "timeline",
    requires: [
      [
        "how long",
        "timeline",
        "duration",
        "deadline",
        "timeframe",
        "when will",
        "delivery time",
        "fastest",
        "urgent",
        "izihe",
        "igitihe",
        "igicaphu",
        "bynda",
        "muri gukora nte",
        "delai",
        "combien de temps",
        "duree",
        "quand",
        "echeance",
      ],
    ],
    aliases: {
      en: [
        "how long",
        "how long will it take",
        "how long does it take",
        "timeline",
        "deadline",
        "time frame",
        "turnaround",
        "delivery time",
        "when will it be ready",
        "when can you deliver",
        "how soon",
      ],
      rw: [
        "bizamara igihe iki",
        "igihe cy’umushinga",
        "kuzamara igihe iki",
        "igihe cy’isubirizemo",
        "gihe ukeneye byuzuzwe",
        "ni ute uzabikora",
        "impera",
      ],
      fr: [
        "combien de temps",
        "delai",
        "duree",
        "quand sera ce pret",
        "délai de livraison",
        "sous quel delai",
        "rapidement",
      ],
    },
    answer: {
      en: "Timelines depend on the scope and requirements of each project, and on how quickly content and feedback are available. The expected timeline is discussed and agreed after your project details have been reviewed, before any work starts.",
      rw: "Igihe umushinga uzamara giterwa n’ingano y’akazi, ibisabwa n’uko amakuru n’ibitekerezo mutanga biboneka ku gihe. Igihe giteganyijwe kizaganirwaho kandi cyumvikanweho nyuma yo gusuzuma ubusabe bwanyu, mbere y’uko imirimo itangira.",
      fr: "Les délais dépendent du périmètre et des besoins de chaque projet, ainsi que de la disponibilité des contenus et des retours. Le délai prévisionnel est discuté et convenu après examen de votre demande, avant le début des travaux.",
    },
    followUps: {
      en: ["How do I request a service?", "What information should I include?"],
      rw: ["Nigute nasaba serivisi?", "Ni ayahe makuru ngomba gutanga?"],
      fr: [
        "Comment demander un service ?",
        "Quelles informations dois-je fournir ?",
      ],
    },
    links: [
      {
        to: "/request-service",
        label: {
          en: "Request a service",
          rw: "Saba serivisi",
          fr: "Demander un service",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* How to request                                                      */
  /* ------------------------------------------------------------------ */
  {
    id: "request_howto",
    requires: [
      [
        "request",
        "submit",
        "form",
        "start",
        "hire",
        "order",
        "begin",
        "contact you",
        "get started",
        "usaba",
        "ohereza",
        "ishusho",
        "tangira",
        "gutegura",
        "saba serivisi",
        "formulaire",
        "demande",
        "commencer",
        "contacter",
      ],
    ],
    aliases: {
      en: [
        "how do i request",
        "how to request",
        "request a service",
        "submit a request",
        "send a request",
        "start a project",
        "get started",
        "place an order",
        "hire you",
        "fill in the form",
        "contact form",
        "how can i work with you",
        "how do we begin",
      ],
      rw: [
        "uko nshaka serivisi",
        "gusaba serivisi",
        "ohereza ubusabe",
        "kohereza isunika",
        "gutangira umushinga",
        "gutegura",
        "gusaba ibirimo by’umushinga",
        "nkora nshaka kuganira nawe",
        "nkora nshaka kujya mbere",
      ],
      fr: [
        "comment demander",
        "comment faire une demande",
        "demander un service",
        "envoyer une demande",
        "remplir le formulaire",
        "formulaire de contact",
        "commencer un projet",
        "comment travailler avec vous",
        "demande de service",
      ],
    },
    answer: {
      en: "To request a service:\n1. Open the Request a Service page.\n2. Select the service or services you need.\n3. Describe your project, the objective and any deadline or budget range.\n4. Review the details and submit the form.\n\nThe form asks only for the information needed to review your request. If you prefer, I can help you prepare the request here and then take you to the form with the details already filled in — you always review and submit it yourself.",
      rw: "Kugira ngo usabe serivisi:\n1. Fungura ipaji ya **Gusaba Serivisi**.\n2. Hitamo serivisi imwe cyangwa nyinshi ukeneye.\n3. Sobanura umushinga wawe, intego yawo, igihe wifuza ko urangirira n’ingengo y’imari ufite, niba bihari.\n4. Ongera usuzume amakuru watanze, hanyuma wohereze ifishi.\n\nIfishi isaba amakuru akenewe kugira ngo itsinda risuzume ubusabe bwawe. Niba ubishaka, nshobora kugufasha gutegura ubusabe hano, hanyuma nkaguha uburyo bwo gufungura ifishi yuzuyemo amakuru watanze. Uzabanza kuyasuzuma kandi abe ari wowe wohereza ubusabe.",
      fr: "Pour demander un service :\n1. Ouvrez la page Demander un service.\n2. Sélectionnez le ou les services souhaités.\n3. Décrivez votre projet, l'objectif, et toute échéance ou fourchette de budget.\n4. Relisez les informations et envoyez le formulaire.\n\nLe formulaire ne demande que les informations nécessaires à l'examen de votre demande. Si vous le souhaitez, je peux vous aider à préparer la demande ici puis vous emmener vers le formulaire pré-rempli : vous relisez et validez toujours vous-même.",
    },
    followUps: {
      en: [
        "What information should I include?",
        "Can you help me prepare the request?",
        "How long will it take?",
      ],
      rw: [
        "Ni ayahe makuru ngomba gutanga?",
        "Mwanshobora gufasha gutegura ubusabe?",
        "Umushinga uzamara igihe kingana iki?",
      ],
      fr: [
        "Quelles informations dois-je fournir ?",
        "Pouvez-vous m’aider à préparer la demande ?",
        "Combien de temps cela prendra-t-il ?",
      ],
    },
    links: [
      {
        to: "/request-service",
        label: {
          en: "Open the request form",
          rw: "Fungura ifishi yo gusaba serivisi",
          fr: "Ouvrir le formulaire",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Prepare a request with the assistant                                */
  /* ------------------------------------------------------------------ */
  {
    id: "request_prepare",
    requires: [
      [
        "prepare",
        "help me request",
        "fill in",
        "fill out",
        "draft",
        "write a request",
        "create a request",
        "start my request",
        "gategura",
        "fungura",
        "andika ubusabe",
        "nkoreshe",
        "preparer",
        "remplir",
        "rediger une demande",
        "preparer ma demande",
      ],
    ],
    aliases: {
      en: [
        "help me prepare",
        "prepare my request",
        "prepare a request",
        "fill in the form for me",
        "help me write a request",
        "draft a request",
        "create a request",
        "start my request",
        "build a request",
      ],
      rw: [
        "ugufasha gutegura ubusabe",
        "tegura ubusabe bwanjye",
        "gategura ubusabe",
        "andika ubusabe",
        "fungura ubusabe bwanjye",
        "ngufasha gusaba serivisi",
      ],
      fr: [
        "aide moi a preparer",
        "prepare ma demande",
        "preparer une demande",
        "remplir le formulaire pour moi",
        "redige une demande",
        "creer une demande",
      ],
    },
    answer: {
      en: "I can help you prepare a service request step by step. I will ask for a few short answers, summarise them for you, and then give you a button that opens the request form with your details filled in. You always review everything and submit it yourself — I never send anything on your behalf.",
      rw: "Nshobora kugufasha gutegura ubusabe bwa serivisi intambwe ku yindi. Nzakubaza ibibazo bike, nkusanyirize hamwe ibisubizo byawe, hanyuma nguhe buto ifungura ifishi yo gusaba serivisi yuzuyemo amakuru watanze. Uzabanza gusuzuma amakuru yose kandi abe ari wowe wohereza ubusabe; sinshobora kubwohereza mu izina ryawe.",
      fr: "Je peux vous aider à préparer une demande de service étape par étape. Je vous poserai quelques questions brèves, je résumerai vos réponses, puis je vous proposerai un bouton qui ouvre le formulaire pré-rempli. Vous relisez toujours tout et validez vous-même : je n'envoie jamais rien à votre place.",
    },
    followUps: {
      en: ["Which service do you need?", "What is your project about?"],
      rw: ["Ni ubuhe serivisi ukeneye?", "Umushinga wawe ni iki?"],
      fr: [
        "De quel service avez-vous besoin ?",
        "De quoi parle votre projet ?",
      ],
    },
    links: [
      {
        to: "/request-service",
        label: {
          en: "Open the request form",
          rw: "Fungura ifishi yo gusaba serivisi",
          fr: "Ouvrir le formulaire",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Revisions                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "revisions",
    requires: [
      [
        "revision",
        "revisions",
        "rework",
        "changes",
        "edit",
        "redesign",
        "round",
        "iterate",
        "iterations",
        "ubuso",
        "amagendura",
        "ihinduka",
        "ubundi",
        "revision",
        "revisions",
        "modifications",
        "changements",
      ],
    ],
    aliases: {
      en: [
        "revisions",
        "revision policy",
        "how many revisions",
        "free revisions",
        "can i make changes",
        "change my mind",
        "iterate",
        "redo",
        "redesign",
        "how many changes",
        "round of changes",
      ],
      rw: [
        "ubuso",
        "ubuso bumwe",
        "umubare w’abuso",
        "nshobora guhindura",
        "amagendura",
        "ihinduka nyuma",
        "kohindura umushinga",
        "ukora ubundi",
      ],
      fr: [
        "revisions",
        "politique de revision",
        "combien de revisions",
        "revisions illimitees",
        "puis-je faire des modifications",
        "nombre de corrections",
        "refaire",
      ],
    },
    answer: {
      en: "The number of revision rounds, and what counts as a revision, are agreed as part of the scope before work starts. That way both sides know exactly what is included in the quotation and what would be treated as additional work.",
      rw: "Umubare w’inshuro umushinga ushobora kuvugururwa n’ibifatwa nk’ivugurura byumvikanwaho mbere y’uko akazi gatangira. Ibi bifasha impande zombi kumenya neza ibikubiye mu giciro n’akazi k’inyongera gashobora kwishyurwa ukwako.",
      fr: "Le nombre d'allers-retours de révision, et ce qui constitue une révision, sont convenus dans le périmètre avant le début des travaux. Ainsi, les deux parties savent précisément ce qui est inclus dans le devis et ce qui serait facturé comme travail supplémentaire.",
    },
    followUps: {
      en: ["How do I request a service?", "How much does a project cost?"],
      rw: ["Nigute nasaba serivisi?", "Igiciro cy’umushinga gitegurwa gite?"],
      fr: ["Comment demander un service ?", "Combien coûte un projet ?"],
    },
    links: [
      {
        to: "/faq",
        label: {
          en: "Read the FAQ",
          rw: "Soma ibibazo bikunze kubazwa",
          fr: "Lire la FAQ",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Languages supported                                                 */
  /* ------------------------------------------------------------------ */
  {
    id: "languages",
    requires: [
      [
        "language",
        "languages",
        "speak",
        "english",
        "french",
        "kinyarwanda",
        "imimi",
        "ururimi",
        "indimi",
        "ikiganza",
        "francais",
        "anglais",
        "parlez-vous",
        "langues",
      ],
    ],
    aliases: {
      en: [
        "languages",
        "which languages",
        "do you speak",
        "do you work in english",
        "do you work in french",
        "do you work in kinyarwanda",
        "language support",
        "bilingual",
      ],
      rw: [
        "indimi",
        "ni ubuhe ndimi",
        "umurimo mu indimi",
        "murimo mu Cyangereza",
        "murimo mu Ifransa",
        "murimo mu Ikinyarwanda",
        "ururimi",
      ],
      fr: [
        "langues",
        "quelles langues",
        "parlez-vous",
        "travaillez-vous en anglais",
        "en francais",
        "en kinyarwanda",
        "support linguistique",
      ],
    },
    answer: {
      en: "King Business Studio works in English, Kinyarwanda and French. The website and the request forms are available in all three languages, and you can submit your request in whichever language you prefer. The language for project communication is agreed with the team.",
      rw: "King Business Studio ikoresha Icyongereza, Ikinyarwanda n’Igifaransa. Website n’amafishi yo gusaba serivisi biboneka muri izo ndimi uko ari eshatu, kandi ushobora kohereza ubusabe mu rurimi wumva wisanzuyemo. Ururimi ruzakoreshwa mu itumanaho ry’umushinga ruzumvikanwaho n’itsinda.",
      fr: "King Business Studio travaille en anglais, en kinyarwanda et en français. Le site et les formulaires de demande sont disponibles dans les trois langues, et vous pouvez envoyer votre demande dans celle que vous préférez. La langue de communication du projet est convenue avec l'équipe.",
    },
    followUps: {
      en: ["How do I request a service?", "See the FAQ"],
      rw: ["Nigute nasaba serivisi?", "Reba ibibazo bishingiye"],
      fr: ["Comment demander un service ?", "Voir la FAQ"],
    },
    links: [
      {
        to: "/faq",
        label: {
          en: "Read the FAQ",
          rw: "Soma ibibazo bikunze kubazwa",
          fr: "Lire la FAQ",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Portfolio                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "portfolio",
    requires: [
      [
        "portfolio",
        "projects",
        "work",
        "examples",
        "samples",
        "showcase",
        "gallery",
        "previous work",
        "past work",
        "recent work",
        "ubufasha",
        "ibikoresho",
        "imishinga",
        "ingero",
        "akazi",
        "portfolio",
        "projets",
        "realisations",
        "exemples",
        "travaux",
      ],
    ],
    aliases: {
      en: [
        "portfolio",
        "your work",
        "show me your work",
        "examples",
        "sample projects",
        "showcase",
        "past projects",
        "previous work",
        "case studies",
        "do you have clients",
        "have you worked with",
      ],
      rw: [
        "portfolio",
        "akazi kanyu",
        "ingero",
        "ibikoresho bikora",
        "imishinga yashize",
        "asharoye",
        "umushinga w’icyitegererezo",
        "mukora na abiriya",
      ],
      fr: [
        "portfolio",
        "votre travail",
        "montrez-moi vos travaux",
        "exemples",
        "realisations",
        "projets passes",
        "etudes de cas",
        "avez-vous des clients",
      ],
    },
    answer: {
      en: "The portfolio currently shows three projects: a Professional Company Profile, a Modern Brand Identity, and a Business Website Concept. All three are labelled as concept or demo work, created by KBS to demonstrate capabilities — they are not real client engagements. Real work is added as it is completed and approved for publication.",
      rw: "Portfolio ya KBS igaragaza imishinga itatu: Umwirondoro w’Ikigo w’Umwuga, Imiterere Ndangamuranga y’Ikirango igezweho, n’Igitekerezo cya Website y’Ubucuruzi. Iyi mishinga yose igaragazwa nk’icyitegererezo (concept/demo) yakozwe na KBS kugira ngo yerekane ubushobozi bwayo; si imishinga yakorewe abakiriya nyakuri. Imirimo nyakuri izongerwamo imaze gukorwa no kwemezwa ko ishobora gushyirwa ahagaragara.",
      fr: "Le portfolio présente actuellement trois projets : un Profil d'Entreprise Professionnel, une Identité de Marque Moderne et un Concept de Site Web d'Entreprise. Les trois sont indiqués comme créations concept ou démo, réalisées par KBS pour démontrer ses compétences — ce ne sont pas de vraies missions clients. Les travaux réels sont ajoutés à mesure qu'ils sont réalisés et approuvés.",
    },
    followUps: {
      en: [
        "See the Professional Company Profile",
        "See the Modern Brand Identity",
        "See the Business Website Concept",
      ],
      rw: [
        "Reba umwirondoro w’ikigo",
        "Reba imiterere ndangamuranga y’ikirango",
        "Reba igitekerezo cya website",
      ],
      fr: [
        "Voir le Profil d’Entreprise",
        "Voir l’Identité de Marque",
        "Voir le Concept de Site Web",
      ],
    },
    links: [
      {
        to: "/portfolio",
        label: {
          en: "Open the portfolio",
          rw: "Fungura portfolio",
          fr: "Ouvrir le portfolio",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Contact information                                                 */
  /* ------------------------------------------------------------------ */
  {
    id: "contact_info",
    requires: [
      [
        "contact",
        "email",
        "e-mail",
        "phone",
        "telephone",
        "number",
        "call",
        "whatsapp",
        "telegram",
        "address",
        "location",
        "where are you",
        "contact details",
        "uhitamo",
        "imbaraga",
        "email",
        "telefoni",
        "whatsapp",
        "telegram",
        "address",
        "aho muri",
        "contacter",
        "email",
        "telephone",
        "numero",
        "adresse",
        "ou etes-vous",
      ],
    ],
    aliases: {
      en: [
        "contact details",
        "contact information",
        "how do i contact",
        "email address",
        "phone number",
        "whatsapp",
        "telegram",
        "where are you located",
        "your address",
        "reach you",
        "get in touch",
      ],
      rw: [
        "imbaraga zawe",
        "uboko bwawe",
        "uburyo nshaka kuganira nawe",
        "email yawe",
        "numero ya telefone",
        "whatsapp",
        "telegram",
        "aho muri",
        "address yawe",
        "nkaguhamagara",
      ],
      fr: [
        "coordonnees",
        "comment vous contacter",
        "votre adresse email",
        "numero de telephone",
        "whatsapp",
        "telegram",
        "ou etes-vous situe",
        "votre adresse",
        "vous joindre",
        "vous contacter",
      ],
    },
    answer: {
      en: "The fastest way to reach KBS is the contact form or the service request form on this website — both are reviewed by the team. Official email, phone and social links are added to the Contact and Footer pages once they are confirmed by the business.",
      rw: "Uburyo bworoshye bwo kuvugana na KBS ni ukuzuza ifishi yo ku ipaji ya **Twandikire** cyangwa iyo **Gusaba Serivisi** kuri iyi website. Ubutumwa busuzumwa n’itsinda. Aderesi ya imeri, nimero za telefoni n’izindi nzira z’itumanaho bizongerwa ku ipaji ya Twandikire no ku gice cyo hasi cya website bimaze kwemezwa.",
      fr: "Le moyen le plus rapide de joindre KBS est le formulaire de contact ou le formulaire de demande de service de ce site — les deux sont examinés par l'équipe. L'adresse e-mail, le téléphone et les liens sociaux officiels sont ajoutés aux pages Contact et Pied de page une fois confirmés par l'entreprise.",
    },
    followUps: {
      en: ["How do I request a service?", "Read the FAQ"],
      rw: ["Nigute nasaba serivisi?", "Soma ibibazo bikunze kubazwa"],
      fr: ["Comment demander un service ?", "Lire la FAQ"],
    },
    links: [
      {
        to: "/contact",
        label: {
          en: "Contact page",
          rw: "Ipaji ya Twandikire",
          fr: "Page Contact",
        },
      },
      {
        to: "/request-service",
        label: {
          en: "Request a service",
          rw: "Saba serivisi",
          fr: "Demander un service",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Payment                                                            */
  /* ------------------------------------------------------------------ */
  {
    id: "payment",
    requires: [
      [
        "payment",
        "payments",
        "pay",
        "invoice",
        "billing",
        "instalments",
        "installments",
        "deposit",
        "mobile money",
        "bank transfer",
        "card",
        "payment method",
        "kwishyura",
        "ishyura",
        "kwishyura",
        "fatura",
        "ishyura",
        "paiement",
        "payer",
        "facture",
        "regler",
        "moyens de paiement",
      ],
    ],
    aliases: {
      en: [
        "payment",
        "how do i pay",
        "payment method",
        "payment terms",
        "invoice",
        "billing",
        "installments",
        "deposit",
        "mobile money",
        "bank transfer",
        "card payment",
        "do you accept",
      ],
      rw: [
        "ishyura",
        "uburyo bwo kwishyura",
        "uko nshyura",
        "fatura",
        "ishyura ry’icebura",
        "kwishyura mu bice",
        "kishyura iminara",
        "kohereza mbusa",
        "kwishyura kuri ikigana",
        "ikarita",
        "maze wemera",
      ],
      fr: [
        "paiement",
        "comment payer",
        "moyen de paiement",
        "conditions de paiement",
        "facture",
        "regler en plusieurs fois",
        "acompte",
        "mobile money",
        "virement bancaire",
        "carte bancaire",
        "acceptez-vous",
      ],
    },
    answer: {
      en: "Payment arrangements are confirmed in writing as part of the agreed scope for each project. Submit your request first so the team can review the work involved and confirm the terms that apply to your project.",
      rw: "Uburyo bwo kwishyura n’ingengabihe yabwo byumvikanwaho kandi bikandikwa mu masezerano y’umushinga, bitewe n’imiterere yawo. Banza wohereze ubusabe bwawe kugira ngo itsinda risuzume ibyo ukeneye, hanyuma rigusobanurire uburyo bwo kwishyura bushoboka.",
      fr: "Les modalités de paiement sont confirmées par écrit dans le périmètre convenu de chaque projet. Envoyez d'abord votre demande afin que l'équipe puisse examiner les travaux prévus et préciser les conditions applicables à votre projet.",
    },
    followUps: {
      en: ["How do I request a service?", "How much does a project cost?"],
      rw: ["Nigute nasaba serivisi?", "Igiciro cy’umushinga gitegurwa gite?"],
      fr: ["Comment demander un service ?", "Combien coûte un projet ?"],
    },
    links: [
      {
        to: "/request-service",
        label: {
          en: "Request a service",
          rw: "Saba serivisi",
          fr: "Demander un service",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Process / how KBS works                                            */
  /* ------------------------------------------------------------------ */
  {
    id: "process",
    requires: [
      [
        "process",
        "steps",
        "how do you work",
        "workflow",
        "method",
        "approach",
        "stages",
        "procedure",
        "iburyo",
        "amazi",
        "uburyo",
        "hatu",
        "ishyiramo",
        "procedure",
        "processus",
        "etapes",
        "methode",
        "comment vous travaillez",
      ],
    ],
    aliases: {
      en: [
        "how do you work",
        "what is your process",
        "working process",
        "steps",
        "workflow",
        "how does a project start",
        "what happens after I submit",
        "methodology",
        "stages of work",
      ],
      rw: [
        "ukora ute",
        "uburyo burimo",
        "ibiciro",
        "hatu",
        "ishyiramo",
        "ibyo happens nyuma yo kohereza",
        "uburyo dukora",
      ],
      fr: [
        "comment travaillez-vous",
        "votre processus",
        "etapes",
        "deroulement",
        "methode",
        "que se passe-t-il apres l envoi",
        "processus de travail",
      ],
    },
    answer: {
      en: "Every project follows the same five steps:\n1. Share your idea — the service you need and what you want to achieve.\n2. Discuss the requirements — content, references, audience and constraints.\n3. Confirm the scope — deliverables, pricing and timeline are agreed.\n4. Work on the solution — drafts are prepared and shared for feedback.\n5. Review and deliver — the final files are handed over.\n\nNothing is finalised until the scope is agreed, so you always know what you are getting.",
      rw: "Buri mushinga ukurikiza intambwe eshanu:\n1. **Tanga igitekerezo cyawe** — sobanura serivisi ukeneye n’icyo wifuza kugeraho.\n2. **Muganire ku bisabwa** — amakuru, ingero, abo umushinga ugenewe n’imbogamizi zihari.\n3. **Mwumvikane ku byo umushinga uzaba ukubiyemo** — imirimo izakorwa, igiciro n’igihe izamara.\n4. **Akazi gakorwe** — hategurwa inyandiko cyangwa igishushanyo cy’ibanze, mugatanga ibitekerezo ku byo mwakiriye.\n5. **Musuzume kandi muhabwe ibyakorewe** — dosiye za nyuma zishyikirizwa umukiriya.\n\nNta mirimo ya nyuma itangira mbere y’uko mwumvikana ku byo umushinga uzaba ukubiyemo, bityo ukamenya neza ibyo uzahabwa.",
      fr: "Chaque projet suit les mêmes cinq étapes :\n1. Partagez votre idée — le service recherché et votre objectif.\n2. Discutez des besoins — contenus, références, audience et contraintes.\n3. Confirmez le périmètre — livrables, prix et délais sont convenus.\n4. Réalisation — les premières versions sont partagées pour avis.\n5. Relecture et livraison — les fichiers finaux sont transmis.\n\nRien n'est figé avant la validation du périmètre : vous savez toujours ce que vous obtenez.",
    },
    followUps: {
      en: ["How do I request a service?", "What information should I include?"],
      rw: ["Nigute nasaba serivisi?", "Ni ayahe makuru ngomba gutanga?"],
      fr: [
        "Comment demander un service ?",
        "Quelles informations dois-je fournir ?",
      ],
    },
    links: [
      {
        to: "/services",
        label: {
          en: "Explore our services",
          rw: "Reba serivisi dutanga",
          fr: "Découvrir nos services",
        },
      },
      {
        to: "/request-service",
        label: {
          en: "Request a service",
          rw: "Saba serivisi",
          fr: "Demander un service",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Privacy and data handling                                           */
  /* ------------------------------------------------------------------ */
  {
    id: "privacy",
    requires: [
      [
        "privacy",
        "data",
        "information",
        "personal data",
        "gdpr",
        "confidential",
        "secure",
        "safe",
        "store my data",
        "my details",
        "ubwibone",
        "ihishe",
        "amakuru",
        "imfishi",
        "gpf",
        "kwigenga",
        "donnees",
        "confidentialite",
        "vie privee",
        "rgpd",
        "securite",
      ],
    ],
    aliases: {
      en: [
        "privacy",
        "what happens to my data",
        "do you store my information",
        "is my information safe",
        "confidential",
        "data protection",
        "my personal details",
        "do you share my information",
        "security",
      ],
      rw: [
        "ubwibone",
        "ubwibone bwanjye",
        "amakuru yanjye",
        "ubwibone bw’amakuru",
        "imfishi",
        "gpf",
        "amakuru y’umuganga",
        "nibwambura amakuru yanjye",
      ],
      fr: [
        "confidentialite",
        "vie privee",
        "que deviennent mes donnees",
        "mes donnees sont-elles securisees",
        "protection des donnees",
        "rgpd",
        "securite",
      ],
    },
    answer: {
      en: "Information you submit through the forms is used to review and respond to your request, and is delivered through Formspree. Nothing you type in this support chat is sent to an external AI provider or stored on a server by this website — the conversation stays in this browser tab until you clear it or close the page. See the Privacy Policy page for the full description.",
      rw: "Amakuru wohereza ukoresheje amafishi akoreshwa mu gusuzuma no gusubiza ubusabe bwawe, kandi anyuzwa muri Formspree. Amakuru wandika muri aka gafasha abakiriya ntabwo yoherezwa ku yindi serivisi ya AI cyangwa ngo abikwe kuri seriveri y’iyi website. Ikiganiro kiguma muri aka gace ka mushakisha kugeza ugisibye cyangwa ugafunze ipaji. Soma Politiki y’Ibanga kugira ngo umenye ibisobanuro birambuye.",
      fr: "Les informations envoyées via les formulaires servent à examiner et répondre à votre demande, et sont transmises par Formspree. Ce que vous saisissez dans ce chat n'est envoyé à aucun fournisseur d'IA externe ni stocké sur un serveur par ce site : la conversation reste dans cet onglet jusqu'à ce que vous l'effaciez ou fermiez la page. Consultez la page Politique de confidentialité pour la description complète.",
    },
    followUps: {
      en: ["Read the privacy policy", "How do I request a service?"],
      rw: ["Soma politiki y’ibanga", "Nigute nasaba serivisi?"],
      fr: [
        "Lire la politique de confidentialité",
        "Comment demander un service ?",
      ],
    },
    links: [
      {
        to: "/privacy-policy",
        label: {
          en: "Read the privacy policy",
          rw: "Soma politiki y’ibanga",
          fr: "Lire la politique de confidentialité",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* FAQ                                                                */
  /* ------------------------------------------------------------------ */
  {
    id: "faq_help",
    requires: [
      [
        "faq",
        "faqs",
        "frequently asked",
        "common questions",
        "questions",
        "help",
        "questions and answers",
        "ibibazo",
        "ibibazo bishingiye",
        "inkunga",
        "faq",
        "questions frequentes",
        "questions courantes",
        "aide",
      ],
    ],
    aliases: {
      en: [
        "faq",
        "faqs",
        "frequently asked questions",
        "common questions",
        "help",
        "i have a question",
        "do you have a help page",
        "questions and answers",
      ],
      rw: [
        "ibibazo bishingiye",
        "inkunga",
        "mfite ikibazo",
        "ibibazo n’ibisobanuro",
        "murango ibibazo",
      ],
      fr: [
        "faq",
        "questions frequentes",
        "questions courantes",
        "aide",
        "j'ai une question",
        "questions et reponses",
      ],
    },
    answer: {
      en: "The FAQ page covers pricing, timelines, revisions, languages, the request process, privacy and the projects in the portfolio. If your question is not listed there, send it through the contact form and the team will answer it directly.",
      rw: "Ipaji y’Ibibazo Bikunze Kubazwa isubiza ibibazo birebana n’ibiciro, igihe imishinga imara, ivugururwa ry’akazi, indimi, uburyo bwo gusaba serivisi, ibanga ry’amakuru na portfolio. Niba utabonye igisubizo cy’ikibazo cyawe, ohereza ubutumwa ukoresheje ifishi yo kutwandikira kugira ngo itsinda rya KBS rigusubize.",
      fr: "La page FAQ couvre les prix, les délais, les révisions, les langues, le processus de demande, la confidentialité et les projets du portfolio. Si votre question n'y figure pas, envoyez-la via le formulaire de contact : l'équipe vous répondra directement.",
    },
    followUps: {
      en: [
        "How much does a project cost?",
        "How long will it take?",
        "How do I request a service?",
      ],
      rw: [
        "Igiciro cy’umushinga gitegurwa gite?",
        "Umushinga uzamara igihe kingana iki?",
        "Nigute nasaba serivisi?",
      ],
      fr: [
        "Combien coûte un projet ?",
        "Combien de temps cela prendra-t-il ?",
        "Comment demander un service ?",
      ],
    },
    links: [
      {
        to: "/faq",
        label: {
          en: "Open the FAQ",
          rw: "Fungura ibibazo bikunze kubazwa",
          fr: "Ouvrir la FAQ",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* About KBS                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: "about_kbs",
    requires: [
      [
        "about",
        "who are you",
        "company",
        "story",
        "background",
        "team",
        "experience",
        "why choose",
        "mission",
        "vision",
        "about us",
        "kbs",
        "ibigo",
        "iki kbs",
        "imizi",
        "umushinga",
        "uzira",
        "ibyifashanye",
        "kuwibanda",
        "a propos",
        "qui etes-tu",
        "votre histoire",
        "equipe",
        "experience",
        "mission",
        "vision",
        "pourquoi nous choisir",
      ],
    ],
    aliases: {
      en: [
        "about kbs",
        "about you",
        "who are you",
        "your story",
        "tell me about kbs",
        "your team",
        "your experience",
        "why should i choose you",
        "your mission",
        "your vision",
      ],
      rw: [
        "kbs ni iki",
        "ibyifashanye",
        "ibyuma",
        "kuwibanda",
        "itsinda ryanyu",
        "ubuzimumizi bwanyu",
        "impamvu yo kutangana nawe",
        "intego yanyu",
        "ihameko yanyu",
      ],
      fr: [
        "parlez-moi de kbs",
        "votre histoire",
        "votre equipe",
        "votre experience",
        "pourquoi vous choisir",
        "votre mission",
        "votre vision",
        "a propos de kbs",
      ],
    },
    answer: {
      en: "King Business Studio (KBS) is a business studio focused on three things: professional business documents, memorable graphic design, and modern websites. The approach is straightforward — understand the goal, agree the scope, then do the work properly and deliver it clearly. You can read the full description on the About page.",
      rw: "King Business Studio (KBS) ni ikigo gitanga serivisi mu byiciro bitatu: inyandiko z’ubucuruzi, igishushanyo mbonera n’iterambere rya website. Uburyo dukoramo buroroshye: tubanza gusobanukirwa intego y’umukiriya, tukumvikana ku byo umushinga uzaba ukubiyemo, hanyuma tugakora akazi kinyamwuga kandi tugatanga ibyumvikanyweho. Soma ibisobanuro birambuye ku ipaji ya **Abo Turibo**.",
      fr: "King Business Studio (KBS) est un studio spécialisé dans trois domaines : les documents professionnels, le design graphique et les sites web modernes. La démarche est simple : comprendre l'objectif, convenir du périmètre, puis réaliser le travail correctement et le livrer clairement. Vous pouvez lire la description complète sur la page À propos.",
    },
    followUps: {
      en: [
        "What services does KBS offer?",
        "See the portfolio",
        "How do I request a service?",
      ],
      rw: [
        "Ni izihe serivisi KBS itanga?",
        "Reba portfolio",
        "Nigute nasaba serivisi?",
      ],
      fr: [
        "Quels services KBS propose-t-il ?",
        "Voir le portfolio",
        "Comment demander un service ?",
      ],
    },
    links: [
      {
        to: "/about",
        label: { en: "About KBS", rw: "Abo Turibo — KBS", fr: "À propos de KBS" },
      },
      {
        to: "/portfolio",
        label: {
          en: "View the portfolio",
          rw: "Reba portfolio",
          fr: "Voir le portfolio",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Thanks / closing                                                    */
  /* ------------------------------------------------------------------ */
  {
    id: "thanks",
    requires: [
      [
        "thank",
        "thanks",
        "thank you",
        "appreciate",
        "great",
        "perfect",
        "bye",
        "goodbye",
        "see you",
        "murakoze",
        "murako",
        "nziza",
        "cyane",
        "umusanzwe",
        "merci",
        "remercie",
        "super",
        "parfait",
        "au revoir",
        "a bientot",
      ],
    ],
    aliases: {
      en: [
        "thank you",
        "thanks",
        "thanks a lot",
        "appreciate it",
        "great thanks",
        "perfect thanks",
        "bye",
        "goodbye",
        "see you",
      ],
      rw: [
        "murakoze",
        "nziza cyane",
        "murako",
        "cyane",
        "umusanzwe",
        "farewell",
        "turi iwaho",
      ],
      fr: [
        "merci",
        "merci beaucoup",
        "remercie",
        "super",
        "parfait",
        "au revoir",
        "a bientot",
        "bonne journee",
      ],
    },
    answer: {
      en: "You're welcome. If you are ready to start, the Request a Service form is the fastest way to reach the team — and I can help you prepare the details first if you like.",
      rw: "Murakoze. Niba mwiteguye gutangira, mwakoresha ifishi ya **Gusaba Serivisi** kugira ngo mugere ku itsinda rya KBS. Nshobora no kubafasha gutegura amakuru akenewe mbere yo kuzuza iyo fishi.",
      fr: "De rien. Si vous êtes prêt à commencer, le formulaire Demander un service est le moyen le plus rapide de joindre l'équipe — et je peux vous aider à préparer les informations au préalable si vous le souhaitez.",
    },
    followUps: {
      en: ["Request a service", "Explore our services"],
      rw: ["Saba serivisi", "Reba serivisi dutanga"],
      fr: ["Demander un service", "Découvrir nos services"],
    },
    links: [
      {
        to: "/request-service",
        label: {
          en: "Request a service",
          rw: "Saba serivisi",
          fr: "Demander un service",
        },
      },
    ],
  },
];

/**
 * Welcome messages shown when the chat panel opens.
 */
export const supportWelcome = {
  en: "Hello! Welcome to King Business Studio. I can help you explore our services, find answers to common questions, and prepare your service request. What would you like to know?",
  rw: "Muraho! Murakaza neza muri King Business Studio (KBS). Nshobora kubafasha kumenya serivisi dutanga, gusubiza ibibazo bikunze kubazwa no gutegura ubusabe bwa serivisi. Ni iki mwifuza kumenya?",
  fr: "Bonjour ! Bienvenue chez King Business Studio. Je peux vous aider à découvrir nos services, à trouver des réponses aux questions fréquentes et à préparer votre demande de service. Que souhaitez-vous savoir ?",
};

/**
 * Quick actions shown under the welcome message. Each one performs a real
 * action: navigate to a page or answer with a specific knowledge-base intent.
 */
export const supportQuickActions = [
  {
    id: "qa-services",
    action: { type: "navigate", to: "/services" },
    label: {
      en: "Explore Our Services",
      rw: "Reba serivisi dutanga",
      fr: "Découvrir Nos Services",
    },
  },
  {
    id: "qa-documents",
    action: { type: "navigate", to: "/services/business-documents" },
    label: {
      en: "Business Documents",
      rw: "Inyandiko z’Ubucuruzi",
      fr: "Documents Professionnels",
    },
  },
  {
    id: "qa-design",
    action: { type: "navigate", to: "/services/graphic-design" },
    label: {
      en: "Graphic Design",
      rw: "Igishushanyo Mbonera",
      fr: "Design Graphique",
    },
  },
  {
    id: "qa-web",
    action: { type: "navigate", to: "/services/web-development" },
    label: {
      en: "Web Development",
      rw: "Iterambere rya Website",
      fr: "Développement Web",
    },
  },
  {
    id: "qa-request",
    action: { type: "navigate", to: "/request-service" },
    label: {
      en: "How to Request a Service",
      rw: "Uko wasaba serivisi",
      fr: "Comment Demander un Service",
    },
  },
  {
    id: "qa-pricing",
    action: { type: "ask", intentId: "pricing" },
    label: {
      en: "Pricing and Quotes",
      rw: "Ibiciro n’amakuru y’igiciro",
      fr: "Tarifs et Devis",
    },
  },
  {
    id: "qa-portfolio",
    action: { type: "navigate", to: "/portfolio" },
    label: {
      en: "View Portfolio",
      rw: "Reba Portfolio",
      fr: "Voir le Portfolio",
    },
  },
  {
    id: "qa-contact",
    action: { type: "navigate", to: "/contact" },
    label: { en: "Contact KBS", rw: "Twandikire", fr: "Contacter KBS" },
  },
];

/**
 * Honest capability disclosure, shown in the chat header and the footer of
 * the panel. The assistant must never imply it is a human or a generative
 * AI model.
 */
export const supportDisclosure = {
  en: "This is an automated, rule-based support assistant that answers using KBS’s approved website information.",
  rw: "Uyu ni umufasha w’abakiriya wa KBS ukorera ku mategeko n’amakuru yemejwe ari kuri website. Si umuntu kandi ntakoresha AI ibyara ibisubizo bishya.",
  fr: "Il s'agit d'un assistant de support automatisé, fondé sur des règles, qui répond à partir des informations approuvées du site KBS.",
};

/**
 * Privacy notice displayed inside the chat panel.
 */
export const supportPrivacyNotice = {
  en: "This conversation stays in your browser tab. It is cleared when you clear the chat or close the page, and nothing you type here is sent to an AI provider.",
  rw: "Iki kiganiro kiguma muri aka gace ka mushakisha. Gishobora gusibwa igihe usibye ikiganiro cyangwa ugafunga ipaji. Ibyo wandika hano ntabwo byoherezwa ku yindi serivisi ya AI.",
  fr: "Cette conversation reste dans cet onglet. Elle est effacée lorsque vous videz la discussion ou fermez la page, et rien de ce que vous saisissez ici n'est envoyé à un fournisseur d'IA.",
};

/**
 * Safe fallback used when the engine cannot match a question confidently.
 */
export const supportFallback = {
  en: "I'm not sure I have the right answer to that question. You can explore our services, visit the FAQ page, or submit a request so the KBS team can review your needs.",
  rw: "Ntabwo mfite igisubizo cyizewe ku kibazo cyawe muri aka kanya. Ushobora kureba serivisi zacu, gusura ipaji y’Ibibazo Bikunze Kubazwa cyangwa kohereza ubusabe kugira ngo itsinda rya KBS risuzume ibyo ukeneye.",
  fr: "Je ne suis pas certain d'avoir la bonne réponse à cette question. Vous pouvez découvrir nos services, consulter la page FAQ, ou envoyer une demande afin que l'équipe KBS examine vos besoins.",
};

/**
 * Clarification prompt used when two intents match almost equally well.
 */
export const supportClarification = {
  en: "I want to make sure I answer the right question. Which of these is closest to what you need?",
  rw: "Ndifuza kumenya neza ko ngusubiza neza. Ni iki muri ibi cyegereye ibyo ukeneye?",
  fr: "Je veux être sûr de répondre à la bonne question. Lequel de ces sujets correspond le mieux à votre besoin ?",
};

/**
 * Error message shown when the assistant cannot produce an answer because of
 * an unexpected internal problem.
 */
export const supportError = {
  en: "Something went wrong while preparing that answer. Please try again, or use the links below to reach the right page directly.",
  rw: "Habaye ikibazo mu gutegura igisubizo. Ongera ugerageze, cyangwa ukoreshe amahuza ari hepfo kugira ngo ujye ku ipaji ijyanye n’icyo ukeneye.",
  fr: "Une erreur est survenue lors de la préparation de cette réponse. Réessayez, ou utilisez les liens ci-dessous pour accéder directement à la bonne page.",
};

export default supportIntents;

