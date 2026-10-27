/*
 * All interface text in English and Finnish.
 *
 * How to edit:
 * - Change the text here, not in index.html. (The English text in index.html
 *   is only a fallback for visitors without JavaScript and for search engines.)
 * - To add new text: add a key to `en`, then TypeScript will tell you to add
 *   the same key to `fi`. Use it in HTML with data-i18n="your.key".
 */

export const languages = ['en', 'fi'] as const;
export type Language = (typeof languages)[number];

const en = {
  // Page metadata
  'meta.title': 'Kamilla — Web Developer & Digital Media Student',
  'meta.description':
    'Portfolio of Kamilla, an ICT student at Metropolia University of Applied Sciences specializing in Digital Media and Web Technologies.',

  // Header & navigation
  skipLink: 'Skip to main content',
  'nav.label': 'Main',
  'nav.home': 'Kamilla, back to top',
  'nav.menu': 'Menu',
  'nav.about': 'About',
  'nav.projects': 'Projects',
  'nav.skills': 'Skills',
  'nav.contact': 'Contact',
  'nav.language': 'Language',
  'nav.github': 'Kamilla on GitHub',

  // Hero
  'hero.status': 'ICT student · Open to internships',
  'hero.greeting': 'Hi, I’m Kamilla.',
  'hero.taglineStart': 'I design and build',
  'hero.taglineHighlight': 'user-friendly',
  'hero.taglineEnd': 'web experiences.',
  'hero.lead':
    'I’m an Information and Communication Technology student at Metropolia University of Applied Sciences, specializing in Digital Media and Web Technologies.',
  'hero.ctaWork': 'View my work',
  'hero.ctaContact': 'Contact me',
  'hero.cardLabel': 'Switch the card view',
  'hero.cardDesign': 'Design',
  'hero.cardCode': 'Code',
  'hero.wireframeAlt': 'Simple wireframe sketch of a web page',

  // About
  'about.label': 'About',
  'about.title': 'Where design meets code',
  'about.p1':
    'I’m an ICT student at Metropolia University of Applied Sciences, focusing on Digital Media and Web Technologies. I enjoy the whole journey of a web project: figuring out what users need, sketching ideas, and turning them into working, responsive interfaces.',
  'about.p2':
    'I care about clean code, accessibility, and details that make a site feel easy to use. Right now I’m building my skills in TypeScript, UI/UX design, and modern frontend development.',
  'about.p3':
    '[Placeholder: add something personal here, such as what got you into web development, a hobby, or what you’re currently learning.]',
  'about.portraitAlt': 'Portrait placeholder. Replace with a photo of Kamilla.',
  'about.factsTitle': 'Quick facts',
  'about.factStudies': 'Studies',
  'about.factStudiesValue': 'ICT, Metropolia UAS',
  'about.factFocus': 'Focus',
  'about.factFocusValue': 'Frontend & UI/UX',
  'about.factLocation': 'Based in',
  'about.factLocationValue': '[Your city], Finland',
  'about.factLanguages': 'Languages',
  'about.factLanguagesValue': 'Finnish, English',

  // Projects
  'projects.label': 'Projects',
  'projects.title': 'Selected work',
  'projects.intro':
    'A few projects from my studies and free time. Each one taught me something new about building for the web.',
  'projects.technologies': 'Technologies used',
  'projects.live': 'Live site',
  'projects.code': 'Source code',
  'projects.more': 'See more of my work on GitHub',

  // Skills
  'skills.label': 'Skills',
  'skills.title': 'Tools & technologies',
  'skills.intro': 'What I work with and keep learning more about.',
  'skills.frontend': 'Frontend',
  'skills.frontendText': 'Building the parts of a website people see and use.',
  'skills.databases': 'Databases',
  'skills.databasesText': 'Storing and working with data behind an application.',
  'skills.tools': 'Tools',
  'skills.toolsText': 'My everyday setup for writing, versioning and shipping code.',
  'skills.uiux': 'UI / UX',
  'skills.uiuxText': 'Making sure what I build works for real people.',
  'skills.responsive': 'Responsive design',
  'skills.accessibility': 'Accessibility',
  'skills.userCentered': 'User-centered design',

  // Education
  'education.label': 'Education',
  'education.title': 'Studies',
  'education.dates': '20XX – 20XX (expected)',
  'education.school': 'Metropolia University of Applied Sciences',
  'education.degree': 'Bachelor of Engineering, Information and Communication Technology',
  'education.specialization': 'Specialization: Digital Media and Web Technologies',
  'education.text':
    '[Placeholder: mention relevant courses or study projects, for example web development, UI/UX design, databases, or digital media production.]',

  // Contact
  'contact.label': 'Contact',
  'contact.title': 'Let’s get in touch',
  'contact.text':
    'I’m looking for internship and junior opportunities in web development, frontend, and UI/UX. If you’d like to chat, the best way to reach me is by email.',
  'contact.emailLabel': 'Email',
  'contact.linksLabel': 'Find me online',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',

  // Contact form
  'form.title': 'Send a message',
  'form.notice':
    'Heads up: this form isn’t connected to a sending service yet. Email is the most reliable way to reach me.',
  'form.name': 'Name',
  'form.email': 'Email',
  'form.message': 'Message',
  'form.required': 'required',
  'form.submit': 'Send message',
  'form.sending': 'Sending…',
  'form.nameRequired': 'Please enter your name.',
  'form.emailRequired': 'Please enter your email address.',
  'form.emailInvalid': 'Please enter a valid email address, like name@example.com.',
  'form.messageRequired': 'Please write a message.',
  'form.fixErrors': 'Please fix the highlighted fields and try again.',
  'form.notConnected':
    'Your message was not sent because this form isn’t connected yet. Please email me directly instead.',
  'form.success': 'Thank you! Your message has been sent.',
  'form.failure': 'Something went wrong and your message was not sent. Please try again or email me directly.',

  // Footer
  'footer.built': 'Built with Vite + TypeScript',
  'footer.backToTop': 'Back to top',
};

