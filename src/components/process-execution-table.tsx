import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

import { ExecutionTable } from "./algorithms/execution-table";

interface ProcessExecutionTableProps {
  ganttChart: { process: string; start: number; end: number }[];
  originalProcesses: { id: string; arrivalTime: number; burstTime: number }[];
}

export const ProcessExecutionTable: React.FC<ProcessExecutionTableProps> = ({
  ganttChart,
  originalProcesses,
}) => {
  const processes = ExecutionTable({ ganttChart, originalProcesses });
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
              <TableCell className="text-center font-medium">
                {process.id}
              </TableCell>
              <TableCell className="text-center font-medium">
                {
                    originalProcesses.find((p) => p.id === process.id)
                        ?.arrivalTime
                }
              </TableCell>
              <TableCell className="text-center font-medium">
                {
                    originalProcesses.find((p) => p.id === process.id)
                        ?.burstTime
                }
              </TableCell>
              <TableCell className="text-center font-medium">
                {process.completionTime}
              </TableCell>
              <TableCell className="text-center font-medium">
                {process.turnaroundTime}
              </TableCell>
              <TableCell className="text-center font-medium">
                {process.waitingTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Average Turnaround Time</TableCell>
            <TableCell className="text-right text-sm">
              {processes.reduce(
                (accumulator, process) => accumulator + process.turnaroundTime,
                0
              ) / processes.length}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}>Average Waiting Time</TableCell>
            <TableCell className="text-right text-sm">
              {processes.reduce(
                (accumulator, process) => accumulator + process.waitingTime,
                0
              ) / processes.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
