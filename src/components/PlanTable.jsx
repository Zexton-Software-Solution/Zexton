import { Check, Minus } from 'lucide-react';
import { planComparisons, productPages } from '../productPagesData';
import { localize, money, useRegion } from '../region';
import './PlanTable.css';

const cell = (value, region) => {
  if (value === true) return <Check size={17} className="plan-yes" aria-label="Included" />;
  if (value === false) return <Minus size={17} className="plan-no" aria-label="Not included" />;
  return localize(value, region);
};

export default function PlanTable({ route }) {
  const region = useRegion();
  const page = productPages[route];
  const compare = planComparisons[route];
  const orderUrl = (plan) => `/contact?service=${page.group}&plan=${encodeURIComponent(`${page.breadcrumbLabel} – ${plan.name} (${region.currency})`)}`;

  return (
    <div className="plan-table">
      <div className={`plan-table__grid plan-table__grid--${page.plans.length}`}>
        {page.plans.map((plan) => (
          <article key={plan.name} className={plan.popular ? 'is-recommended' : ''}>
            <div className="plan-table__head">
              <h3>{plan.name}</h3>
              {plan.popular && <span className="plan-table__badge">Recommended</span>}
            </div>
            <p className="plan-table__tag">{localize(plan.tag, region)}</p>
            <p className="plan-table__price num">
              <strong>{plan.priceText || money(plan.price, region)}</strong>
              <span>{plan.unit}</span>
            </p>
            <p className="plan-table__note">
              {localize(plan.note, region)}
              {plan.monthly && <> · {money(plan.monthly, region)}/mo billed monthly</>}
              {!plan.note && !plan.monthly && ' '}
            </p>
            <a className={`btn btn--block ${plan.popular ? 'btn--primary' : 'btn--secondary'}`} href={orderUrl(plan)}>{page.planCta || 'Get started'}</a>
            <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} aria-hidden="true" />{localize(feature, region)}</li>)}</ul>
          </article>
        ))}
      </div>
      <p className="plan-table__tax">{page.plansNote ? localize(page.plansNote, region) : `${region.tax} Change or upgrade your plan any time.`}</p>

      {compare && (
        <details className="plan-compare">
          <summary>Compare all features</summary>
          <div className="plan-compare__scroll">
            <table>
              <thead><tr><th scope="col">Feature</th>{page.plans.map((plan) => <th key={plan.name} scope="col">{plan.name}</th>)}</tr></thead>
              <tbody>
                <tr><th scope="row">Price</th>{page.plans.map((plan) => <td key={plan.name} className="num"><strong>{plan.priceText || money(plan.price, region)}</strong>{plan.unit}</td>)}</tr>
                {compare.map(([feature, ...values]) => (
                  <tr key={feature}><th scope="row">{feature}</th>{values.map((value, index) => <td key={page.plans[index].name}>{cell(value, region)}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}
