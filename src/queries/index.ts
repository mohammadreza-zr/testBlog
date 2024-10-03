import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { postsKeys } from "./post";

export const queryKeys = mergeQueryKeys(postsKeys);
