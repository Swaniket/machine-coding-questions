import { useState } from 'react'
import './App.css'
import { data, type ICheckboxData } from './data'
import { CheckboxListUI } from './components/CheckboxListUI'

function App() {
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const updateChildren = (node: ICheckboxData, checked: boolean, checkedSet: Set<string>) => {
    if (node.children) {
      node.children.forEach((child: ICheckboxData) => {
        if (checked) checkedSet.add(child.id)
        else checkedSet.delete(child.id)

        if (child.children) {
          updateChildren(child, checked, checkedSet)
        }
      })
    }
  }

 const updateParents = (
  nodes: ICheckboxData[],
  checkedSet: Set<string>
) => {
  nodes.forEach((node) => {
    if (!node.children) return

    // First recursively process children
    updateParents(node.children, checkedSet)

    // Check whether ALL direct children are checked
    const allChildrenChecked = node.children.every((child) =>
      checkedSet.has(child.id)
    )

    if (allChildrenChecked) {
      checkedSet.add(node.id)
    } else {
      checkedSet.delete(node.id)
    }
  })
}

  const handleCheckboxChange = (
    node: ICheckboxData,
    checked: boolean
  ) => {
    setCheckedItems((previousCheckedItems) => {
      const checkedSet = new Set(previousCheckedItems)

      // 1. Update clicked node
      if (checked) checkedSet.add(node.id)
      else checkedSet.delete(node.id)

      // 2. Update all descendants
      updateChildren(node, checked, checkedSet)

      updateParents(data, checkedSet)

      return [...checkedSet]
    })
  }

  return (
    <>
      <CheckboxListUI
        data={data}
        depth={0}
        checkedItems={checkedItems}
        checkboxHandler={handleCheckboxChange}
      />
    </>
  )
}

export default App
