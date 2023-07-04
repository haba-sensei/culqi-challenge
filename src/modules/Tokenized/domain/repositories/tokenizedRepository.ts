import ICard from '../interfaces/ICard';
import ICreateCard from '../interfaces/ICreateCard';
import IToken from '../interfaces/IToken';

export interface tokenizedRepository {
    getCard(token: string): Promise<ICard>;
    createTokenizedCard(card: ICreateCard, commerceToken: string | undefined): Promise<IToken>;
}
