import React from "react";
import { ApplicationNavigation } from "../../routes/MainRoutes";
import { useSearchParams } from "react-router";

function CentreComputers() {
  const [searchParams] = useSearchParams();

  const centre = searchParams.get("centre");
  return (
    <div>
      <ApplicationNavigation
        links={[
          { name: "Centres", path: "/centres" },
          { name: "View Centre", path: "/centres/" + centre },
        ]}
        pageTitle={"Registered Computers"}
      />
      hello
    </div>
  );
}

export default CentreComputers;
