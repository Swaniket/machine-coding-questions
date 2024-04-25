import { useState } from "react";
import { explorerData } from "./data/explorerData";
import "./App.css";
import FolderTree from "./components/FolderTree";

function App() {
  const [explorer, setExplorer] = useState(explorerData);

  return (
    <>
      <div>{explorer.name}</div>
      {explorerData.children.map((item) => (
        <FolderTree items={item} key={item.id} depth={1} />
      ))}
    </>
  );
}

export default App;
