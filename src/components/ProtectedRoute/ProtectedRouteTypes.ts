import { RouteComponentProps, RouteProps } from "react-router";

export default interface ProtectedRouteProps {
  [props: string]: RouteProps | RouteComponentProps;
}
