"use server";

import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "../../../../lib/lucia-auth";
import { db } from "../../../../server/database";
import { insertUserSchema, InsertUserSchema } from "../_schema/login-schema";

export const loginAction = async (values: InsertUserSchema) => {
  try {
    const { password, username } = insertUserSchema.parse(values);

    if (!username) {
      return {
        status: false,
        error: {
          message: "please provide username",
          type: "INVALID_DATA_ERROR",
          code: 400,
        },
      };
    }

    if (!password) {
      return {
        status: false,
        error: {
          message: "please provide password",
          type: "INVALID_DATA_ERROR",
          code: 400,
        },
      };
    }

    const existingUser = await db.query.usersTable.findFirst({
      where: (column) => eq(column.username, username),
    });

    if (!existingUser) {
      return {
        status: false,
        error: {
          message: "username or password is invalid!",
          type: "INVALID_DATA_ERROR",
          code: 400,
        },
      };
    }

    const validPassword = await verify(existingUser.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        status: false,
        error: {
          message: "username or password is invalid!",
          type: "INVALID_DATA_ERROR",
          code: 400,
        },
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      status: false,
      error: {
        message: "something went wrong.",
        type: "INTERNAL_SERVER_ERROR",
        code: 500,
      },
    };
  }
};
