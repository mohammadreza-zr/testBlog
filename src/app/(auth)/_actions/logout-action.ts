"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { inValidateRequest, validateRequest } from "../../../lib/lucia-auth";

export const logoutAction = async () => {
  const { session } = await validateRequest();
  if (!session) throw Error("session is not valid");

  try {
    const invalidSession = await inValidateRequest();
    if (invalidSession) redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
};
