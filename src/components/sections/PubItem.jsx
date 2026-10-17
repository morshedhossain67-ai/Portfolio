import { doiUrl } from '../../security/safeUrl.js';
import SafeLink from '../ui/SafeLink.jsx';
import Icon from '../ui/Icon.jsx';

const SELF = /((?:Dr\.\s)?(?:Md\.\s)?Morshed Hossain)/;
const TYPE_LABEL = {
  journal: 'Journal', book: 'Book', conference: 'Conference', article: 'Article', thesis: 'Thesis',
};

// Highlights the professor's name WITHOUT innerHTML: split + React elements.
function Authors({ text }) {
  if (!text) return null;
  return (
    <p className="pub-authors">
      {text.split(SELF).map((part, i) =>
        SELF.test(part) ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
      )}
    </p>
  );
}

export default function PubItem({ pub }) {
  const doi = doiUrl(pub.doi);
  return (
    <li className="pub">
      <span className={`pub-type pub-type--${pub.type}`}>{TYPE_LABEL[pub.type]}</span>
      <h4 className="pub-title">{pub.title}</h4>
      <Authors text={pub.authors} />
      <p className="pub-venue">
        {pub.venue}
        {doi && (
          <SafeLink href={doi} className="pub-doi">
            DOI <Icon name="ext" size={12} />
          </SafeLink>
        )}
      </p>
    </li>
  );
}
