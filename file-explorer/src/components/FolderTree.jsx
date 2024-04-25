/* eslint-disable react/prop-types */
import { useState } from "react";
import { FcFile, FcFolder, FcOpenedFolder } from "react-icons/fc";
import { BsFolderPlus, BsFileEarmarkPlus } from "react-icons/bs";

function FolderTree({ items, depth }) {
  const [collaspe, setCollaspe] = useState(false);

  return (
    <>
      <div style={{ paddingLeft: `${depth * 20}px` }}>
        {items.children ? (
          <span
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              onClick={() => {
                setCollaspe(!collaspe);
              }}
            >
              {collaspe ? <FcOpenedFolder /> : <FcFolder />} {items.name}
            </span>
            <span style={{ marginLeft: "10px" }}>
              <BsFileEarmarkPlus /> <BsFolderPlus />
            </span>
          </span>
        ) : (
          <>
            <FcFile /> {items.name}
          </>
        )}
      </div>

      {items.children && collaspe && (
        <>
          {items.children.map((item) => (
            <FolderTree items={item} key={item.id} depth={depth + 1} />
          ))}
        </>
      )}
    </>
  );
}

export default FolderTree;
