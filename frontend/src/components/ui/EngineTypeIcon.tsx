import { FaGasPump, FaOilCan } from "react-icons/fa";
import { MdOutlineElectricalServices } from "react-icons/md";
import { RiGasStationLine } from "react-icons/ri";

interface EngineTypeIconProps {
  engineType: string;
}

export default function EngineTypeIcon({ engineType }: EngineTypeIconProps) {
  switch (engineType) {
    case "Electric":
      return <MdOutlineElectricalServices size={18} color="#4A4A4A" />;
    case "Diesel":
      return <FaOilCan size={18} color="#4A4A4A" />;
    case "Gasoline":
      return <FaGasPump size={13} color="#4A4A4A" />;
    case "Hybrid":
      return <RiGasStationLine size={16} color="#4A4A4A" />;
    default:
      return null;
  }
}
