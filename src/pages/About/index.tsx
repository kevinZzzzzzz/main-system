import React, { useState, useEffect, memo } from "react";

function AboutPage(props: any) {
  return (
    <>
      <h1>About Page</h1>
      {props.children}
    </>
  );
}
export default memo(AboutPage);
