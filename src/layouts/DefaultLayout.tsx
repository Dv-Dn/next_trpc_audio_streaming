import React, { CSSProperties, useState } from "react";
import { Player } from "@/components/Player/Player";
import { Sidebar } from "@/components/Sidebar";

import { useLoader } from "@/store/loading";
import { Loading } from "@/components/base";
import { CSSTransition } from "react-transition-group";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const loading = useLoader((state) => state.loading);

  return (
    <div className="default-layout relative grid h-screen max-w-full">
      <Sidebar />

      <main className="layout_content relative flex-grow overflow-y-auto overflow-x-hidden scroll-smooth p-10">
        {children}
      </main>

      <Player />

      <CSSTransition
        in={loading}
        classNames="fade"
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        <Loading />
      </CSSTransition>
    </div>
  );
};
