import { useEffect, useState } from "react";
import MainLayout from "@/layout";
import { getProfile, UserProfile } from "@/actions/handleProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import MeasureList from "@/components/MeasureList";
import { Calendar } from "@/components/ui/calendar";

export default function HomePage() {
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useState<UserProfile>();

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
                <MeasureList />
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
