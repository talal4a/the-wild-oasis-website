"use server";
import { redirect } from "next/dist/server/api-utils";
import { auth } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
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
