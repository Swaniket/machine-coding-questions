import { useState } from 'react'
import './App.css'

interface IData {
  id: string,
  name: string,
  children?: IData[]
}

interface IFolderStructureUI {
  drillDown: IData[],
  depth: number,
  isFolderOpenIds: string[],
  setIsFolderOpenId: (val: string[]) => void,
  setFolderStructData: (val: any) => void
}

const structureData: IData[] = [
  {
    id: "1",
    name: "node_modules",
    children: [
      {
        id: "01",
        name: ".bin",
      },
      {
        id: "02",
        name: "react-router",
        children: [
          {
            id: "001",
            name: "core"
          },
          {
            id: "003",
            name: "node"
          },
          {
            id: "003",
            name: "something"
          },
        ]
      }
    ]
  },
  {
    id: "2",
    name: "package.json"
  },
  {
    id: "3",
    name: "src",
    children: [
      {
        id: "03",
        name: "app.tsx"
      }
    ]
  },
  {
    id: "4",
    name: "lala",
    children: [
      {
        id: "04",
        name: "app.tsx"
      }
    ]
  },

]

const FolderStructureUI = ({ drillDown, depth, isFolderOpenIds, setIsFolderOpenId, setFolderStructData }: IFolderStructureUI) => {
  const [localInputValue, setLocalInputValue] = useState<string>('')
  const [showNameInput, setShowNameInput] = useState<boolean>(false)

  const handleIsFolderOpen = (folderId: string) => {
    if (!isFolderOpenIds.includes(folderId)) {
      setIsFolderOpenId([...isFolderOpenIds, folderId])
    } else {
      const folderIdIndex = isFolderOpenIds.indexOf(folderId)
      const restOpenFolders = isFolderOpenIds.toSpliced(folderIdIndex, 1)
      setIsFolderOpenId(restOpenFolders)
    }
  }

  const handleAddFolder = (currFolderId: string) => {
    const currFolder = drillDown.filter((item) => item?.id === currFolderId)[0]

    if (currFolder.children) {
      currFolder.children.push({
        id: `${currFolderId}-xy-${depth}`,
        name: "New Folder",
        children: []
      })
    }

    const folderStrutWithNewFolder = structureData?.map((item: IData) => {
      if (item.id === currFolderId) {
        return currFolder
      } else return item
    })

    setFolderStructData(folderStrutWithNewFolder)
  }

  const handleAddFile = (currFolderId: string) => {
    const currFolder = drillDown.filter((item) => item?.id === currFolderId)[0]

    if (!currFolder.children) {
      currFolder['children'] = []
    }
    currFolder.children.push({
      id: `${currFolderId}-xy-${depth}`,
      name: "New File",
    })

    const folderStrutWithNewFile = structureData?.map((item: IData) => {
      if (item.id === currFolderId) {
        return currFolder
      } else return item
    })

    setFolderStructData(folderStrutWithNewFile)
  }

  return (
    <>
      {drillDown?.map((item: IData) => {
        if (item.children) {
          return (
            <>
              <div style={{ marginLeft: depth * 20, display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => handleIsFolderOpen(item.id)}>
                  {isFolderOpenIds.includes(item.id) ? "[-]" : "[+]"}
                </button>
                <span>{item.name}</span>
                <button onClick={() => setShowNameInput(true)}>[Add folder]</button>
                <button onClick={() => handleAddFile(item.id)}>[Add file]</button>
              </div>

              {showNameInput
                ? <div>
                  <input value={localInputValue} onChange={(e) => setLocalInputValue(e.target.value)} /> <button onClick={() => handleAddFolder(item.id)}>Add</button>
                </div>
                : null
              }


              {isFolderOpenIds.includes(item.id)
                ? <FolderStructureUI
                  drillDown={item.children}
                  setFolderStructData={setFolderStructData}
                  key={item.id} depth={depth + 1}
                  isFolderOpenIds={isFolderOpenIds}
                  setIsFolderOpenId={setIsFolderOpenId} />
                : null}
            </>
          )
        }
        return (
          <>
            <div style={{ marginLeft: depth * 20 }}>{item.name}</div>
          </>
        )
      })}
    </>
  )
}


function App() {
  const [folderStructData, setFolderStructData] = useState<IData[]>(structureData)

  const depth = 0
  const [isFolderOpenIds, setIsFolderOpenId] = useState<string[]>([])

  return (
    <FolderStructureUI
      drillDown={folderStructData}
      setFolderStructData={setFolderStructData}
      depth={depth}
      isFolderOpenIds={isFolderOpenIds}
      setIsFolderOpenId={setIsFolderOpenId} />
  )
}

export default App
