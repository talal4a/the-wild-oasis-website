import ReservationForm from "@/app/_components/ReservationForm";
import DateSelector from "@/app/_components/DateSelector";
export default async function Reservation() {
     const [ settings, bookedData] = await Promise.all([
        getCabin(params.cabinId),
        getSettings(),
        getBookedDatesByCabinId(params.cabinId),
      ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
            <DateSelector />
            <ReservationForm />
          </div>
  )
}