export type TranslationKey = keyof typeof en;

// Record<TranslationKey, string> makes TypeScript report any missing Finnish text.
const fi: Record<TranslationKey, string> = {
  'meta.title': 'Kamilla — Web-kehittäjä ja digitaalisen median opiskelija',
  'meta.description':
    'Kamillan portfolio. Tieto- ja viestintätekniikan opiskelija Metropolia Ammattikorkeakoulussa, suuntautumisena digitaalinen media ja verkkoteknologiat.',

  skipLink: 'Siirry pääsisältöön',
  'nav.label': 'Päävalikko',
  'nav.home': 'Kamilla, takaisin alkuun',
  'nav.menu': 'Valikko',
  'nav.about': 'Minusta',
  'nav.projects': 'Projektit',
  'nav.skills': 'Osaaminen',
  'nav.contact': 'Yhteystiedot',
  'nav.language': 'Kieli',
  'nav.github': 'Kamilla GitHubissa',

  'hero.status': 'ICT-opiskelija · Avoin harjoittelupaikoille',
  'hero.greeting': 'Hei, olen Kamilla.',
  'hero.taglineStart': 'Suunnittelen ja rakennan',
  'hero.taglineHighlight': 'käyttäjäystävällisiä',
  'hero.taglineEnd': 'verkkokokemuksia.',
  'hero.lead':
    'Opiskelen tieto- ja viestintätekniikkaa Metropolia Ammattikorkeakoulussa ja suuntaudun digitaaliseen mediaan ja verkkoteknologioihin.',
  'hero.ctaWork': 'Katso projektini',
  'hero.ctaContact': 'Ota yhteyttä',
  'hero.cardLabel': 'Vaihda kortin näkymää',
  'hero.cardDesign': 'Suunnittelu',
  'hero.cardCode': 'Koodi',
  'hero.wireframeAlt': 'Yksinkertainen rautalankamalli verkkosivusta',

  'about.label': 'Minusta',
  'about.title': 'Siellä missä design ja koodi kohtaavat',
  'about.p1':
    'Opiskelen tieto- ja viestintätekniikkaa Metropolia Ammattikorkeakoulussa, ja suuntautumiseni on digitaalinen media ja verkkoteknologiat. Nautin verkkoprojektin jokaisesta vaiheesta: käyttäjien tarpeiden selvittämisestä, ideoiden luonnostelusta ja niiden muuttamisesta toimiviksi, responsiivisiksi käyttöliittymiksi.',
  'about.p2':
    'Minulle ovat tärkeitä siisti koodi, saavutettavuus ja yksityiskohdat, jotka tekevät sivustosta helppokäyttöisen. Tällä hetkellä kehitän osaamistani TypeScriptissä, UI/UX-suunnittelussa ja modernissa frontend-kehityksessä.',
  'about.p3':
    '[Paikkamerkki: kerro tässä jotain henkilökohtaista, esimerkiksi miten kiinnostuit web-kehityksestä, harrastuksistasi tai mitä opettelet juuri nyt.]',
  'about.portraitAlt': 'Kuvan paikkamerkki. Korvaa Kamillan valokuvalla.',
  'about.factsTitle': 'Pikafaktat',
  'about.factStudies': 'Opinnot',
  'about.factStudiesValue': 'ICT, Metropolia AMK',
  'about.factFocus': 'Painopiste',
  'about.factFocusValue': 'Frontend ja UI/UX',
  'about.factLocation': 'Sijainti',
  'about.factLocationValue': '[Kaupunkisi], Suomi',
  'about.factLanguages': 'Kielet',
  'about.factLanguagesValue': 'suomi, englanti',

  'projects.label': 'Projektit',
  'projects.title': 'Valittuja töitä',
  'projects.intro':
    'Muutamia projekteja opinnoistani ja vapaa-ajaltani. Jokainen niistä opetti minulle jotain uutta verkkosivujen rakentamisesta.',
  'projects.technologies': 'Käytetyt teknologiat',
  'projects.live': 'Avaa sivusto',
  'projects.code': 'Lähdekoodi',
  'projects.more': 'Katso lisää töitäni GitHubissa',

  'skills.label': 'Osaaminen',
  'skills.title': 'Työkalut ja teknologiat',
  'skills.intro': 'Asioita, joiden parissa työskentelen ja joista opin jatkuvasti lisää.',
  'skills.frontend': 'Frontend',
  'skills.frontendText': 'Verkkosivuston osat, joita ihmiset näkevät ja käyttävät.',
  'skills.databases': 'Tietokannat',
  'skills.databasesText': 'Sovelluksen taustalla olevan datan tallentaminen ja käsittely.',
  'skills.tools': 'Työkalut',
  'skills.toolsText': 'Arjen työkaluni koodin kirjoittamiseen, versionhallintaan ja julkaisuun.',
  'skills.uiux': 'UI / UX',
  'skills.uiuxText': 'Varmistan, että tekemäni asiat toimivat oikeille ihmisille.',
  'skills.responsive': 'Responsiivinen suunnittelu',
  'skills.accessibility': 'Saavutettavuus',
  'skills.userCentered': 'Käyttäjäkeskeinen suunnittelu',

  'education.label': 'Koulutus',
  'education.title': 'Opinnot',
  'education.dates': '20XX – 20XX (arvioitu)',
  'education.school': 'Metropolia Ammattikorkeakoulu',
  'education.degree': 'Insinööri (AMK), tieto- ja viestintätekniikka',
  'education.specialization': 'Suuntautuminen: digitaalinen media ja verkkoteknologiat',
  'education.text':
    '[Paikkamerkki: mainitse olennaisia kursseja tai opintoprojekteja, esimerkiksi web-kehitys, UI/UX-suunnittelu, tietokannat tai digitaalisen median tuotanto.]',

  'contact.label': 'Yhteystiedot',
  'contact.title': 'Ollaan yhteydessä',
  'contact.text':
    'Etsin harjoittelu- ja junioritehtäviä web-kehityksen, frontendin ja UI/UX:n parista. Jos haluat jutella, tavoitat minut parhaiten sähköpostilla.',
  'contact.emailLabel': 'Sähköposti',
  'contact.linksLabel': 'Löydät minut myös täältä',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',

  'form.title': 'Lähetä viesti',
  'form.notice':
    'Huomio: lomaketta ei ole vielä yhdistetty lähetyspalveluun. Sähköposti on varmin tapa tavoittaa minut.',
  'form.name': 'Nimi',
  'form.email': 'Sähköposti',
  'form.message': 'Viesti',
  'form.required': 'pakollinen',
  'form.submit': 'Lähetä viesti',
  'form.sending': 'Lähetetään…',
  'form.nameRequired': 'Kirjoita nimesi.',
  'form.emailRequired': 'Kirjoita sähköpostiosoitteesi.',
  'form.emailInvalid': 'Kirjoita kelvollinen sähköpostiosoite, esimerkiksi nimi@esimerkki.fi.',
  'form.messageRequired': 'Kirjoita viesti.',
  'form.fixErrors': 'Korjaa korostetut kentät ja yritä uudelleen.',
  'form.notConnected':
    'Viestiäsi ei lähetetty, koska lomaketta ei ole vielä yhdistetty. Lähetä minulle mieluummin sähköpostia.',
  'form.success': 'Kiitos! Viestisi on lähetetty.',
  'form.failure': 'Jokin meni vikaan, eikä viestiä lähetetty. Yritä uudelleen tai lähetä minulle sähköpostia.',

  'footer.built': 'Tehty Vitellä ja TypeScriptillä',
  'footer.backToTop': 'Takaisin alkuun',
};

export const translations: Record<Language, Record<TranslationKey, string>> = { en, fi };
