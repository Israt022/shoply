import { redirect } from "next/navigation";

export default function MyEventPage() {
  redirect("/dashboard/seller/my-products");
}
