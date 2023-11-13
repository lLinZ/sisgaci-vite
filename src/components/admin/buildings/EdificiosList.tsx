import { useState } from 'react';
import { IBuilding } from '../../../interfaces'
import { EdificioItem } from '.';
import { BusquedaYResultado } from '../../ui/content';
type Props = {
    edificios: IBuilding[];
}
export const EdificiosList = (props: Props) => {
    const [edificios, setEdificios] = useState<IBuilding[]>(props.edificios)
    return (
        <>
            {edificios && (<BusquedaYResultado records={edificios} setRecords={setEdificios} title={'edificios'} />)}
            {edificios.map((edificio, i) => (
                <EdificioItem key={`${edificio.name}-${i}`} edificio={edificio} />
            ))}
        </>
    )
}