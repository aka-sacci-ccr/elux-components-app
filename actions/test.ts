import { Secret } from "apps/website/loaders/secret.ts";
import { AppContext } from "../mod.ts";
import withPassword from "../utils/auth/withPassword.ts";

interface Props {
  sexoo: boolean;
  password: Secret;
}

export default function action(props: Props, _req: Request, ctx: AppContext) {
  withPassword(props, ctx);
  return {
    props,
    success: true,
  };
}

