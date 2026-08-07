import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Globe,
  ExternalLink,
  Monitor,
  Sparkles,
  Layers,
  ArrowUpRight,
  Eye,
  Building2,
  Lock
} from 'lucide-react';
import { workCategories, formattedWorkData } from '../workData';
import WorkBrowserModal from './WorkBrowserModal';
import './WorkPage.css';

// Canvas-based detector to filter out WordPress loading logos and 404 error images
function checkScreenshotQuality(img) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, 40, 40);
    const data = ctx.getImageData(0, 0, 40, 40).data;

    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    let count = 0;

    for (let i = 0; i < data.length; i += 16) {
      totalR += data[i];
      totalG += data[i + 1];
      totalB += data[i + 2];
      count++;
    }

    const avgR = totalR / count;
    const avgG = totalG / count;
    const avgB = totalB / count;

    // Reject pure black WordPress generator placeholder (avg < 28)
    if (avgR < 28 && avgG < 28 && avgB < 28) {
      return false;
    }

    // Reject yellow 404 placeholder (high red/green, low blue)
    if (avgR > 220 && avgG > 180 && avgB < 80) {
      return false;
    }

    return true;
  } catch {
    return true; // Fallback to allowing image if CORS blocks canvas read
  }
}

export default function WorkPage({ onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewProject, setActivePreviewProject] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [failedImages, setFailedImages] = useState({});

  const filteredProjects = useMemo(() => {
    let list = formattedWorkData;

    if (selectedCategory !== 'all') {
      list = list.filter((item) => item.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.domain.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { all: formattedWorkData.length };
    formattedWorkData.forEach((item) => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  const handleImageLoad = (id, event) => {
    const isValid = checkScreenshotQuality(event.target);
    if (isValid) {
      setLoadedImages((prev) => ({ ...prev, [id]: true }));
    } else {
      setFailedImages((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="work-page-wrapper">
      {/* Hero Header */}
      <header className="work-page-hero">
        <div className="work-hero-content">
          <span className="eyebrow">PORTFOLIO & LIVE CLIENT WORK</span>
          <h1>Engineered Websites & Business Solutions</h1>
          <p>
            Explore client platforms, booking systems, properties, and web applications delivered across 22 industry categories. Click any project card to launch its live interactive website browser preview.
          </p>

          {/* Real-time Search Input */}
          <div className="work-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search domain (e.g. theflooringduck, casasedona, hotel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="work-main-section">
        {/* Category Filters Bar */}
        <div className="work-categories-bar">
          <div className="work-categories-scroll">
            {workCategories.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              if (cat.id !== 'all' && count === 0) return null;

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.name}</span>
                  <strong className="pill-count">{count}</strong>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="work-results-info">
          <span>
            Showing <strong>{filteredProjects.length}</strong> website{filteredProjects.length === 1 ? '' : 's'}
            {selectedCategory !== 'all' && ` in ${workCategories.find((c) => c.id === selectedCategory)?.name}`}
          </span>
          {searchQuery && <span> matching "{searchQuery}"</span>}
        </div>

        {/* Projects Grid */}
        <div className="work-projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Fast global CDN with crossOrigin attribute for quality check
              const screenshotUrl = `https://s0.wp.com/mshots/v1/https://${project.domain}?w=800`;
              const isLoaded = loadedImages[project.id];
              const hasFailed = failedImages[project.id];

              return (
                <motion.article
                  key={project.id}
                  className="work-project-card"
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min((index % 9) * 0.04, 0.35),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {/* Window Top Bar Mockup */}
                  <div className="card-browser-bar">
                    <div className="card-dots">
                      <span className="dot dot-r" />
                      <span className="dot dot-y" />
                      <span className="dot dot-g" />
                    </div>
                    <span className="card-domain-badge">{project.domain}</span>
                  </div>

                  {/* Clean Visual Preview Container */}
                  <div
                    className="card-preview-container"
                    onClick={() => setActivePreviewProject(project)}
                  >
                    {(!isLoaded || hasFailed) && (
                      <div className="card-mock-preview">
                        <div className="mock-window-top">
                          <Lock size={12} className="mock-lock" />
                          <span>https://{project.domain}</span>
                        </div>
                        <Building2 size={34} className="mock-icon" />
                        <span className="mock-domain">{project.domain}</span>
                        <span className="mock-tag">{project.category}</span>
                      </div>
                    )}

                    {!hasFailed && (
                      <img
                        src={screenshotUrl}
                        alt={`${project.title} live website preview`}
                        className={`card-preview-img ${isLoaded ? 'is-visible' : 'is-hidden'}`}
                        loading="lazy"
                        crossOrigin="anonymous"
                        onLoad={(e) => handleImageLoad(project.id, e)}
                        onError={() => handleImageError(project.id)}
                      />
                    )}

                    <div className="preview-overlay-btn">
                      <span className="overlay-pill">
                        <Eye size={16} />
                        <span>Interactive Live Preview</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="card-body">
                    <div className="card-category-pill">
                      <Layers size={12} />
                      <span>{project.category}</span>
                    </div>

                    <h3 className="card-title">{project.title}</h3>

                    <div className="card-url-display">
                      <Globe size={14} className="globe-icon" />
                      <span>https://{project.domain}</span>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn-preview"
                      onClick={() => setActivePreviewProject(project)}
                    >
                      <Monitor size={15} />
                      <span>Interactive Preview</span>
                    </button>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-visit"
                      title="Open website in new tab"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="work-empty-state">
            <Sparkles size={48} className="empty-icon" />
            <h3>No Websites Found</h3>
            <p>No project domains match your search query "{searchQuery}". Try selecting another category or clear your search.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="work-cta-section">
        <div className="container">
          <span className="eyebrow eyebrow--light">YOUR PROJECT CAN BE NEXT</span>
          <h2>Need a custom website or high-scale web platform?</h2>
          <p>
            From hospitality platforms to specialized services and SaaS products, Zexton builds scalable digital experiences tailored to your business rules.
          </p>
          {onOpenContact && (
            <button type="button" className="btn-light" onClick={onOpenContact}>
              Discuss Your Project <ArrowUpRight size={18} />
            </button>
          )}
        </div>
      </section>

      {/* Embedded Browser Modal */}
      {activePreviewProject && (
        <WorkBrowserModal
          project={activePreviewProject}
          onClose={() => setActivePreviewProject(null)}
        />
      )}
    </div>
  );
}
