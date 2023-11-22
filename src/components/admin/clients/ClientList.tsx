import { FC } from 'react'
import { IClient } from '../../../interfaces';
import { ClientItem } from './ClientItem';
interface Props {
    clients: IClient[];
}
export const ClientList: FC<Props> = ({ clients }) => clients && clients.map((client: IClient) => (<ClientItem key={client.id} client={client} />))