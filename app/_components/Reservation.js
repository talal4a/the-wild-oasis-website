import ReservationForm from "@/app/_components/ReservationForm";
import DateSelector from "@/app/_components/DateSelector";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
export default async function Reservation({ cabinId }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabinId}
      />
      <ReservationForm cabin={cabinId} />
    </div>
  );
}
