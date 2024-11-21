import allIcons from "../utils/icons.ts";
import { AvailableIcons } from "../components/ui/Icon.tsx";

import { allowCorsFor, type FnContext } from "@deco/deco";
const icons = Array.from(
  new Map<string, string>(
    allIcons.map((icon) => {
      const match = icon.match(/id="([^"]*)"/);
      const id = match ? match[1] : "";
      return [id, icon];
    }),
  ).entries(),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([iconName, icon]) => ({
    component: icon,
    label: iconName as AvailableIcons,
  }));
// Used to load all available icons that will be used for IconSelect widgets.
export default function IconsLoader(
  _props: unknown,
  req: Request,
  ctx: FnContext,
) {
  // Allow Cors
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });
  // Mapping icons to { value, label, icon }
  const iconsMap = icons.map((icon) => ({
    icon: icon.component,
    label: icon.label,
    value: icon.label,
  }));
  return iconsMap;
}
