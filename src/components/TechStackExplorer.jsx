import { useState, useMemo } from 'react';
import {
  SiPython, SiTypescript, SiHtml5, SiCss, SiJavascript, SiMysql,
  SiNodedotjs, SiReact, SiExpo, SiExpress, SiFlask, SiRedux, SiDotnet,
  SiTensorflow, SiOpencv, SiMongodb, SiSupabase, SiGit,
  SiGithubactions, SiDocker, SiVite
} from 'react-icons/si';

import {
  Database, Eye, Target, Bot, Workflow, Users, Network,
  MessageSquare, Server, Webhook, Zap, Layers,
  Binary, ListOrdered, Share2, PackageCheck, HardDrive,
  GitPullRequest, FileEdit, GraduationCap, Trophy, Kanban, RefreshCw, Brain, Scan
} from 'lucide-react';

import OptionWheel from './OptionWheel';
import './TechStackExplorer.css';

const allSkills = [
  // Programming Languages
  { name: 'Python', icon: <SiPython />, color: '#3776AB', category: 'Programming Languages' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', category: 'Programming Languages' },
  { name: 'HTML', icon: <SiHtml5 />, color: '#E34F26', category: 'Programming Languages' },
  { name: 'CSS', icon: <SiCss />, color: '#1572B6', category: 'Programming Languages' },
  { name: 'JavaScript (ES6+)', icon: <SiJavascript />, color: '#F7DF1E', category: 'Programming Languages' },
  { name: 'SQL', icon: <Database />, color: '#00758F', category: 'Programming Languages' },

  // Frameworks & Libraries
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#5FA04E', category: 'Frameworks & Libraries' },
  { name: 'React Native', icon: <SiReact />, color: '#61DAFB', category: 'Frameworks & Libraries' },
  { name: 'Expo', icon: <SiExpo />, color: '#E2E8F0', category: 'Frameworks & Libraries' },
  { name: 'Express.js', icon: <SiExpress />, color: '#CBD5E1', category: 'Frameworks & Libraries' },
  { name: 'React (Vite)', icon: <SiVite />, color: '#646CFF', category: 'Frameworks & Libraries' },
  { name: 'Elysia JS', icon: <Zap />, color: '#F97316', category: 'Frameworks & Libraries' },
  { name: 'Flask', icon: <SiFlask />, color: '#E2E8F0', category: 'Frameworks & Libraries' },
  { name: 'Redux Toolkit', icon: <SiRedux />, color: '#764ABC', category: 'Frameworks & Libraries' },
  { name: '.NET (C#)', icon: <SiDotnet />, color: '#512BD4', category: 'Frameworks & Libraries' },
  { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00', category: 'Frameworks & Libraries' },
  { name: 'OpenCV', icon: <SiOpencv />, color: '#5C3EE8', category: 'Frameworks & Libraries' },
  { name: 'YOLOv8', icon: <Target />, color: '#00F0FF', category: 'Frameworks & Libraries' },

  // AI / Machine Learning
  { name: 'Computer Vision', icon: <Eye />, color: '#00F0FF', category: 'AI / Machine Learning' },
  { name: 'Deep Learning', icon: <Brain />, color: '#A855F7', category: 'AI / Machine Learning' },
  { name: 'Object Detection & Tracking', icon: <Scan />, color: '#3B82F6', category: 'AI / Machine Learning' },
  { name: 'LLM Integration', icon: <Bot />, color: '#10B981', category: 'AI / Machine Learning' },
  { name: 'Agentic AI', icon: <Workflow />, color: '#EC4899', category: 'AI / Machine Learning' },
  { name: 'Multi-Agent Systems', icon: <Users />, color: '#F59E0B', category: 'AI / Machine Learning' },
  { name: 'Graph Neural Networks', icon: <Network />, color: '#8B5CF6', category: 'AI / Machine Learning' },
  { name: 'NLP', icon: <MessageSquare />, color: '#06B6D4', category: 'AI / Machine Learning' },

  // Databases
  { name: 'MySQL', icon: <SiMysql />, color: '#4479A1', category: 'Databases' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', category: 'Databases' },
  { name: 'SQL Server', icon: <Database />, color: '#CC292B', category: 'Databases' },
  { name: 'Supabase (PostgreSQL)', icon: <SiSupabase />, color: '#3ECF8E', category: 'Databases' },

  // DevOps & Tools
  { name: 'Git', icon: <SiGit />, color: '#F05032', category: 'DevOps & Tools' },
  { name: 'GitHub Actions', icon: <SiGithubactions />, color: '#2088FF', category: 'DevOps & Tools' },
  { name: 'Docker', icon: <SiDocker />, color: '#2496ED', category: 'DevOps & Tools' },
  { name: 'CI/CD Pipelines', icon: <RefreshCw />, color: '#10B981', category: 'DevOps & Tools' },
  { name: 'REST APIs', icon: <Webhook />, color: '#6366F1', category: 'DevOps & Tools' },

  // Computer Science Concepts
  { name: 'Real-time Inference', icon: <Zap />, color: '#EF4444', category: 'Computer Science Concepts' },
  { name: 'Distributed Systems', icon: <Server />, color: '#3B82F6', category: 'Computer Science Concepts' },
  { name: 'Data Pipelines', icon: <Layers />, color: '#8B5CF6', category: 'Computer Science Concepts' },
  { name: 'Red-Black Trees', icon: <Binary />, color: '#10B981', category: 'Computer Science Concepts' },
  { name: 'Topological Sorting', icon: <ListOrdered />, color: '#F59E0B', category: 'Computer Science Concepts' },
  { name: 'Graph Algorithms', icon: <Share2 />, color: '#EC4899', category: 'Computer Science Concepts' },
  { name: 'Dependency Resolution', icon: <PackageCheck />, color: '#06B6D4', category: 'Computer Science Concepts' },
  { name: 'AsyncLocalStorage', icon: <HardDrive />, color: '#6366F1', category: 'Computer Science Concepts' },

  // Other
  { name: 'Open-Source Contribution', icon: <GitPullRequest />, color: '#F97316', category: 'Other' },
  { name: 'Technical Writing', icon: <FileEdit />, color: '#3B82F6', category: 'Other' },
  { name: 'Peer-Reviewed Research', icon: <GraduationCap />, color: '#10B981', category: 'Other' },
  { name: 'Hackathon Engineering', icon: <Trophy />, color: '#F59E0B', category: 'Other' },
  { name: 'Agile Development', icon: <Kanban />, color: '#8B5CF6', category: 'Other' }
];

const categories = [
  'All',
  'Programming Languages',
  'Frameworks & Libraries',
  'AI / Machine Learning',
  'Databases',
  'DevOps & Tools',
  'Computer Science Concepts',
  'Other'
];

export default function TechStackExplorer() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return allSkills;
    return allSkills.filter((skill) => skill.category === activeCategory);
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
            {cat} {cat === 'All' ? `(${allSkills.length})` : `(${allSkills.filter(s => s.category === cat).length})`}
          </button>
        ))}
      </div>

      <div className="tech-explorer__body">
        <OptionWheel
          key={activeCategory}
          items={filteredSkills}
          defaultSelected={0}
          side="center"
          fontSize={2.2}
        />
      </div>
    </section>
  );
}

