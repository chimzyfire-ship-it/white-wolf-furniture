import { atom } from 'nanostores';

export const isQuoteModalOpen = atom(false);

export function openQuoteModal() {
    isQuoteModalOpen.set(true);
}

export function closeQuoteModal() {
    isQuoteModalOpen.set(false);
}
