import { MeasureInfo } from "@/pages/AddMeasure";
import { Card } from "./ui/card";
import {
  CalendarDaysIcon,
  CandyIcon,
  HeartPulseIcon,
  ThermometerIcon,
  WeightIcon,
} from "lucide-react";

export default function MeasureCard({
  measureInfo,
}: {
  measureInfo: MeasureInfo;
}) {
  return (
    <Card className="p-4">
      <h3 className="flex items-center gap-2">
        <CalendarDaysIcon />
        {measureInfo.date.toDateString()}
      </h3>

      <div className="mt-4 flex items-center justify-between">
        <p className="flex w-1/2 items-center gap-2 text-sm">
          <WeightIcon /> {measureInfo.weight} Kg
        </p>

        <p className="flex w-1/2 items-center gap-2 text-sm">
          <ThermometerIcon /> {measureInfo.temperature} 'C
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="flex w-1/2 items-center gap-2 text-sm">
          <HeartPulseIcon /> {measureInfo.bloodPressSys}/
          {measureInfo.bloodPressDia} mmHg
        </p>

        <p className="flex w-1/2 items-center gap-2 text-sm">
          <CandyIcon /> {measureInfo.sugarLevel} mmol/L
        </p>
      </div>
    </Card>
  );
}
