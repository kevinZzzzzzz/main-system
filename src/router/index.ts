import { lazy } from "react";

interface RouterInterface {
  key: number;
  name: string;
  path: string;
  component: any;
  children?: any[];
}

const HomePage: RouterInterface = {
  key: 0,
  name: "Home",
  path: "/home",
  component: lazy(
    () => import(/* webpackChunkName: "home" */ "@/pages/Home/index")
  ),
  children: [],
};
const AboutPage: RouterInterface = {
  key: 2,
  name: "About",
  path: "/about",
  component: lazy(
    () => import(/* webpackChunkName: "about" */ "@/pages/About/index")
  ),
  children: [],
};
const NotFoundPage: RouterInterface = {
  key: 1,
  name: "NotFound",
  path: "/404",
  component: lazy(
    () => import(/* webpackChunkName: "404" */ "@/pages/404/index")
  ),
  children: [],
};

const AllRouters: RouterInterface[] = [HomePage, AboutPage, NotFoundPage];

export { AllRouters };
