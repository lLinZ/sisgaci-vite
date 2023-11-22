import { FC } from 'react'
import { CallItem } from '.';
import { ICall } from '../../../interfaces';
interface Props {
    calls: ICall[];
}
export const CallList: FC<Props> = ({ calls }) => calls && calls.map((call: ICall) => (<CallItem key={call.id} call={call} />))