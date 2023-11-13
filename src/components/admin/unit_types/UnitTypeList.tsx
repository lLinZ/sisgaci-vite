import { UnitTypeItem } from ".";
import { IBuilding, IUnitType } from "../../../interfaces";

interface UnitTypeListProps {
    unitTypes: IUnitType[];
    building: IBuilding;
}
export const UnitTypeList = ({ unitTypes, building }: UnitTypeListProps) => unitTypes && unitTypes.map((unitType) => <UnitTypeItem key={unitType.id} unitType={unitType} building={building} />)

