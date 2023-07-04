import ICreateCard from '../../../domain/interfaces/ICreateCard';
import IToken from '../../../domain/interfaces/IToken';
import { tokenizedRepositoryAdapter } from '../../adapters';

export const createUseCase = async (card: ICreateCard, commerceToken: string | undefined): Promise<IToken> => {
    return tokenizedRepositoryAdapter.createTokenizedCard(card, commerceToken);
};