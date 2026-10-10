
/*
  PORTAFOLIO PERSONAL
  Para actualizar tus proyectos, edita la lista projects.
  No necesitas base de datos ni inicio de sesión.
*/

const profile = {
  name: "Tu nombre",
  role: "Desarrollador de software en formación",

  intro:
    "Soy estudiante de desarrollo de software interesado en la programación, el diseño web y la creación de aplicaciones útiles. Me gusta aprender nuevas tecnologías y convertir ideas en soluciones digitales.",

  about:
    "Me interesa el desarrollo de software, la creación de páginas web, las aplicaciones y el diseño de interfaces. A través de mis proyectos académicos y personales busco fortalecer mis conocimientos, resolver problemas y adquirir experiencia práctica.",

  email: "tu-correo@ejemplo.com",

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "SQL",
    "Git",
    "GitHub"
  ],

  education: [
    {
      title: "Formación en desarrollo de software",
      place: "Uniagustiniana",
      period: "En curso"
    }
  ]
};

/*
  PROYECTOS

  Para agregar un proyecto, copia uno de los objetos y cambia sus datos.
  github y demo deben ser enlaces completos, por ejemplo:
  https://github.com/usuario/repositorio

  Si todavía no tienes un enlace, deja el valor como "".
*/

const projects = [
  {
    id: "crazy-toys",
    title: "CRAZY TOYS",
    icon: "🏍️",
    type: "Desarrollo web",
    description:
      "Plataforma web para la venta de repuestos de motos y la presentación de servicios de taller. Incluye catálogo de productos, información de servicios y una interfaz adaptable.",

    tech: ["HTML", "CSS", "JavaScript"],

    github: "",
    demo: ""
  },

  {
    id: "consejos",
    title: "Aplicación de consejos",
    icon: "💡",
    type: "Aplicación web",
    description:
      "Aplicación desarrollada con React y Vite que permite consultar consejos mediante una API, buscar contenido y guardar los consejos favoritos.",

    tech: ["React", "Vite", "JavaScript", "API"],

    github: "",
    demo: ""
  },

  {
    id: "kalico",
    title: "KALICO — Gestión Psicológica",
    icon: "🩺",
    type: "Aplicación de escritorio",
    description:
      "Aplicación de escritorio para apoyar la gestión de información de pacientes, con una interfaz gráfica y conexión a una base de datos.",

    tech: ["Python", "CustomTkinter", "Supabase"],

    github: "",
    demo: ""
  }
];

/* Función para encontrar elementos HTML por su ID. */
const $ = (id) => document.getElementById(id);

/* Evita interpretar como HTML el texto de los proyectos. */
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

/* Acepta únicamente enlaces web HTTP o HTTPS. */
function safeURL(value) {
  try {
    const url = new URL(value);

    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.href;
    }
  } catch {
    // El enlace está vacío o no tiene un formato válido.
  }

  return "";
}

/* Muestra el perfil y la información de contacto. */
function renderProfile() {
  $("heroName").textContent = profile.name;
  $("cardName").textContent = profile.name;
  $("cardRole").textContent = profile.role;
  $("heroIntro").textContent = profile.intro;
  $("aboutText").textContent = profile.about;
  $("footerName").textContent = profile.name;

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  $("avatar").textContent = initials || "TN";

  $("heroSkills").innerHTML = profile.skills
    .slice(0, 4)
    .map((skill) => {
      return `<span class="tag">${escapeHTML(skill)}</span>`;
    })
    .join("");

  $("skills").innerHTML = profile.skills
    .map((skill) => {
      return `<span class="skill">${escapeHTML(skill)}</span>`;
    })
    .join("");

  const emailLink = $("emailLink");
  const email = profile.email.trim();

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = "Escríbeme ↗";
    emailLink.style.display = "inline-flex";
  } else {
    emailLink.removeAttribute("href");
    emailLink.textContent = "Configura tu correo";
    emailLink.style.display = "inline-flex";
  }

  $("education").innerHTML = profile.education
    .map((item) => {
      return `
        <div class="timeline-item">
          <strong>${escapeHTML(item.title)}</strong>
          <span>
            ${escapeHTML(item.place)}
            ${item.period ? ` · ${escapeHTML(item.period)}` : ""}
          </span>
        </div>
      `;
    })
    .join("");
}

/* Construye las tarjetas de proyectos automáticamente. */
function renderProjects() {
  $("projectCount").textContent =
    `${projects.length} ${projects.length === 1 ? "proyecto" : "proyectos"}`;

  $("projectGrid").innerHTML = projects
    .map((project) => {
      const github = safeURL(project.github);
      const demo = safeURL(project.demo);

      const tags = (project.tech || [])
        .map((technology) => {
          return `<span class="tag">${escapeHTML(technology)}</span>`;
        })
        .join("");

      const links = [];

      if (github) {
        links.push(`
          <a href="${escapeHTML(github)}"
             target="_blank"
             rel="noopener noreferrer">
            GitHub ↗
          </a>
        `);
      }

      if (demo) {
        links.push(`
          <a href="${escapeHTML(demo)}"
             target="_blank"
             rel="noopener noreferrer">
            Ver demo ↗
          </a>
        `);
      }

      return `
        <article class="project-card">
          <div class="project-top">
            <div class="project-icon" aria-hidden="true">
              ${escapeHTML(project.icon || "💻")}
            </div>
            <span class="project-type">
              ${escapeHTML(project.type || "Proyecto")}
            </span>
          </div>

          <h3>${escapeHTML(project.title)}</h3>

          <p>${escapeHTML(project.description)}</p>

          <div class="project-tags">
            ${tags}
          </div>

          ${
            links.length
              ? `<div class="project-links">${links.join("")}</div>`
              : ""
          }
        </article>
      `;
    })
    .join("");
}

/* Descarga un resumen de la hoja de vida como archivo de texto. */
function downloadCV() {
  const content = [
    profile.name,
    profile.role,
    "",
    "PRESENTACIÓN",
    profile.intro,
    "",
    "SOBRE MÍ",
    profile.about,
    "",
    "CORREO DE CONTACTO",
    profile.email,
    "",
    "FORMACIÓN ACADÉMICA",
    ...profile.education.map((item) =>
      `${item.title} - ${item.place} - ${item.period}`
    ),
    "",
    "HABILIDADES",
    profile.skills.join(", "),
    "",
    "PROYECTOS",
    ...projects.flatMap((project) => [
      "",
      project.title,
      project.description,
      `Tecnologías: ${(project.tech || []).join(", ")}`,
      `GitHub: ${safeURL(project.github) || "No agregado"}`,
      `Demo: ${safeURL(project.demo) || "No agregada"}`
    ])
  ].join("\n");

  const blob = new Blob(
    ["\uFEFF", content],
    { type: "text/plain;charset=utf-8" }
  );

  const downloadURL = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadURL;
  link.download = "hoja-de-vida.txt";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(downloadURL);
}

/* Inicializa la página. */
function initPortfolio() {
  renderProfile();
  renderProjects();

  $("year").textContent = new Date().getFullYear();
  $("downloadCv").addEventListener("click", downloadCV);
}

initPortfolio();
