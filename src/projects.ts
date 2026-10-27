import { getLanguage, t } from './i18n';
import type { Language } from './translations';

/** Text that has an English and a Finnish version. */
type LocalizedText = Record<Language, string>;

export interface Project {
  title: LocalizedText;
  description: LocalizedText;
  image: {
    /** File inside public/images/projects/. Use a 16:10 image, e.g. 1200 × 750 px. */
    file: string;
    alt: LocalizedText;
  };
  technologies: string[];
  /** Optional: leave out if the project has no live version. */
  liveUrl?: string;
  /** Optional: leave out if the code is private. */
  repoUrl?: string;
  /** Featured projects get a wider card on large screens. Use for one project at most. */
  featured?: boolean;
}

/*
 * ✏️ PLACEHOLDER PROJECTS: replace these with your own.
 * To add a project, copy one object and edit it. The layout adapts automatically.
 */
export const projects: Project[] = [
  {
    title: { en: 'Project One (placeholder)', fi: 'Projekti yksi (paikkamerkki)' },
    description: {
      en: 'Describe your strongest project here: what problem it solves, what you built, and what you learned along the way. Two or three sentences is plenty.',
      fi: 'Kuvaile tässä vahvin projektisi: minkä ongelman se ratkaisee, mitä rakensit ja mitä opit matkan varrella. Kaksi tai kolme lausetta riittää.',
    },
    image: {
      file: 'project-placeholder-1.svg',
      alt: {
        en: 'Placeholder screenshot for Project One',
        fi: 'Projekti yhden kuvakaappauksen paikkamerkki',
      },
    },
    technologies: ['TypeScript', 'Vite', 'CSS'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/kamillaka',
    featured: true,
  },
  {
    title: { en: 'Project Two (placeholder)', fi: 'Projekti kaksi (paikkamerkki)' },
    description: {
      en: 'A short description of another project, for example a school assignment where you worked with a database or in a team.',
      fi: 'Lyhyt kuvaus toisesta projektista, esimerkiksi koulutehtävästä, jossa työskentelit tietokannan kanssa tai tiimissä.',
    },
    image: {
      file: 'project-placeholder-2.svg',
      alt: {
        en: 'Placeholder screenshot for Project Two',
        fi: 'Projekti kahden kuvakaappauksen paikkamerkki',
      },
    },
    technologies: ['JavaScript', 'HTML', 'MariaDB'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/kamillaka',
  },
  {
    title: { en: 'Project Three (placeholder)', fi: 'Projekti kolme (paikkamerkki)' },
    description: {
      en: 'A short description of a third project. This could be a UI/UX case, a design prototype or a small personal experiment.',
      fi: 'Lyhyt kuvaus kolmannesta projektista. Se voi olla UI/UX-tapaus, suunnitteluprototyyppi tai pieni oma kokeilu.',
    },
    image: {
      file: 'project-placeholder-3.svg',
      alt: {
        en: 'Placeholder screenshot for Project Three',
        fi: 'Projekti kolmen kuvakaappauksen paikkamerkki',
      },
    },
    technologies: ['HTML', 'CSS', 'MongoDB'],
    repoUrl: 'https://github.com/kamillaka',
  },
];

function createProjectLink(href: string, label: string, projectTitle: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.className = 'project-link';
  link.href = href;

  // Visible text stays short; screen readers also hear the project name.
  const visibleText = document.createElement('span');
  visibleText.textContent = label;
  const hiddenContext = document.createElement('span');
  hiddenContext.className = 'visually-hidden';
  hiddenContext.textContent = `: ${projectTitle}`;
  const arrow = document.createElement('span');
  arrow.className = 'project-link-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';

  link.append(visibleText, hiddenContext, arrow);
  return link;
}

/** Fills the project grid using the <template id="project-card-template"> in index.html. */
export function renderProjects(container: HTMLElement): void {
  const template = document.querySelector<HTMLTemplateElement>('#project-card-template');
  if (!template) return;

  const language = getLanguage();
  const cards = projects.map((project, index) => {
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const card = fragment.querySelector<HTMLElement>('.project-card')!;
    const title = project.title[language];

    card.classList.toggle('is-featured', Boolean(project.featured));
    // Featured images are near the top of the section, so they load right away.
    const image = card.querySelector<HTMLImageElement>('.project-image')!;
    image.src = `${import.meta.env.BASE_URL}images/projects/${project.image.file}`;
    image.alt = project.image.alt[language];
    if (project.featured) image.loading = 'eager';

    card.querySelector('.project-number')!.textContent = String(index + 1).padStart(2, '0');
    card.querySelector('.project-title')!.textContent = title;
    card.querySelector('.project-description')!.textContent = project.description[language];

    const tagList = card.querySelector<HTMLUListElement>('.project-tags')!;
    tagList.setAttribute('aria-label', t('projects.technologies'));
    tagList.append(
      ...project.technologies.map((technology) => {
        const item = document.createElement('li');
        item.className = 'tag';
        item.textContent = technology;
        return item;
      }),
    );

    const links = card.querySelector<HTMLElement>('.project-links')!;
    if (project.liveUrl) links.append(createProjectLink(project.liveUrl, t('projects.live'), title));
    if (project.repoUrl) links.append(createProjectLink(project.repoUrl, t('projects.code'), title));

    return fragment;
  });

  container.replaceChildren(...cards);
}
