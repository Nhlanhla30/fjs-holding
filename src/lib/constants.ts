export const siteConfig = {
  name: "FJS Holding",
  tagline: "Building Excellence in Engineering & Construction",
  description:
    "FJS Holding is a South African civil engineering and construction company delivering high-quality services and products in commercial and industrial sectors.",
  url: "https://www.fjsholding.co.za",
  email: "frank@fjsholding.co.za",
  phone: "061 424 3723",
  phoneRaw: "+27614243723",
  location: "South Africa",
  foundedYear: 2020,
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  {
    id: "commercial-construction",
    title: "Commercial Construction",
    description:
      "Constructing commercial buildings including offices, retail stores, and warehouses. From ground-breaking to handover, we manage every phase with precision.",
    icon: "Building2",
    image: "/images/services/commercial-construction.png",
  },
  {
    id: "project-management",
    title: "Project Management",
    description:
      "Professional project management services to oversee construction projects. We ensure timely delivery, budget adherence, and quality standards on every project.",
    icon: "ClipboardCheck",
    image: "/images/services/project-management.png",
  },
  {
    id: "engineering-services",
    title: "Engineering Services",
    description:
      "Expert engineering for structural, civil, electrical, and mechanical aspects of projects. Our team brings deep technical knowledge to solve complex challenges.",
    icon: "Wrench",
    image: "/images/services/engineering-services.png",
  },
  {
    id: "construction-materials",
    title: "Construction Materials",
    description:
      "Supply of high-quality construction materials including cement, concrete, steel, and lumber. Sourced from trusted suppliers for reliability and durability.",
    icon: "Layers",
    image: "/images/services/construction-materials.png",
  },
  {
    id: "renovation-remodeling",
    title: "Renovation & Remodeling",
    description:
      "Upgrading and renovating existing structures — from homes to commercial offices. We breathe new life into aging buildings while preserving structural integrity.",
    icon: "Hammer",
    image: "/images/services/renovation-remodeling.png",
  },
  {
    id: "architectural-services",
    title: "Architectural Services",
    description:
      "Architectural design and planning for construction projects. We translate your vision into detailed plans that balance form, function, and feasibility.",
    icon: "Compass",
    image: "/images/services/architectural-services.png",
  },
] as const;

export const projects = [
  {
    id: "bund-wall",
    title: "Bund Wall & Oil Storage Facility",
    description:
      "Construction of a bund wall and oil storage facility, ensuring environmental compliance and structural safety for hazardous material containment.",
    category: "Civil Engineering",
    images: [
      "/images/projects/bundwall1.jpeg",
      "/images/projects/bundwall2.jpeg",
      "/images/projects/bundwall3.jpeg",
      "/images/projects/bundwall4.jpeg",
    ],
  },
  {
    id: "rehabilitation",
    title: "Structural Rehabilitation",
    description:
      "Complete structural rehabilitation project restoring integrity and extending the lifespan of existing infrastructure.",
    category: "Renovation",
    images: [
      "/images/projects/Rehabilitation1.JPG",
      "/images/projects/Rehabilitation2.JPG",
      "/images/projects/Rehabilitation3.JPG",
      "/images/projects/Rehabilitation4.JPG",
    ],
  },
] as const;

export const values = [
  {
    title: "Quality Craftsmanship",
    description:
      "We deliver the highest quality craftsmanship in every project. Our attention to detail, skilled workforce, and dedication to using the finest materials ensure precision and excellence.",
    icon: "Shield",
  },
  {
    title: "Client-Centric Approach",
    description:
      "Our clients are at the heart of everything we do. We prioritise effective communication, transparent project management, and a personalised approach to exceed expectations.",
    icon: "Users",
  },
  {
    title: "Innovation & Sustainability",
    description:
      "We incorporate cutting-edge technologies, sustainable materials, and environmentally conscious design principles into our projects to create spaces that stand the test of time.",
    icon: "Leaf",
  },
] as const;

export const stats = [
  { value: "50+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "6", label: "Core Services" },
] as const;
