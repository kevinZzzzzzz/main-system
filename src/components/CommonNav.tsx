import { mutiClassName } from "@/utils";
import React, { useState, useRef, useEffect, memo } from "react";
import styles from "./index.module.scss";
// import { useNavigate } from "react-router-dom";

import turnDownSvg from "@/assets/images/turnDown.png";
import turnUpSvg from "@/assets/images/turnUp.png";

function CommonNavComp(props: any) {
  // const navigate = useNavigate();
  const navComp = useRef(null);
  const [navList, setNavList] = useState<any>([
    {
      key: 1,
      name: "主系统",
      // url: "http://192.168.120.178:8881",
      url: "http://192.168.120.178:8882",
    },
    {
      key: 2,
      name: "系统2",
      // url: "http://192.168.120.178:8883",
      url: "http://192.168.120.178:8882/sys2/",
    },
    {
      key: 3,
      name: "系统3",
      // url: "http://192.168.120.178:8848",
      url: "http://192.168.120.178:8882/sys3/",
    },
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const jumpUrl = (newUrl) => {
    window.location.href = newUrl;
  };
  const handleNavOpen = (flag) => {
    setIsOpen(!isOpen);
    // if (flag) {
    //   navComp.current.classList.add(styles["navComp-isClosed"]);
    //   console.log(navComp.current.classList, "navComp.current------");
    // } else {
    //   navComp.current.classList.remove(styles["navComp-isClosed"]);
    // }
  };
  return (
    <div
      className={mutiClassName([
        styles.navComp,
        isOpen && styles["navComp-isOpen"],
      ])}
      ref={navComp}
    >
      <div className={styles.navComp_main}>
        <ul className={styles.navComp_main_list}>
          {navList.map((d) => {
            return (
              <li
                key={d.key}
                className={styles.navComp_main_list_item}
                onClick={() => {
                  jumpUrl(d.url);
                }}
              >
                {d.name}
              </li>
            );
          })}
        </ul>
        <div
          className={mutiClassName([
            styles["navComp_main_icon"],
            isOpen && styles["navComp_main_icon-isOpen"],
          ])}
          onClick={() => {
            handleNavOpen(isOpen);
          }}
        >
          {isOpen ? <img src={turnUpSvg} /> : <img src={turnDownSvg} />}
        </div>
      </div>
    </div>
  );
}
export default memo(CommonNavComp);
