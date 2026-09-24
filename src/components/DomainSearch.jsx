import { useState } from 'react';
import { Search } from 'lucide-react';
import { domainSearchUrl, tlds } from '../productPagesData';
import { money, useRegion } from '../region';
import './DomainSearch.css';

export default function DomainSearch({ id }) {
  const region = useRegion();
  const [query, setQuery] = useState('');

  const submit = (event) => {
    event.preventDefault();
    window.location.href = domainSearchUrl(query);
  };

  return (
    <div className="domain-search" id={id}>
      <form onSubmit={submit} role="search">
        <Search size={18} aria-hidden="true" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for your domain, e.g. yourbusiness.com" aria-label="Search for a domain name" />
        <button type="submit" className="btn btn--primary">Search</button>
      </form>
      <ul className="num">
        {tlds.slice(0, 6).map((tld) => <li key={tld.ext}><strong>{tld.ext}</strong> {money(tld.price, region)}</li>)}
      </ul>
    </div>
  );
}
