import ReservationForm from "@/app/_components/ReservationForm";
import DateSelector from "@/app/_components/DateSelector";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";
export default async function Reservation({ cabinId }) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full max-w-[1600px] mx-auto border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabinId}
      />
      {session?.user ? (
        <ReservationForm cabin={cabinId} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
