/* eslint-disable react/prop-types */

function FolderTree({ items, depth }) {
  return (
    <div>
      <div style={{ paddingLeft: `${depth * 10}px` }}>{items.name}</div>

      {items.children && (
        <>
          {items.children.map((item) => (
            <FolderTree items={item} key={item.id} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}

export default FolderTree;
