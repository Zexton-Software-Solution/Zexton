import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Globe
} from 'lucide-react';
import './WorkBrowserModal.css';

export default function WorkBrowserModal({ project, onClose }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!project) return null;

  const url = project.url || `https://${project.domain}`;
  const screenshotUrl = `https://api.microlink.io/?url=https://${project.domain}&screenshot=true&embed=screenshot.url`;

  const handleRefresh = () => {
    setLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getContainerWidth = () => {
    if (device === 'mobile') return '390px';
    if (device === 'tablet') return '768px';
    return '100%';
  };

  return (
    <AnimatePresence>
      <motion.div
        className="browser-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="browser-window"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mac / Browser Header Bar */}
          <div className="browser-header">
            <div className="browser-window-controls">
              <button
                type="button"
                className="control-dot dot-close"
                onClick={onClose}
                title="Close Browser"
              >
                <X size={10} />
              </button>
              <button
                type="button"
                className="control-dot dot-minimize"
                onClick={onClose}
                title="Minimize"
              />
              <button
                type="button"
                className="control-dot dot-maximize"
                onClick={() => setDevice((prev) => (prev === 'desktop' ? 'mobile' : 'desktop'))}
                title="Toggle Screen Size"
              />
            </div>

            {/* Active Tab */}
            <div className="browser-tab">
              <Globe size={14} className="tab-icon" />
              <span className="tab-title">{project.title}</span>
              <span className="tab-domain">{project.domain}</span>
            </div>

            {/* Device Switcher */}
            <div className="browser-device-selector">
              <button
                type="button"
                className={`device-btn ${device === 'desktop' ? 'is-active' : ''}`}
                onClick={() => setDevice('desktop')}
                title="Desktop View (100%)"
              >
                <Monitor size={15} />
              </button>
              <button
                type="button"
                className={`device-btn ${device === 'tablet' ? 'is-active' : ''}`}
                onClick={() => setDevice('tablet')}
                title="Tablet View (768px)"
              >
                <Tablet size={15} />
              </button>
              <button
                type="button"
                className={`device-btn ${device === 'mobile' ? 'is-active' : ''}`}
                onClick={() => setDevice('mobile')}
                title="Mobile View (390px)"
              >
                <Smartphone size={15} />
              </button>
            </div>

            <button type="button" className="browser-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* Navigation Bar / Address Bar */}
          <div className="browser-toolbar">
            <div className="browser-nav-actions">
              <button type="button" className="nav-btn" title="Back" disabled>
                <ArrowLeft size={16} />
              </button>
              <button type="button" className="nav-btn" title="Forward" disabled>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="nav-btn"
                onClick={handleRefresh}
                title="Reload Live Site"
              >
                <RotateCw size={15} className={loading ? 'spin-icon' : ''} />
              </button>
            </div>

            <div className="browser-address-bar">
              <Lock size={13} className="lock-icon" />
              <span className="protocol">https://</span>
              <span className="address-text">{project.domain}</span>
              <button
                type="button"
                className="copy-btn"
                onClick={handleCopyUrl}
                title="Copy URL"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
              </button>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="open-external-btn"
              title="Open website in new tab"
            >
              <span>Open Site</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Embedded Web View Canvas (Real Live Interactive Website Frame) */}
          <div className="browser-viewport-wrapper">
            <div
              className={`browser-viewport device-${device}`}
              style={{ width: getContainerWidth() }}
            >
              {loading && !hasError && (
                <div className="viewport-loader">
                  <div className="loader-spinner" />
                  <span>Loading live site {project.domain}...</span>
                </div>
              )}

              {hasError ? (
                <div className="browser-preview-view">
                  <img
                    src={screenshotUrl}
                    alt={`${project.title} live website`}
                    className="preview-main-image"
                  />
                  <div className="preview-direct-launch-bar">
                    <div>
                      <p>
                        Security policy restricts iframe embedding for <strong>{project.domain}</strong>.
                      </p>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-launch-live"
                    >
                      <span>Open Live Site</span>
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  key={iframeKey}
                  src={url}
                  title={project.title}
                  className="browser-iframe"
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setHasError(true);
                  }}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              )}
            </div>
          </div>

          {/* Browser Status Bar */}
          <div className="browser-statusbar">
            <span className="status-indicator">
              <span className="status-dot" /> Live Interactive Website Preview
            </span>
            <span className="category-badge">{project.category}</span>
            <span className="resolution-info">
              {device === 'desktop' ? 'Responsive Desktop' : device === 'tablet' ? '768 × 1024 Tablet' : '390 × 844 Mobile'}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
