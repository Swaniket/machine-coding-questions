import type { ICheckboxData } from "../data"

interface ICheckboxUI {
  node: ICheckboxData,
  label: string,
  isChecked: boolean
  checkboxHandler: (node: ICheckboxData, checked: boolean) => void
}

export const CheckboxUI = ({ node, label, isChecked, checkboxHandler }: ICheckboxUI) => {
  const handleCheck = (e: any) => {
    const checked = e.target.checked
    checkboxHandler(node, checked)
  }

  return (
    <div style={{ display: "flex" }}>
      <input type='checkbox' id={node.id} name={node.id} checked={isChecked} onChange={handleCheck} />
      <label htmlFor={node.id}>{label}</label>
    </div>
  )

}