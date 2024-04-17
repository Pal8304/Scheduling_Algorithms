import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { ExecutionTable } from "./algorithms/execution-table";

interface ProcessExecutionTableProps {
    ganttChart: { process: string, start: number, end: number }[];
}

export const ProcessExecutionTable : React.FC<ProcessExecutionTableProps> = ({ganttChart}) => {
    const processes = ExecutionTable({ganttChart});
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Process ID</TableHead>
                        <TableHead>Arrival Time</TableHead>
                        <TableHead>Burst Time</TableHead>
                        <TableHead>Completion Time</TableHead>
                        <TableHead>Turnaround Time</TableHead>
                        <TableHead>Waiting Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {processes.map((process) => (
                        <TableRow key={process.id}>
                            <TableCell className="text-center font-medium">{process.id}</TableCell>
                            <TableCell className="text-center font-medium">{process.arrivalTime}</TableCell>
                            <TableCell className="text-center font-medium">{process.burstTime}</TableCell>
                            <TableCell className="text-center font-medium">{process.completionTime}</TableCell>
                            <TableCell className="text-center font-medium">{process.turnaroundTime}</TableCell>
                            <TableCell className="text-center font-medium">{process.waitingTime}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
