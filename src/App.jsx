import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Industries from './components/Industries';
import Approach from './components/Approach';
import AgenticCallout from './components/AgenticCallout';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import RelatedRoutes from './components/RelatedRoutes';
import RouteLoader from './components/RouteLoader';
import Seo from './components/Seo';
import { isKnownRoute, pathForRoute, routeFromPath, routeMetadata } from './siteMetadata';
import './App.css';

const CompanyPage = lazy(() => import('./components/CompanyPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const ContentPage = lazy(() => import('./components/ContentPage'));
const InsightArticlePage = lazy(() => import('./components/InsightArticlePage'));
const Insights = lazy(() => import('./components/Insights'));
const NotFound = lazy(() => import('./components/NotFound'));
const Pricing = lazy(() => import('./components/Pricing'));
const WhoWeAre = lazy(() => import('./components/WhoWeAre'));
const contentRoutes = new Set(['about', 'work', 'services', 'resources', 'insights', 'capabilities', 'careers']);
const getRoute = () => {
  const legacyHash = window.location.hash.match(/^#\/([^?#]+)/);
  return legacyHash?.[1] || routeFromPath(window.location.pathname);
};
const resetScroll = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [routeLoading, setRouteLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const timersRef = useRef([]);

  const transitionTo = useCallback((nextRoute) => {
    if (nextRoute === route) {
      resetScroll();
      return;
    }
    timersRef.current.forEach(window.clearTimeout);
    setRouteLoading(true);
    resetScroll();
    const swapTimer = window.setTimeout(() => {
      setRoute(nextRoute);
      requestAnimationFrame(resetScroll);
    }, 70);
    const finishTimer = window.setTimeout(() => setRouteLoading(false), 260);
    timersRef.current = [swapTimer, finishTimer];
  }, [route]);

  const navigate = useCallback((path) => {
    const url = new URL(path, window.location.origin);
    const nextRoute = routeFromPath(url.pathname);
    if (!isKnownRoute(nextRoute)) return;
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    transitionTo(nextRoute);
  }, [transitionTo]);

  useEffect(() => {
    const legacyHash = window.location.hash.match(/^#\/([^?#]+)/);
    if (legacyHash) window.history.replaceState({}, '', pathForRoute(legacyHash[1]));

    const handlePopState = () => transitionTo(routeFromPath(window.location.pathname));
    const handleInternalLink = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const nextRoute = routeFromPath(url.pathname);
      if (!isKnownRoute(nextRoute)) return;
      event.preventDefault();
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
      transitionTo(nextRoute);
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleInternalLink);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleInternalLink);
    };
  }, [transitionTo]);

  useEffect(() => () => {
    timersRef.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    resetScroll();
  }, [route]);

  useEffect(() => {
    if (!showLoader) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [showLoader]);

  const finishLoader = useCallback(() => {
    setShowLoader(false);
  }, []);
  const openContact = useCallback(() => navigate('/contact'), [navigate]);

  let content;
  if (route === 'company') {
    content = <CompanyPage />;
  } else if (route === 'pricing') {
    content = <Pricing onOpenContact={openContact} />;
  } else if (route === 'who-we-are') {
    content = <WhoWeAre onOpenContact={openContact} />;
  } else if (route === 'contact') {
    content = <ContactPage />;
  } else if (route.startsWith('insight:')) {
    content = <InsightArticlePage slug={route.slice('insight:'.length)} />;
  } else if (contentRoutes.has(route)) {
    content = <ContentPage page={route} onOpenContact={openContact} />;
  } else if (route !== 'home') {
    content = <NotFound path={window.location.pathname} />;
  }

  let page;
  if (route === 'home') {
    const metadata = routeMetadata.home;
    page = (
      <div className="site-shell">
        <Seo {...metadata} type={metadata.schemaType} />
        <Navbar />
        <main><Hero /><Partners /><Industries /><Approach /><AgenticCallout onOpenContact={openContact} /><Suspense fallback={null}><Insights /></Suspense></main>
        <RelatedRoutes routes={metadata.relatedRoutes} />
        <Footer />
      </div>
    );
  } else {
    page = <div className="site-shell"><Navbar /><Suspense fallback={<RouteLoader />}>{content}</Suspense><RelatedRoutes routes={routeMetadata[route]?.relatedRoutes} /><Footer /></div>;
  }

  return <>
    <AnimatePresence>{showLoader && <PageLoader key="initial-site-loader" onComplete={finishLoader} />}</AnimatePresence>
    <AnimatePresence>{routeLoading && <RouteLoader key="route-loader" />}</AnimatePresence>
    {page}
  </>;
}
