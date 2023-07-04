import ICard from '../../../domain/interfaces/ICard';
import { tokenizedRepositoryAdapter } from '../../adapters';

export const getUseCase = async (token: string): Promise<ICard> => {
    return tokenizedRepositoryAdapter.getCard(token);
};