import { useState } from "react";
import { explorerData } from "./data/explorerData";
import "./App.css";
import FolderTree from "./components/FolderTree";

import { BsFolderPlus, BsFileEarmarkPlus } from "react-icons/bs";

function App() {
  const [explorer, setExplorer] = useState(explorerData);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {explorer.name}
        <span style={{ marginLeft: "10px" }}>
          <BsFileEarmarkPlus /> <BsFolderPlus />
        </span>
      </div>
      {explorerData.children.map((item) => (
        <FolderTree items={item} key={item.id} depth={1} />
      ))}
    </>
  );
}

export default App;
