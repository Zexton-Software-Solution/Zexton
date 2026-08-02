import { ArrowLeft } from 'lucide-react';
import FuzzyText from './FuzzyText';
import Seo from './Seo';

export default function NotFound({ path = '/404' }) {
  return (
    <main className="not-found">
      <Seo
        title="Page Not Found | Zexton"
        description="The requested Zexton page could not be found. Browse software development services, engineering insights, pricing, or contact information."
        path={path}
        type="WebPage"
        robots="noindex, nofollow, noarchive"
      />
      <div className="not-found__content">
        <FuzzyText
          fontSize="clamp(5rem, 18vw, 14rem)"
          fontWeight={900}
          color="#ffffff"
          baseIntensity={0.25}
          hoverIntensity={0.6}
          enableHover
          clickEffect
          glitchMode
          glitchInterval={3000}
          glitchDuration={250}
          direction="horizontal"
          fuzzRange={40}
          className="not-found__canvas"
        >
          404
        </FuzzyText>

        <h1 className="not-found__heading">Page not found</h1>
        <p className="not-found__text">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a href="/" className="btn-primary not-found__btn">
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </a>
      </div>
    </main>
  );
}
