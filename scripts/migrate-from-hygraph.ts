import fs from 'fs/promises';
import path from 'path';
import TurndownService from 'turndown';

const HYGRAPH_URL = process.env.HYGRAPH_URL;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

if (!HYGRAPH_URL || !HYGRAPH_TOKEN) {
  throw new Error('HYGRAPH_URL e HYGRAPH_TOKEN devem estar definidos no .env');
}

const turndown = new TurndownService({ headingStyle: 'atx' });

const CONTENT_DIR = path.join(process.cwd(), 'content', 'pt');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

const GET_PAGE_INFO = `
  query pageInfoQuery {
    page(where: { slug: "home" }) {
      introducao {
        raw
        html
      }
      tecnologiasConhecidas {
        iconeSvg
        nome
        dataDeInicio
      }
      tecnologias {
        nome
      }
      imagemDePerfil {
        url
      }
      redeSocials {
        url
        iconeSvg
      }
      projetosEmDestaque {
        slug
        thumbnail {
          url
        }
        titulo
        descricaoCurta
        tecnologias {
          nome
        }
      }
    }
    experienciaDeTrabalhos {
      logoDaEmpresa {
        url
      }
      cargo
      empresa
      empresaUrl
      dataDeInicio
      dataFinal
      descricao {
        raw
        html
      }
      tecnologias {
        nome
      }
    }
  }
`;

const GET_PROJECTS = `
  query ProjectQuery {
    projetos {
      descricaoCurta
      slug
      titulo
      thumbnail {
        url
      }
      tecnologias {
        nome
      }
    }
  }
`;

const GET_PROJECT_DETAILS = `
  query ProjectQuery($slug: String!) {
    projeto(where: { slug: $slug }) {
      thumbnailDaPagina {
        url
      }
      thumbnail {
        url
      }
      sessoes {
        titulo
        imagem {
          url
        }
      }
      titulo
      descricaoCurta
      descricao {
        raw
        html
      }
      tecnologias {
        nome
      }
      projetoUrl
      githubUrl
    }
  }
`;

const GET_PROJECTS_SLUG = `
  query ProjectsSlugsQuery {
    projetos(first: 100) {
      slug
    }
  }
`;

async function fetchHygraph(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(HYGRAPH_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data;
}

function toFrontmatterValue(value: unknown): string {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  return JSON.stringify(value);
}

function stringifyFrontmatter(data: Record<string, unknown>): string {
  const lines = Object.entries(data).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}:\n${value.map((item) => `  - ${toFrontmatterValue(item)}`).join('\n')}`;
    }
    return `${key}: ${toFrontmatterValue(value)}`;
  });
  return `---\n${lines.join('\n')}\n---\n`;
}

async function downloadImage(url: string, folder: string): Promise<string> {
  await fs.mkdir(folder, { recursive: true });
  const parsed = new URL(url);
  const originalName = path.basename(parsed.pathname) || 'image';
  const ext = path.extname(originalName) || '.jpg';
  const baseName = path.basename(originalName, ext);
  const safeName = `${baseName}${ext}`.replace(/[^a-zA-Z0-9._-]/g, '-');
  const filePath = path.join(folder, safeName);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao baixar ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/images/${path.relative(IMAGES_DIR, filePath).replace(/\\/g, '/')}`;
}

