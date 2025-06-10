import { useEffect, useState } from "react";
import MainLayout from "@/layout";
import {
  getAllProfiles,
  getProfile,
  UserProfile,
} from "@/actions/handleProfile";
import { useNavigate } from "react-router-dom";
import MeasureList from "@/components/MeasureList";
import { getAllMeasureDataByOwnerAndDate } from "@/actions/handleMeasure";
import { MeasureInfo } from "./AddMeasure";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState<UserProfile>();
  const [profiles, setProfiles] = useState<UserProfile[]>();
  const [activeProfileId, setActiveProfileId] = useState<string>();
  const [measureData, setMeasureData] = useState<MeasureInfo[]>();
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );

  const generatePDF = async () => {
    if (measureData && measureData.length > 0) {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(`Measure Data Report: ${profileInfo?.username}`, 14, 20);

      const headers = [
        "Date",
        "Time",
        "Temperature (°C)",
        "BloodPressure (mmHg)",
        "Sugar (mmol/L)",
        "Weight (Kg)",
        "Comment",
      ];

      const rows = measureData.map((item) => [
        item.date ?? "",
        item.time ?? "",
        item.temperature ?? "",
        item.bloodPressSys + "/" + item.bloodPressDia,
        item.sugarLevel ?? "",
        item.weight ?? "",
        item.comment ?? "",
      ]);

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 30,
        styles: { fontSize: 10 },
      });

      doc.save(`measure-data-${date}.pdf`);
    } else {
      alert("No measure Data!");
    }
  };

  const getAllProfilesCall = async () => {
    const res = await getAllProfiles();
    setProfiles(res);
  };

  useEffect(() => {
    getAllProfilesCall();

    const profileId = localStorage.getItem("profileId");

    if (profileId) {
      setActiveProfileId(profileId);
      (async () => {
        const profileData = await getProfile(profileId);
        if (profileData) setProfileInfo(profileData);
      })();
    } else {
      navigate("/add-profile");
    }
  }, []);

  useEffect(() => {
    if (activeProfileId) {
      localStorage.setItem("profileId", activeProfileId);
      (async () => {
        const profileData = await getProfile(activeProfileId);
        if (profileData) setProfileInfo(profileData);
      })();
    } else {
      setProfileInfo(undefined);
    }
  }, [activeProfileId]);

  useEffect(() => {
    if (activeProfileId && date) {
      (async () => {
        const res = await getAllMeasureDataByOwnerAndDate(
          activeProfileId,
          date,
        );
        setMeasureData(res);
      })();
    }
  }, [activeProfileId, date]);

  return (
    <>
      {profileInfo ? (
        <MainLayout>
          <div className="px-4">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-center text-xl font-semibold">Welcome!</h1>
              {profiles && (
                <Select
                  onValueChange={setActiveProfileId}
                  value={activeProfileId}
                >
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

            <div className="mt-4 flex items-center justify-between">
              <DatePicker onValueChange={setDate} />

              <Button className="" onClick={generatePDF}>
                Generate PDF
              </Button>
            </div>

            {measureData && measureData?.length > 0 ? (
              <>
                <MeasureList measureData={measureData} />
              </>
            ) : (
              <div className="mt-12">
                <p className="text-center">
                  No measure data. Please add a new one or change the date.
                </p>
                <Button
                  className="mx-auto mt-6 block"
                  onClick={() => navigate("/add-measure")}
                >
                  Add new Measure Data
                </Button>
              </div>
            )}
          </div>
        </MainLayout>
      ) : (
        <></>
      )}
    </>
  );
}
