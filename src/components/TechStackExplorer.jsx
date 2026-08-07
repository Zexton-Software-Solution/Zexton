import { useState, useMemo } from 'react';
import TextLoop from './TextLoop';
import './TechStackExplorer.css';

const skillGroups = {
  'All': 'Python ✦ TypeScript ✦ React ✦ Node.js ✦ Docker ✦ TensorFlow ✦ Agentic AI ✦ Supabase ✦ PostgreSQL ✦ MongoDB',
  'Programming Languages': 'Python ✦ TypeScript ✦ JavaScript ✦ HTML5 ✦ CSS3 ✦ SQL ✦ C# ✦ Bash ✦ Rust ✦ Go',
  'Frameworks & Libraries': 'React ✦ React Native ✦ Node.js ✦ Expo ✦ Express.js ✦ Flask ✦ Redux ✦ .NET ✦ TensorFlow ✦ OpenCV',
  'AI / Machine Learning': 'Computer Vision ✦ Deep Learning ✦ Object Detection ✦ LLM Integration ✦ Agentic AI ✦ Multi-Agent Systems ✦ NLP',
  'Databases': 'MySQL ✦ MongoDB ✦ SQL Server ✦ Supabase ✦ PostgreSQL ✦ Redis ✦ Vector DBs',
  'DevOps & Tools': 'Git ✦ GitHub Actions ✦ Docker ✦ CI/CD Pipelines ✦ REST APIs ✦ AWS ✦ Vercel ✦ Linux',
  'Computer Science Concepts': 'Real-time Inference ✦ Distributed Systems ✦ Data Pipelines ✦ Red-Black Trees ✦ Graph Algorithms'
};

const categories = Object.keys(skillGroups);

const PencilDoodles = () => (
  <div className="tech-doodles" aria-hidden="true">
    {/* Doodle 1: Code Brackets & Sparkle (Top Left) */}
    <svg className="tech-doodle tech-doodle--top-left" viewBox="0 0 160 120" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 30 25 C 20 25 15 35 15 45 C 15 55 5 60 5 60 C 5 60 15 65 15 75 C 15 85 20 95 30 95" />
      <path d="M 80 25 C 90 25 95 35 95 45 C 95 55 105 60 105 60 C 105 60 95 65 95 75 C 95 85 90 95 80 95" />
      <path d="M 45 42 L 53 60 L 45 78" />
      <path d="M 65 42 L 57 60 L 65 78" />
      <path d="M 135 20 C 135 30 145 35 145 35 C 145 35 135 40 135 50 C 135 40 125 35 125 35 C 125 35 135 30 135 20 Z" />
    </svg>

    {/* Doodle 2: Gear & Curved Loop Arrow (Top Right) */}
    <svg className="tech-doodle tech-doodle--top-right" viewBox="0 0 170 120" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="22" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="10" />
      <path d="M 50 18 L 50 26 M 50 74 L 50 82 M 18 50 L 26 50 M 74 50 L 82 50" />
      <path d="M 27 27 L 33 33 M 67 67 L 73 73 M 27 73 L 33 67 M 67 33 L 73 27" />
      <path d="M 110 75 C 110 35 145 30 155 55 C 160 70 140 85 125 70 C 120 65 125 50 140 50" />
      <path d="M 132 42 L 140 50 L 132 58" />
    </svg>

    {/* Doodle 3: Database & Terminal Prompt (Bottom Left) */}
    <svg className="tech-doodle tech-doodle--bottom-left" viewBox="0 0 160 130" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="45" cy="30" rx="30" ry="12" />
      <path d="M 15 30 L 15 60 C 15 67 28 72 45 72 C 62 72 75 67 75 60 L 75 30" />
      <path d="M 15 60 L 15 90 C 15 97 28 102 45 102 C 62 102 75 97 75 90 L 75 60" strokeDasharray="4 2" />
      <rect x="95" y="45" width="55" height="45" rx="8" />
      <path d="M 105 60 L 115 68 L 105 76" />
      <path d="M 122 76 L 136 76" />
    </svg>

    {/* Doodle 4: AI Network & Lightning Bolt (Bottom Right) */}
    <svg className="tech-doodle tech-doodle--bottom-right" viewBox="0 0 180 130" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="35" cy="45" r="7" />
      <circle cx="85" cy="30" r="7" />
      <circle cx="65" cy="85" r="7" />
      <circle cx="115" cy="75" r="7" />
      <path d="M 42 45 L 78 33 M 40 50 L 60 80 M 87 36 L 110 70 M 70 82 L 109 77" strokeDasharray="2 3" />
      <path d="M 150 25 L 132 60 L 146 60 L 130 100 L 160 55 L 144 55 Z" />
    </svg>

    {/* Doodle 5: Pencil Function f(x) (Center Float Left) */}
    <svg className="tech-doodle tech-doodle--mid-left" viewBox="0 0 100 80" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round">
      <path d="M 20 20 C 15 25 15 35 25 40 C 35 45 35 55 30 60 M 12 40 L 32 40" />
      <path d="M 45 32 L 65 52 M 65 32 L 45 52" />
    </svg>

    {/* Doodle 6: Orbital Atom Sketch (Center Float Right) */}
    <svg className="tech-doodle tech-doodle--mid-right" viewBox="0 0 110 90" fill="none" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round">
      <ellipse cx="55" cy="45" rx="42" ry="14" transform="rotate(-30 55 45)" />
      <ellipse cx="55" cy="45" rx="42" ry="14" transform="rotate(30 55 45)" />
      <circle cx="55" cy="45" r="6" fill="#0f172a" />
    </svg>
  </div>
);

export default function TechStackExplorer() {
  const [activeCategory, setActiveCategory] = useState('All');

  const currentText = useMemo(() => {
    return skillGroups[activeCategory] || skillGroups['All'];
  }, [activeCategory]);

  return (
    <section className="tech-explorer" aria-labelledby="tech-title">
      <div className="tech-explorer__intro">
        <span className="eyebrow eyebrow--light">TECHNICAL SKILLS</span>
        <h2 id="tech-title">Technology & Engineering Capabilities</h2>
        <p>
          Scroll, drag, or filter by category to explore languages, frameworks, AI models, databases, tools, and computer science concepts.
        </p>
      </div>

      <div className="tech-explorer__categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`tech-explorer__cat-btn ${activeCategory === cat ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="tech-explorer__body">
        <PencilDoodles />
        <TextLoop
          key={activeCategory}
          text={currentText}
          shape="wave"
          speed={80}
          direction="forward"
          separator="✦"
          curviness={110}
          fontSize={20}
          fontWeight={800}
          letterSpacing={4}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#225cff"
          ribbonWidth={64}
          pauseOnHover={false}
        />
      </div>
    </section>
  );
}
