"use server";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { session } from "@/app/_lib/auth";
import { getBookings } from "./data-service";
import { gu } from "date-fns/locale";
export async function updateGuest(formatData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formatData.get("nationalID");
  const [nationality, countryFlag] = formatData.get("nationality").split("%");
  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
  if (!cnicRegex.test(nationalID)) {
    throw new Error("Enter a valid National ID (e.g., 12345-1234567-1)");
  }
  const guestId = session?.user?.guestId;
  if (!guestId) {
    console.error("Missing guestId in session.user:", session.user);
    throw new Error("Guest ID is missing in session");
  }
  const updateData = { nationality, countryFlag, nationalID };
  console.log("Updating guest:", guestId, updateData);
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
  redirect("/account/profile");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this bookings");
  }
  const guestId = session?.user?.guestId;
  if (!guestId) {
    console.error("Missing guestId in session.user:", session.user);
    throw new Error("Guest ID is missing in session");
  }
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}
