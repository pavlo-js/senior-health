import { useEffect, useState } from "react";
import MainLayout from "@/layout";
import { getProfile, UserProfile } from "@/actions/handleProfile";
import { useNavigate } from "react-router-dom";
import MeasureList from "@/components/MeasureList";
import { getAllMeasureDataByOwnerAndDate } from "@/actions/handleMeasure";
import { MeasureInfo } from "./AddMeasure";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

export default function HomePage() {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState<UserProfile>();
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

  useEffect(() => {
    const profileId = localStorage.getItem("profileId");

    if (profileId) {
      (async () => {
        const profileData = await getProfile(profileId);
        if (profileData) setProfileInfo(profileData);
      })();
    } else {
      navigate("/add-profile");
    }
  }, []);

  useEffect(() => {
    if (profileInfo?.id && date) {
      (async () => {
        const res = await getAllMeasureDataByOwnerAndDate(profileInfo.id, date);
        setMeasureData(res);
      })();
    }
  }, [profileInfo, date]);

  return (
    <>
      {profileInfo ? (
        <MainLayout>
          <div className="px-4">
            <h1 className="text-center text-xl font-semibold">
              Welcome! {profileInfo.username}
            </h1>

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
