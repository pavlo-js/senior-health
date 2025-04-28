import { getProfile, UserProfile } from "@/actions/handleProfile";
import MainLayout from "@/layout";
import { useEffect, useState } from "react";
import AddProfilePage from "./AddProfile";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileIcon, FilePlusIcon } from "lucide-react";

export default function StartPoint() {
  const [profileInfo, setProfileInfo] = useState<UserProfile>();

  useEffect(() => {
    const profileId = localStorage.getItem("profileId");

    if (profileId) {
      (async () => {
        const profileData = await getProfile(profileId);
        if (profileData) setProfileInfo(profileData);
      })();
    }
  }, []);

  return (
    <>
      {profileInfo ? (
        <MainLayout>
          <div className="flex h-full items-center justify-center">
            <div>
              <Button
                className="my-8 flex h-[55px] w-[250px] text-lg"
                variant="outline"
                size="lg"
              >
                <FilePlusIcon className="text-lg" /> Add Measurement
              </Button>
              <Button
                className="my-8 flex h-[55px] w-[250px] text-lg"
                variant="outline"
                size="lg"
              >
                <CalendarIcon className="text-lg" /> Calendar
              </Button>
              <Button
                className="my-8 flex h-[55px] w-[250px] text-lg"
                variant="outline"
                size="lg"
              >
                <FileIcon />
                Generate PDF
              </Button>
            </div>
          </div>
        </MainLayout>
      ) : (
        <AddProfilePage />
      )}
    </>
  );
}
