import SplashAnimationImage from "@/assets/splash-animation.gif";

export default function SplashScreen() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <img
        src={SplashAnimationImage}
        alt="Senior Health"
        className="h-auto w-[350px]"
      />
    </div>
  );
}
