import { Link } from "react-router";
import { useViewTransitionState } from "react-router";

type LinkWithTransitionProps = {
  to: string;
  transitionName: string;
  children: (styleObj: { viewTransitionName: string }) => React.ReactNode;
};

const LinkWithTransition = ({
  to,
  transitionName,
  children,
}: LinkWithTransitionProps) => {
  const isTransitioning = useViewTransitionState(to);
  const styleObj = {
    viewTransitionName: isTransitioning ? transitionName : "none",
  };

  return (
    <Link to={to} viewTransition>
      {children(styleObj)}
    </Link>
  );
};

export default LinkWithTransition;
