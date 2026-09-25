import { openQuoteModal } from '../store/quoteStore';
export default function QuoteButton(){return <button className="text-link" onClick={openQuoteModal}>Request a quote <span aria-hidden="true">↗</span></button>}
