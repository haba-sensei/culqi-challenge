import ICreateCard from '../../domain/interfaces/ICreateCard';
import { tokenizedRepository } from '../../domain/repositories/tokenizedRepository';
import { createAdapter } from './createAdapter';
import { getAdapter } from './getAdapter';

export const tokenizedRepositoryAdapter: tokenizedRepository = {
    createTokenizedCard: async (card: ICreateCard, commerceToken: string) => await createAdapter(card, commerceToken),
    getCard: async (token: string) => getAdapter(token),
};
