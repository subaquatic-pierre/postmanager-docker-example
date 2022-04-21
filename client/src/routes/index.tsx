import React from "react";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";

import NotFound from "pages/NotFound";
import Home from "pages/Home";

const Routes = (): JSX.Element => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
