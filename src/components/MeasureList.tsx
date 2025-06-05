import { MeasureInfo } from "@/pages/AddMeasure";
import MeasureCard from "./MeasureCard";

interface MeasureListProps {
  measureData: MeasureInfo[];
}

export default function MeasureList({ measureData }: MeasureListProps) {
  return (
    <div className="w-full pt-4">
      {measureData.map((item, index) => (
        <MeasureCard
          measureInfo={item}
          key={`measure-information-card-${index}`}
        />
      ))}
    </div>
  );
}
