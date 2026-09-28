import type { ICheckboxData } from "../data"
import { CheckboxUI } from "./CheckboxUI"

interface ICheckboxListUI {
    data: ICheckboxData[]
    depth: number
    checkedItems: any[]
    checkboxHandler: (node: ICheckboxData, checked: boolean) => void
}

export const CheckboxListUI = ({ data, depth, checkedItems, checkboxHandler }: ICheckboxListUI) => {
    return (
        <>
            {data.map((checkboxItem: ICheckboxData) => {
                return (
                    <div style={{ marginLeft: depth * 20 }} key={checkboxItem.id}>
                        <CheckboxUI
                            key={checkboxItem.id}
                            node={checkboxItem}
                            label={checkboxItem.label}
                            isChecked={checkedItems.includes(checkboxItem.id)}
                            checkboxHandler={checkboxHandler}
                        />

                        {checkboxItem.children &&
                            <CheckboxListUI
                                data={checkboxItem.children}
                                depth={depth + 1}
                                checkedItems={checkedItems}
                                checkboxHandler={checkboxHandler}
                            />
                        }
                    </div>
                )
            })}
        </>
    )
}