import { Globe } from 'lucide-react';
import { regions, setRegion, useRegion } from '../region';

export default function RegionSelect() {
  const region = useRegion();
  return (
    <label className="region-select">
      <Globe size={15} aria-hidden="true" />
      <select value={region.code} onChange={(event) => setRegion(event.target.value)} aria-label="Region and currency">
        {Object.values(regions).map((item) => <option key={item.code} value={item.code}>{item.currency}</option>)}
      </select>
    </label>
  );
}
