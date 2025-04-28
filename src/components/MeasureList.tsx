import { MeasureInfo } from "@/pages/AddMeasure";
import MeasureCard from "./MeasureCard";

const MockMeasureInfo: MeasureInfo[] = [
  {
    id: "1",
    ownerId: "1",
    date: new Date("2025-04-28"),
    time: "morning",
    bloodPressSys: "120",
    bloodPressDia: "80",
    weight: "76",
    sugarLevel: "11",
    temperature: "36.5",
  },
];

export default function MeasureList() {
  return (
    <div className="w-full pt-4">
      {MockMeasureInfo.map((item, index) => (
        <MeasureCard
          measureInfo={item}
          key={`measure-information-card-${index}`}
        />
      ))}
    </div>
  );
}
