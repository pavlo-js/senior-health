import { useEffect, useState } from "react";
import MainLayout from "@/layout";
import { getProfile, UserProfile } from "@/actions/handleProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import MeasureList from "@/components/MeasureList";
import { Calendar } from "@/components/ui/calendar";
import { getAllMeasureDataByOwner } from "@/actions/handleMeasure";
import { MeasureInfo } from "./AddMeasure";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState<UserProfile>();
  const [measureData, setMeasureData] = useState<MeasureInfo[]>();

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
    if (profileInfo?.id) {
      (async () => {
        const res = await getAllMeasureDataByOwner(profileInfo.id);
        setMeasureData(res);
      })();
    }
  }, [profileInfo]);

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
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="make_pdf">Export PDF</TabsTrigger>
                  <TabsTrigger value="edit_profile">Edit Profile</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="measure_data">
                {measureData && measureData?.length > 0 ? (
                  <MeasureList measureData={measureData} />
                ) : (
                  <div className="mt-12">
                    <p className="text-center">
                      You have no measure data yet. Please add a new one.
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
              <TabsContent value="calendar">
                <div className="flex justify-center pt-10">
                  <Calendar />
                </div>
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
