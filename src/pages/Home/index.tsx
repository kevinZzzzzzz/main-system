import { Button, Modal } from "antd";
import React, { useState, useEffect, memo, useMemo } from "react";
const HomePageComp = React.lazy(() => import("remoteMain1/HomePage"));

function HomePage(props: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const Comp = memo((props: any) => {
    return <HomePageComp>{props.children}</HomePageComp>;
  });
  const openSys2HomePage = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <h1>主系统</h1>
      <Button
        color="pink"
        variant="solid"
        onClick={() => {
          openSys2HomePage();
        }}
      >
        打开系统2的home页面
      </Button>

      <Modal
        title="系统2的home页面"
        open={isModalOpen}
        cancelText={null}
        okText={null}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Comp>
          <h4>hello world</h4>
        </Comp>
      </Modal>
    </>
  );
}
export default memo(HomePage);
