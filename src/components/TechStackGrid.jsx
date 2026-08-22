import { Layers, Cpu, Database, Cloud, Code } from 'lucide-react';
import './TechStackGrid.css';

const stackCategories = [
  {
    title: 'Frontend & UI',
    icon: Code,
    desc: 'Fast, accessible, and responsive user interfaces.',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3', 'Framer'],
  },
  {
    title: 'Backend & APIs',
    icon: Layers,
    desc: 'Scalable server architecture, microservices, and secure APIs.',
    skills: ['Node.js', 'Express', '.NET Core', 'Python', 'Go', 'REST / GraphQL'],
  },
  {
    title: 'Cloud & Web Hosting',
    icon: Cloud,
    desc: 'High-availability infrastructure, VPS, and cloud deployments.',
    skills: ['Linux / Ubuntu', 'AWS Cloud', 'cPanel / DirectAdmin', 'Docker', 'Cloudflare', 'Nginx'],
  },
  {
    title: 'Databases & Storage',
    icon: Database,
    desc: 'Relational, document, and real-time database systems.',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis Cache', 'Supabase', 'SQL Server'],
  },
  {
    title: 'Mobile & AI Intelligence',
    icon: Cpu,
    desc: 'Cross-platform mobile apps and practical AI agents.',
    skills: ['React Native', 'Expo', 'OpenAI / Claude APIs', 'LangChain', 'Python AI', 'TensorFlow'],
  },
];

export default function TechStackGrid() {
  return (
    <section id="tech-stack" className="tech-grid-section">
      <div className="container">
        <div className="tech-grid-header">
          <span className="eyebrow">TECHNOLOGY &amp; INFRASTRUCTURE</span>
          <h2>Built With Proven, Scalable Technologies</h2>
          <p>
            We use modern, dependable tools selected for speed, security, and long-term maintainability—not experimental hype.
          </p>
        </div>

        <div className="tech-categories-grid">
          {stackCategories.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.title} className="tech-group-card">
                <div className="tech-group-top">
                  <div className="tech-group-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="tech-group-title">{group.title}</h3>
                    <p className="tech-group-desc">{group.desc}</p>
                  </div>
                </div>

                <div className="tech-tags-list">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tech-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
