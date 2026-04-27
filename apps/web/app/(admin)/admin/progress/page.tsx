import { redirect } from "next/navigation";

export default function AdminProgressRedirectPage() {
  redirect("/admin/companies");
}
