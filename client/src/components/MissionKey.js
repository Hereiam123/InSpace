import React from "react";

export default function MissionKey() {
  return (
    <div className="my-3">
      <p>
        <span className="px-3 mr-2 bg-success" /> = Successful <br />
        <span className="px-3 mr-2 bg-danger" /> = Failed or Future Launch
      </p>
    </div>
  );
}
