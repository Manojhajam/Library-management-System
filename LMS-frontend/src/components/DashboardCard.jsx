import React from "react";
import Card from "./common/Card";

const DashboardCard = ({ title, count, Icon }) => {
  return <div>
      <Card customClass={"!p-3 !px-4"}>
        <div className="flex items-center gap-40">
          <div>
            <p className="text-sm">
              {title}
            </p>
            <h3 className="text-3xl m-0 p-0 font-bold">
              {count}
            </h3>
          </div>
          <div>
            {Icon}
          </div>
        </div>
      </Card>
    </div>;
};

export default DashboardCard;
