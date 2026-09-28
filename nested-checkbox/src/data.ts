export interface ICheckboxData {
    id: string,
    label: string,
    children?: ICheckboxData[]
}

export const data: ICheckboxData[] = [
    {
        id: "1",
        label: "Checkbox 1",
        children: [
            {
                id: "11",
                label: "Checkbox 1 Child 1",
            },
            {
                id: "12",
                label: "Checkbox 1 Child 2",
                children: [
                    {
                        id: "121",
                        label: "Checkbox 1 Child 2 Child 1",
                    },
                    {
                        id: "123",
                        label: "Checkbox 1 Child 2 Child 2",
                    },
                    {
                        id: "124",
                        label: "Checkbox 1 Child 2 Child 3",
                    },
                ]
            },
            {
                id: "13",
                label: "Checkbox 1 Child 3",
            },
        ]
    },
    {
        id: "2",
        label: "Checkbox 2",
    },
    {
        id: "3",
        label: "Checkbox 3",
        children: [
            {
                id: "31",
                label: "Checkbox 3 Child",
            }
        ]
    },
]