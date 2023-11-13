import { useState } from "react";
import { UnitItem } from ".";
import { IUnit } from "../../../interfaces";

interface Props {
    units: IUnit[];
}
export const UnitList = ({ units }: Props) => {

    const [unitsState, setUnitsState] = useState<IUnit[]>(units);
    const [ids, setIds] = useState<number[]>([]);

    const saveChanges = async () => {

    }
    const controlProps = {
        unitsState,
        setUnitsState,
        ids,
        setIds,
        saveChanges
    }
    return unitsState && unitsState.map((unit) => (<UnitItem key={unit.id} unit={unit} controlProps={controlProps} />))
};