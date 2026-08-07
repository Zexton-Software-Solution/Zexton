import { useState, useMemo } from 'react';
import TextLoop from './TextLoop';
import './TechStackExplorer.css';

const skillGroups = {
  'All': 'Python ✦ TypeScript ✦ React ✦ Node.js ✦ Docker ✦ TensorFlow ✦ Agentic AI ✦ Supabase ✦ Express ✦ PostgreSQL ✦ Redux ✦ .NET ✦ OpenCV ✦ Multi-Agent Systems ✦ MongoDB ✦ REST APIs ✦ CI/CD Pipelines ✦ AsyncLocalStorage ✦ Real-time Inference',
  'Programming Languages': 'Python ✦ TypeScript ✦ JavaScript (ES6+) ✦ HTML5 ✦ CSS3 ✦ SQL ✦ C# ✦ Bash ✦ Rust ✦ Go',
  'Frameworks & Libraries': 'React (Vite) ✦ React Native ✦ Node.js ✦ Expo ✦ Express.js ✦ Elysia JS ✦ Flask ✦ Redux Toolkit ✦ .NET ✦ TensorFlow ✦ OpenCV ✦ YOLOv8',
  'AI / Machine Learning': 'Computer Vision ✦ Deep Learning ✦ Object Detection & Tracking ✦ LLM Integration ✦ Agentic AI ✦ Multi-Agent Systems ✦ Graph Neural Networks ✦ NLP',
  'Databases': 'MySQL ✦ MongoDB ✦ SQL Server ✦ Supabase (PostgreSQL) ✦ Redis ✦ Vector DBs',
  'DevOps & Tools': 'Git ✦ GitHub Actions ✦ Docker ✦ CI/CD Pipelines ✦ REST APIs ✦ AWS ✦ Vercel ✦ Linux',
  'Computer Science Concepts': 'Real-time Inference ✦ Distributed Systems ✦ Data Pipelines ✦ Red-Black Trees ✦ Topological Sorting ✦ Graph Algorithms ✦ Dependency Resolution'
};

const categories = Object.keys(skillGroups);

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
        <TextLoop
          key={activeCategory}
          text={currentText}
          shape="wave"
          speed={85}
          direction="forward"
          separator="✦"
          curviness={110}
          fontSize={22}
          fontWeight={800}
          letterSpacing={4}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#225cff"
          ribbonWidth={68}
          pauseOnHover={false}
        />
      </div>
    </section>
  );
}
