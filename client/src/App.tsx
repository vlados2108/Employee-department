import * as React from "react";
import { Deps, Empls } from "./types/types";
import { trpc } from "./trpc";
import Menu from "./components/Menu";
import { Department, Employee } from "../../server/node_modules/.prisma/client";

const App = () => {

  return (
    <>
      <Menu/>
    </>
  );
};

export default App;
