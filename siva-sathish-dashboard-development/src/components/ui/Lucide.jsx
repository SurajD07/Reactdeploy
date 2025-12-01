import * as lucideIcons from "lucide-react";
import clsx from "clsx";

const { createReactComponent, ...icons } = lucideIcons;

function Lucide(props) {
  const { icon, className, ...computedProps } = props;
  const Component = icons[icon];
  return (
    <Component {...computedProps} className={clsx(["stroke-1.5", className])} />
  );
}

export default Lucide;
