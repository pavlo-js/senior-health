import { useEffect, useState } from "react";

import { DatePicker } from "@/components/DatePicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TemperatureChart,
  BloodPressureChart,
  SugarLevelChart,
  WeightChart,
} from "@/components/TemperatureChart";

import MainLayout from "@/layout";

import { getAllProfiles, UserProfile } from "@/actions/handleProfile";
import { getAllMeasureDataByOwnerAndDateRange } from "@/actions/handleMeasure";
import { MeasureInfo } from "./AddMeasure";

const keys = ["Body Temperature", "Blood Pressure", "Surgar Level", "Weight"];

export default function Stats() {
  const [profiles, setProfiles] = useState<UserProfile[]>();
  const [activeProfileId, setActiveProfileId] = useState<string>();
  const [measureData, setMeasureData] = useState<MeasureInfo[]>();
  const [activeKey, setActiveKey] = useState<string>(keys[0]);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );

  const getAllProfilesCall = async () => {
    const res = await getAllProfiles();
    setProfiles(res);
  };

  useEffect(() => {
    getAllProfilesCall();

    const profileId = localStorage.getItem("profileId");

    if (profileId) {
      setActiveProfileId(profileId);
    } else {
      window.location.href = "/add-profile";
    }
  }, []);

  useEffect(() => {
    if (activeProfileId) {
      localStorage.setItem("profileId", activeProfileId);
    }
  }, [activeProfileId]);

  useEffect(() => {
    if (activeProfileId && startDate) {
      (async () => {
        const res = await getAllMeasureDataByOwnerAndDateRange(
          activeProfileId,
          startDate,
          endDate,
        );
        setMeasureData(res);
      })();
    }
  }, [activeProfileId, startDate, endDate]);

  return (
    <MainLayout>
      <div className="px-4">
        <div className="flex items-center gap-2">
          <p>User Name:</p>
          {profiles && (
            <Select onValueChange={setActiveProfileId} value={activeProfileId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {profiles.map((item, index) => (
                    <SelectItem
                      key={`homeScreen-userProfile-navigator-item-${index}`}
                      value={item.id}
                    >
                      {item.username}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <DatePicker onValueChange={setStartDate} />
          -
          <DatePicker onValueChange={setEndDate} />
        </div>

        <div className="mt-4">
          <Select onValueChange={setActiveKey} value={activeKey}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a key" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {keys.map((item, index) => (
                  <SelectItem
                    key={`homeScreen-userProfile-navigator-item-${index}`}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {activeKey === "Body Temperature" && measureData && (
          <div className="mt-8">
            <TemperatureChart data={measureData} />
          </div>
        )}
        {activeKey === "Blood Pressure" && measureData && (
          <div className="mt-8">
            <BloodPressureChart data={measureData} />
          </div>
        )}
        {activeKey === "Surgar Level" && measureData && (
          <div className="mt-8">
            <SugarLevelChart data={measureData} />
          </div>
        )}
        {activeKey === "Weight" && measureData && (
          <div className="mt-8">
            <WeightChart data={measureData} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
