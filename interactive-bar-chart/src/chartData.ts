export interface IChartData {
    id: string,
    name: string,
    ticketCount: number,
    color: string
}

export const CHART_DATA: IChartData[] = [
    {
        id: "dep-1",
        name: "Legal",
        ticketCount: 32,
        color: "#3F888F" 
    },
    {
        id: "dep-2",
        name: "Sales",
        ticketCount: 20,
        color: "#FFA420" 
    },
    {
        id: "dep-3",
        name: "Engineering",
        ticketCount: 60,
        color: "#FF5420" 
    },
    {
        id: "dep-4",
        name: "Manufacturing",
        ticketCount: 5,
        color: "#3F888F" 
    },
    {
        id: "dep-5",
        name: "Maintenance",
        ticketCount: 14,
        color: "#648D8F" 
    },
    {
        id: "dep-6",
        name: "Human Resource",
        ticketCount: 35,
        color: "#1D1E33" 
    },
    {
        id: "dep-7",
        name: "Events",
        ticketCount: 43,
        color: "#E1CC4F" 
    },
]