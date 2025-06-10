import { useEffect, useState } from "react";
import MainLayout from "@/layout";
import { getProfile, UserProfile } from "@/actions/handleProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import MeasureList from "@/components/MeasureList";
import { getAllMeasureDataByOwnerAndDate } from "@/actions/handleMeasure";
import { MeasureInfo } from "./AddMeasure";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/DatePicker";

export default function HomePage() {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState<UserProfile>();
  const [measureData, setMeasureData] = useState<MeasureInfo[]>();
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10),
  );

  const generatePDF = async () => {
    if (measureData) {
      const jsPDF = (await import("jspdf")).default;
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Measure Data Report", 14, 20);

      doc.setFontSize(12);
      let y = 35;
      measureData.forEach((item, idx) => {
        doc.text(
          `${idx + 1}. ${Object.entries(item)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ")}`,
          14,
          y,
        );
        y += 10;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save(`measure-data-${date}.pdf`);
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

            <Tabs defaultValue="measure_data" className="mt-4">
              <div className="relative h-10 overflow-x-scroll rounded-sm bg-muted">
                <TabsList>
                  <TabsTrigger value="measure_data">Measure Data</TabsTrigger>
                  <TabsTrigger value="make_pdf">Export PDF</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="measure_data">
                <DatePicker onValueChange={setDate} />
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
              </TabsContent>
              <TabsContent value="make_pdf">
                {measureData && measureData?.length > 0 && (
                  <>
                    <Button className="mx-auto" onClick={generatePDF}>
                      Generate PDF
                    </Button>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </MainLayout>
      ) : (
        <></>
      )}
    </>
  );
}
