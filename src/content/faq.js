/**
 * Frequently asked questions.
 *
 * Every answer must stay consistent with what KBS actually offers. No prices,
 * no guarantees, no invented deadlines. `id` values are referenced by
 * `src/content/services.js` (`relatedFaqs`) and by the support knowledge base.
 */

export const faqCategories = [
  { id: 'general', labelKey: 'faqCategoryGeneral' },
  { id: 'business-documents', labelKey: 'faqCategoryDocuments' },
  { id: 'graphic-design', labelKey: 'faqCategoryDesign' },
  { id: 'web-development', labelKey: 'faqCategoryWeb' },
  { id: 'pricing', labelKey: 'faqCategoryPricing' },
  { id: 'process', labelKey: 'faqCategoryProcess' },
  { id: 'privacy', labelKey: 'faqCategoryPrivacy' },
]

export const faqs = [
  {
    id: 'faq-services-overview',
    category: 'general',
    order: 1,
    locales: {
      en: {
        question: 'What services does KBS offer?',
        answer:
          'KBS provides three core services: Business Documents, Graphic Design and Web Development. You can read the full overview on the Services page or send your request through the Request a Service form.',
      },
      rw: {
        question: 'Ni ubuhe serivisi KBS itanga?',
        answer:
          "KBS itanga serivisi nke: Amanduku y'Ubucuruzi, Ugaragaza Ibinyabiziga, no Gushyira Website. Urashobora gusura ipaji ya Serivisi cyangwa ukohereza isunika ry'ubusabe serivisi.",
      },
      fr: {
        question: 'Quels services KBS propose-t-il ?',
        answer:
          "KBS propose trois services principaux : Documents Professionnels, Design Graphique et Développement Web. Vous pouvez consulter la page Services ou envoyer votre demande via le formulaire de demande de service.",
      },
    },
  },
  {
    id: 'faq-documents-what',
    category: 'business-documents',
    order: 2,
    locales: {
      en: {
        question: 'Can KBS help with a CV or resume?',
        answer:
          'Yes. Business Documents services may include CV and resume writing or improvement, cover letters, professional document formatting and proofreading. Share the role you are targeting so the document can be tailored.',
      },
      rw: {
        question: 'KBS ishobora gufasha mu CV cyangwa imyaka?',
        answer:
          "Yego. Amanduku y'Ubucuruzi ashobora kubuga CV n'imyaka, ibutumwa ry'ibanira imirimo, gutondeka amanduku y'abahereza no kugenzura. Ubutumwa bw'umushinga bufatanye n'akazi ukeneye.",
      },
      fr: {
        question: 'KBS peut-il aider avec un CV ?',
        answer:
          "Oui. Les Documents Professionnels peuvent inclure la rédaction ou l'amélioration de CV, les lettres de motivation, la mise en forme et la relecture de documents. Indiquez le poste visé afin que le document soit adapté.",
      },
    },
  },
  {
    id: 'faq-documents-templates',
    category: 'business-documents',
    order: 3,
    locales: {
      en: {
        question: 'Do you provide editable document templates?',
        answer:
          'Yes, editable templates can be included as a deliverable. Tell us which document type you need and how you would like to use it, and we can confirm what is possible as part of the scope.',
      },
      rw: {
        question: 'Muteka ibikoresho by’amanduku bisanzwe?',
        answer:
          "Yego, ibikoresho by'amanduku bisanzwe byashobora kuba mu mirimo.Bwira ubuwe ubwoko bw'umwanduku ukeneye n'uburyo uzabikoresha, kugira ngo tubanze icyo gishoboka gusa mu gahunda.",
      },
      fr: {
        question: 'Proposez-vous des modèles de documents modifiables ?',
        answer:
          "Oui, des modèles modifiables peuvent faire partie des livrables. Indiquez le type de document souhaité et son usage, et nous confirmerons ce qui est possible dans le périmètre.",
      },
    },
  },
  {
    id: 'faq-design-brand',
    category: 'graphic-design',
    order: 4,
    locales: {
      en: {
        question: 'What does a brand identity include?',
        answer:
          'A brand identity normally covers a logo, a colour palette, typography and the consistent application of those elements across materials such as business cards, flyers and social media graphics. The exact scope is agreed for each project.',
      },
      rw: {
        question: 'Igihano cy’ikigo gisanzwe gisanzwe ki?',
        answer:
          "Igihano cy'ikigo gisanzwe gishobora gufuka logo, amabara, imyandoko n'uburyo igihano gikoreshwa mu bintu nk ibikoresho by'ikigo, amashusho n'ibinyabiziga by'uburasobe. Ingero y'ibigengeli biganaba ni iyigerwa kuri buri mushinga.",
      },
      fr: {
        question: "Qu'est-ce qu'une identité de marque ?",
        answer:
          "Une identité de marque couvre généralement un logo, une palette de couleurs, des typographies et l'application cohérente de ces éléments sur des supports tels que cartes de visite, flyers et visuels sociaux. Le périmètre exact est défini projet par projet.",
      },
    },
  },
  {
    id: 'faq-design-files',
    category: 'graphic-design',
    order: 5,
    locales: {
      en: {
        question: 'Which file formats do you deliver?',
        answer:
          'Deliverables can include editable source files alongside ready-to-use exports such as PNG, JPG, SVG or PDF. Mention the formats you need when you submit your request.',
      },
      rw: {
        question: 'Ni ubuhe bwoko bw’idosi wangabo?',
        answer:
          "Ibikoresho byashobora gufuka idosi zashyushyirizwa hamwe n'idosi ziteguye gukoreshwa nk PNG, JPG, SVG cyangwa PDF. Menya uburyo ukeneye mu isunika ryawe.",
      },
      fr: {
        question: 'Quels formats de fichiers livrez-vous ?',
        answer:
          "Les livrables peuvent inclure des fichiers sources modifiables ainsi que des exports prêts à l'emploi (PNG, JPG, SVG, PDF). Précisez les formats souhaités dans votre demande.",
      },
    },
  },
  {
    id: 'faq-website-process',
    category: 'web-development',
    order: 6,
    locales: {
      en: {
        question: 'How does the website development process work?',
        answer:
          'It usually starts with a conversation about your goals and content, then a page structure and design direction, then development, then review and handover. Scope, pricing and timeline are agreed before work begins.',
      },
      rw: {
        question: 'Uko gushyiramo website birabera uko?',
        answer:
          "Byitandira n'ikiganiro ku ntego n'ibikoresho byawe, hanyuma imbaraga y'imperusho n'uburyo bwa design, hanyuma gushyiramo no kugenzura no gutanga. Ingero, igiciro n'igihe bigaragaza mbere yo gutangira.",
      },
      fr: {
        question: 'Comment se déroule le développement d’un site web ?',
        answer:
          "Le processus commence par un échange sur vos objectifs et vos contenus, puis par une structure de pages et une direction graphique, puis le développement, puis la relecture et la livraison. Périmètre, prix et délais sont convenus avant le début des travaux.",
      },
    },
  },
  {
    id: 'faq-web-support',
    category: 'web-development',
    order: 7,
    locales: {
      en: {
        question: 'Do you maintain websites after launch?',
        answer:
          'Maintenance and improvements can be included as a service. Describe what you need after launch — updates, changes or technical fixes — so it can be discussed as a separate scope.',
      },
      rw: {
        question: 'Muteka websites ukoreba nyuma yo kugenda?',
        answer:
          "Gubungura no kuteza imbere websites ishobora guhabwa na serivisi. Sobanura ibyo ukeneye nyuma yo kugenda — impindukiranye, impindukamano cyangwa ibibazo by'ubuzimumizi — kugira ngo biganabaganywe.",
      },
      fr: {
        question: 'Assurez-vous la maintenance après la mise en ligne ?',
        answer:
          "La maintenance et les améliorations peuvent faire partie des services. Décrivez vos besoins après la mise en ligne — mises à jour, modifications ou correctifs techniques — afin qu'ils soient traités comme un périmètre distinct.",
      },
    },
  },
  {
    id: 'faq-ecommerce',
    category: 'web-development',
    order: 8,
    locales: {
      en: {
        question: 'Can KBS build an e-commerce website?',
        answer:
          'E-commerce website development can be discussed under Web Development. Share your requirements — the products, the payment and delivery expectations, and who will manage the catalogue — so the team can assess the scope.',
      },
      rw: {
        question: 'KBS ishobora gukora website y’ubucuruzi?',
        answer:
          "Website y'ubucuruzi ishobora kuganirwa mu Gushyira Website. Ubutumwa bw'ibyo ukeneye — ibicuruzwa, uburyo bwo kwishyura no gutwara, n'uwucuruzesha ikiganda — bufatanye na kugira ngo itsinda ribone ingero y'akazi.",
      },
      fr: {
        question: 'KBS peut-il créer un site e-commerce ?',
        answer:
          "Un site e-commerce peut être discuté au titre du Développement Web. Partagez vos besoins : produits, modalités de paiement et de livraison, et gestion du catalogue, afin que l'équipe puisse évaluer le périmètre.",
      },
    },
  },
  {
    id: 'faq-pricing',
    category: 'pricing',
    order: 9,
    locales: {
      en: {
        question: 'How much does a project cost?',
        answer:
          'Project costs depend on the requirements and the scope of work. Submit your request through the Request a Service form so the team can review the details and prepare a quotation.',
      },
      rw: {
        question: 'Uyu mushinga uzabera igiciro iki?',
        answer:
          "Igiciro cy'umushinga giteranyijwe ku ibyo ukeneye n'uburyo akazi buzakora. Ohereza isunika ry'ubusabe serivisi kugira ngo itsinda ribire imbehe y'umushinga maze rige guha igiciro.",
      },
      fr: {
        question: 'Combien coûte un projet ?',
        answer:
          "Le coût dépend des besoins et du périmètre des travaux. Envoyez votre demande via le formulaire de demande de service afin que l'équipe puisse l'examiner et préparer un devis.",
      },
    },
  },
  {
    id: 'faq-turnaround',
    category: 'pricing',
    order: 10,
    locales: {
      en: {
        question: 'How long will my project take?',
        answer:
          'Timelines depend on the scope and requirements of each project, and on how quickly feedback and content are provided. The expected timeline is discussed after your project details have been reviewed.',
      },
      rw: {
        question: 'Umushinga wanjye uzamara igihe giki?',
        answer:
          "Igihe cy'umushinga giteranyijwe ku ingero y'akazi n'ibyo ukeneye, no ku kuryo ari ubuzima mu gihe. Igitihe cyitezwe nyuma yo kubona ibyo ukeneye.",
      },
      fr: {
        question: 'Combien de temps prendra mon projet ?',
        answer:
          "Les délais dépendent du périmètre et des besoins de chaque projet, ainsi que de la rapidité des retours et des contenus fournis. Le délai prévisionnel est discuté après examen de votre demande.",
      },
    },
  },
  {
    id: 'faq-revisions',
    category: 'process',
    order: 11,
    locales: {
      en: {
        question: 'Do you include revisions?',
        answer:
          'The number of revision rounds and what counts as a revision are agreed as part of the scope before work starts, so both sides know what is included.',
      },
      rw: {
        question: 'Do revisions come included?',
        answer:
          "Umubare w'inzira z'ikosora n'icyo byitabariye gukora ibosha bishyikirizwa mu gahunda y'akazi mbere yo gutangira, kugira ngo impande zombi zizi ibirimo.",
      },
      fr: {
        question: 'Les révisions sont-elles incluses ?',
        answer:
          "Le nombre d'allers-retours de révision et ce qui constitue une révision sont convenus dans le périmètre avant le début des travaux, afin que les deux parties sachent ce qui est inclus.",
      },
    },
  },
  {
    id: 'faq-request-process',
    category: 'process',
    order: 12,
    locales: {
      en: {
        question: 'How do I request a service?',
        answer:
          'Open the Request a Service page, select the relevant service, describe your project, and submit the form. You can also use the KBS Support Assistant to prepare the request first.',
      },
      rw: {
        question: 'Uko nshaka serivisi?',
        answer:
          "Fungura ipaji ya Gusaba Serivisi, hitamo serivisi ibugenewe, sobanura umushinga wowe, hanyohereza ifashiko. Ushobora kukoresha n'umufasha wa KBS wishyira imyaka mbere.",
      },
      fr: {
        question: 'Comment demander un service ?',
        answer:
          "Ouvrez la page Demander un service, sélectionnez le service concerné, décrivez votre projet, puis envoyez le formulaire. Vous pouvez aussi utiliser l'assistant KBS pour préparer votre demande au préalable.",
      },
    },
  },
  {
    id: 'faq-languages',
    category: 'general',
    order: 13,
    locales: {
      en: {
        question: 'Which languages do you work in?',
        answer:
          'The website is available in English, Kinyarwanda and French, and requests can be submitted in any of those languages. The language you prefer for project communication is agreed with the team.',
      },
      rw: {
        question: 'Ni ubuhe ndimi umurimo gukoresha?',
        answer:
          "Website iboneka mu Cyangereza, Ikinyarwanda n'Ifransa, kandi ubusabe bushobora koherezwa mu ndimi zose. Indimi wifuza gukoreshana n'itsinda igaragarijwe ku bwigeranyanye.",
      },
      fr: {
        question: 'Dans quelles langues travaillez-vous ?',
        answer:
          "Le site est disponible en anglais, en kinyarwanda et en français, et les demandes peuvent être envoyées dans l'une de ces langues. La langue de communication souhaitée est convenue avec l'équipe.",
      },
    },
  },
  {
    id: 'faq-payment',
    category: 'pricing',
    order: 14,
    locales: {
      en: {
        question: 'How does payment work?',
        answer:
          'Payment arrangements are confirmed in writing as part of the agreed scope. Submit your request first so the team can confirm the terms that apply to your project.',
      },
      rw: {
        question: 'Uko kwishyura gukora?',
        answer:
          "Amayengo y'ishyura ashyirizwa mu gahunda y'akazi yasinyiwe. Ohereza isunika ryawe mbere kugira ngo itsinda ry'akarango ishyura rishyurwe uko bikwiye.",
      },
      fr: {
        question: 'Comment le paiement fonctionne-t-il ?',
        answer:
          "Les modalités de paiement sont confirmées par écrit dans le périmètre convenu. Envoyez d'abord votre demande afin que l'équipe précise les conditions applicables à votre projet.",
      },
    },
  },
  {
    id: 'faq-privacy',
    category: 'privacy',
    order: 15,
    locales: {
      en: {
        question: 'What happens to the information I submit?',
        answer:
          'Information submitted through the forms is used to review and respond to your request. The site uses Formspree to deliver those messages, and nothing you type in the support chat is sent to an external AI provider. See the Privacy Policy page for details.',
      },
      rw: {
        question: 'Ubutumwa nohereza bwisega biki?',
        answer:
          "Ubutumwa bwoohereza hifashishwa kugenzura no gusubiza ubusabe wowe. Website ikoresha Formspree kwohereza ubutumwa, kandi ibyo ukandika mu kagufu k'umufasha ntibwohera serivisi yo hanze y'AI. Reba ipaji ya Politiki y'Ibinyamakuru.",
      },
      fr: {
        question: 'Que deviennent les informations que j’envoie ?',
        answer:
          "Les informations envoyées via les formulaires servent à examiner et à répondre à votre demande. Le site utilise Formspree pour transmettre ces messages, et rien de ce que vous saisissez dans le chat d'assistance n'est envoyé à un fournisseur d'IA externe. Consultez la page Politique de confidentialité.",
      },
    },
  },
  {
    id: 'faq-portfolio',
    category: 'general',
    order: 16,
    locales: {
      en: {
        question: 'Are the portfolio projects real client work?',
        answer:
          'The projects currently shown are concept and demo work created by KBS to demonstrate capabilities. They are labelled as such on every page. Real client work is added as it becomes available and is approved for publication.',
      },
      rw: {
        question: 'Ibiganza by’umushinga bivuganye umukiriya nyakuri?',
        answer:
          "Ibiganza bigezweho by'ubu ni igiho (concept) na demo byakozwe na KBS kugira ngo bigeze bigaragaza ubushakashatsi. Byakandikwa ko bwigenewe ku buri urupapuro. Akazi nyakuri k'umukiriya gatangira kurikira ko kwakira.",
      },
      fr: {
        question: 'Les projets du portfolio sont-ils de vrais clients ?',
        answer:
          "Les projets actuellement présentés sont des créations concepts et démo réalisées par KBS pour démontrer ses compétences. Ils sont indiqués comme tels sur chaque page. Les travaux de vrais clients seront ajoutés à mesure qu'ils existent et sont approuvés pour publication.",
      },
    },
  },
]

export function getFaqById(id) {
  return faqs.find((faq) => faq.id === id) ?? null
}

export function getFaqsByCategory(category) {
  if (!category || category === 'all') return faqs
  return faqs.filter((faq) => faq.category === category)
}

export function getFaqsByIds(ids = []) {
  return ids.map((id) => getFaqById(id)).filter(Boolean)
}

export default faqs
