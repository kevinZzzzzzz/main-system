declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}
declare module "remoteMain1/HomePage" {
  import { ComponentType } from "react";
  const HomePageComp: ComponentType<any>;
  export default HomePageComp;
}
