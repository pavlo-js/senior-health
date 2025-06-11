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
    <Card className="mb-2 p-4">
      <h3 className="flex items-center gap-2">
        <CalendarDaysIcon />
        {new Date(measureInfo.date).toDateString()}
        <span className="ml-1">{measureInfo.time}</span>
      </h3>

      <div className="mt-4 flex items-center justify-between">
        <p className="flex w-1/2 items-center gap-2 text-sm">
          <WeightIcon />{" "}
          {measureInfo.weight ? `${measureInfo.weight} Kg` : "Unmeasured"}
        </p>

        <p className="flex w-1/2 items-center gap-2 text-sm">
          <ThermometerIcon />{" "}
          {measureInfo.temperature
            ? `${measureInfo.temperature} °C`
            : "Unmeasured"}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="flex w-1/2 items-center gap-2 text-sm">
          <HeartPulseIcon />{" "}
          {measureInfo.bloodPressSys && measureInfo.bloodPressDia
            ? `${measureInfo.bloodPressSys}/${measureInfo.bloodPressDia} mmHg`
            : "Unmeasured"}
        </p>

        <p className="flex w-1/2 items-center gap-2 text-sm">
          <CandyIcon />{" "}
          {measureInfo.sugarLevel
            ? `${measureInfo.sugarLevel} mmol/L`
            : "Unmeasured"}
        </p>
      </div>

      <p className="mt-4 text-sm italic text-gray-500">
        {measureInfo.comment ? measureInfo.comment : "No comment added."}
      </p>
    </Card>
  );
}
