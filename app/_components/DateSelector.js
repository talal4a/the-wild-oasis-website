"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const { regularPrice, discount } = cabin;

  // Ensure bookedDates are Date objects
  const parsedBookedDates = bookedDates.map((d) => new Date(d));

  // Calculate nights and total price
  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const totalPrice = numNights > 0 ? numNights * (regularPrice - discount) : 0;

  // Format price (e.g., $120.00)
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={range}
        onSelect={(range) => setRange(range)}
        numberOfMonths={2}
        captionLayout="dropdown"
        disabled={(date) =>
          isPast(date) || parsedBookedDates.some((d) => isSameDay(d, date))
        }
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        classNames={{
          months: "flex flex-row gap-10",
          day_range_start: "bg-yellow-400 text-black",
          day_range_middle: "bg-yellow-300 text-black",
          day_range_end: "bg-yellow-400 text-black",
          day_selected: "bg-yellow-400 text-black",
          today: "border border-yellow-500",
          nav_button_previous: "text-yellow-400 hover:bg-yellow-100",
          nav_button_next: "text-yellow-400 hover:bg-yellow-100",
        }}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">
                  {formatPrice(regularPrice - discount)}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  {formatPrice(regularPrice)}
                </span>
              </>
            ) : (
              <span className="text-2xl">{formatPrice(regularPrice)}</span>
            )}
            <span className="">/night</span>
          </p>

          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">
                  {formatPrice(totalPrice)}
                </span>
              </p>
            </>
          )}
        </div>

        {(range.from || range.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;
