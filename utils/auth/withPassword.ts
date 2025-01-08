import { Secret } from "apps/website/loaders/secret.ts";
import { AppContext } from "../../mod.ts";

export default function withPassword(props: unknown, ctx: AppContext) {
  if (
    !isObject(props) ||
    !hasActionPassword(props)
  ) {
    throw new Error("Invalid password");
  }

  const { password } = props as { password?: Secret };

  const decripted = password?.get() ?? "";
  console.log(decripted);

  if (decripted !== ctx.actionPassword) {
    throw new Error("Invalid password");
  }
}

function isObject(obj: unknown) {
  return typeof obj === "object" && obj !== null;
}

function hasActionPassword(props: object) {
  return ("password" in props) &&
    typeof props?.password === "object" &&
    props?.password !== null && ("get" in props?.password);
}