function inferCategory(technologies: string[]): 'frontend' | 'backend' | 'fullstack' {
  const frontTechs = new Set([
    'react', 'next.js', 'next', 'vue', 'angular', 'svelte', 'html', 'css',
    'tailwind css', 'tailwind', 'sass', 'scss', 'styled-components', 'javascript',
    'typescript', 'vite', 'webpack', 'figma', 'shadcn ui', 'radix ui', 'framer motion',
  ]);
  const backTechs = new Set([
    'node.js', 'node', 'nestjs', 'nest', 'express', 'fastify', 'java', 'spring',
    'python', 'django', 'fastapi', 'flask', 'go', 'ruby', 'rails', 'php', 'laravel',
    'postgresql', 'mysql', 'mongodb', 'redis', 'prisma', 'typeorm', 'docker', 'aws',
    'firebase', 'supabase', 'graphql', 'rest api', 'api', 'kafka', 'rabbitmq',
  ]);

  const normalized = technologies.map((t) => t.toLowerCase());
  const hasFront = normalized.some((t) => frontTechs.has(t));
  const hasBack = normalized.some((t) => backTechs.has(t));

  if (hasFront && hasBack) return 'fullstack';
  if (hasBack) return 'backend';
  return 'frontend';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

async function main() {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.mkdir(path.join(CONTENT_DIR, 'projects'), { recursive: true });
  await fs.mkdir(path.join(CONTENT_DIR, 'experiences'), { recursive: true });
  await fs.mkdir(path.join(CONTENT_DIR, 'blog'), { recursive: true });
  await fs.mkdir(IMAGES_DIR, { recursive: true });

  console.log('Buscando dados da home...');
  const pageData = await fetchHygraph(GET_PAGE_INFO);
  const page = pageData.page;

  const profileImagePath = await downloadImage(
    page.imagemDePerfil.url,
    path.join(IMAGES_DIR, 'profile'),
  );

  const knownTechs = page.tecnologiasConhecidas.map((tech: any) => ({
    name: tech.nome,
    icon: tech.iconeSvg,
    startDate: formatDate(tech.dataDeInicio),
  }));

  const heroTechs = page.tecnologias.map((tech: any) => tech.nome);

  const socials = page.redeSocials.map((social: any) => ({
    name: social.url,
    url: social.url,
    icon: social.iconeSvg,
  }));

  const homeFrontmatter = {
    name: 'Gabriel Sousa',
    role: 'Desenvolvedor Full Stack',
    profileImage: profileImagePath,
    knownTechs,
    heroTechs,
    socials,
  };

  await fs.writeFile(
    path.join(CONTENT_DIR, 'home.mdx'),
    stringifyFrontmatter(homeFrontmatter) + '\n' + turndown.turndown(page.introducao.html || ''),
  );

  console.log('Home salva.');

  console.log('Buscando experiências...');
  for (const exp of pageData.experienciaDeTrabalhos) {
    const logoPath = await downloadImage(
      exp.logoDaEmpresa.url,
      path.join(IMAGES_DIR, 'experiences'),
    );

    const frontmatter = {
      role: exp.cargo,
      company: exp.empresa,
      companyUrl: exp.empresaUrl,
      companyLogo: logoPath,
      startDate: formatDate(exp.dataDeInicio),
      endDate: exp.dataFinal ? formatDate(exp.dataFinal) : null,
      technologies: exp.tecnologias.map((t: any) => t.nome),
    };

    const slug = exp.empresa
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    await fs.writeFile(
      path.join(CONTENT_DIR, 'experiences', `${slug}.mdx`),
      stringifyFrontmatter(frontmatter) + '\n' + turndown.turndown(exp.descricao.html || ''),
    );
  }

  console.log(`${pageData.experienciaDeTrabalhos.length} experiências salvas.`);

  console.log('Buscando projetos...');
  const projectsData = await fetchHygraph(GET_PROJECTS);
  const slugsData = await fetchHygraph(GET_PROJECTS_SLUG);
  const slugs = slugsData.projetos.map((p: any) => p.slug);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    console.log(`  - ${slug}`);
    const data = await fetchHygraph(GET_PROJECT_DETAILS, { slug });
    const projeto = data.projeto;
    if (!projeto) continue;

    const thumbnailPath = await downloadImage(
      projeto.thumbnail.url,
      path.join(IMAGES_DIR, 'projects'),
    );

    const pageThumbnailPath = projeto.thumbnailDaPagina
      ? await downloadImage(
          projeto.thumbnailDaPagina.url,
          path.join(IMAGES_DIR, 'projects'),
        )
      : thumbnailPath;

    const sections = await Promise.all(
      (projeto.sessoes || []).map(async (section: any) => {
        const sectionImagePath = await downloadImage(
          section.imagem.url,
          path.join(IMAGES_DIR, 'projects', slug),
        );
        return {
          title: section.titulo,
          image: sectionImagePath,
        };
      }),
    );

    const technologies = projeto.tecnologias.map((t: any) => t.nome);

    const frontmatter = {
      title: projeto.titulo,
      shortDescription: projeto.descricaoCurta,
      category: inferCategory(technologies),
      featured: (page.projetosEmDestaque || []).some((p: any) => p.slug === slug),
      order: i,
      technologies,
      thumbnail: thumbnailPath,
      pageThumbnail: pageThumbnailPath,
      sections,
      projectUrl: projeto.projetoUrl || undefined,
      githubUrl: projeto.githubUrl || undefined,
    };

    await fs.writeFile(
      path.join(CONTENT_DIR, 'projects', `${slug}.mdx`),
      stringifyFrontmatter(frontmatter) + '\n' + turndown.turndown(projeto.descricao.html || ''),
    );
  }

  console.log(`${slugs.length} projetos salvos.`);
  console.log('Migração concluída!');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
