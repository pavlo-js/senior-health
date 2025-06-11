import MainLayout from "@/layout";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActivityIcon } from "lucide-react";

export default function TriagePage() {
  return (
    <MainLayout>
      <div className="px-4">
        <h1 className="text-lg font-semibold">General Questions</h1>

        <div className="mt-2 w-full max-w-sm">
          <Label>What symptoms are you experiencing?</Label>
          <Input type="text" />
        </div>

        <div className="mt-2 w-full max-w-sm">
          <Label>When did the symptoms start?</Label>
          <Input type="text" />
        </div>

        <div className="mt-2 w-full max-w-sm">
          <Label>How severe are the symptoms?</Label>
          <Input type="text" />
        </div>

        <div className="mt-2 w-full max-w-sm">
          <Label>Do you have any chronic conditions?</Label>
          <Input type="text" />
        </div>

        <h1 className="mt-6 text-lg font-semibold">Measurements</h1>

        <div className="mt-2 w-full max-w-sm">
          <Label>Blood Pressure-Systolic (mmHg)</Label>
          <Input type="text" />
        </div>

        <div className="mt-2 w-full max-w-sm">
          <Label>Blood Pressure-Diastolic (mmHg)</Label>
          <Input type="text" />
        </div>

        <div className="mt-2 w-full max-w-sm">
          <Label>Heart Sugar Leval (mg/dL)</Label>
          <Input type="text" />
        </div>

        <Button className="mt-4 w-full bg-emerald-800">
          <ActivityIcon />
          <p className="tracking-widest">TRIAGE</p>
        </Button>
      </div>
    </MainLayout>
  );
}
