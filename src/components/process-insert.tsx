import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
}
interface ProcessInsertProps {
  addProcess: (process: Process) => void;
}

export const ProcessInsert: React.FC<ProcessInsertProps> = ({ addProcess }) => {
  const [processId, setProcessId] = useState<string>("0");
  const [arrivalTime, setArrivalTime] = useState<number>(0);
  const [burstTime, setBurstTime] = useState<number>(0);

  const handleAddProcess = () => {
    addProcess({
      id: processId,
      arrivalTime: arrivalTime,
      burstTime: burstTime,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>Insert Process</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-6">
          <div className="gap-4">
            <h4 className="font-medium leading-none">
              Insert Process Information
            </h4>
            <p className="text-sm text-muted-foreground">
              Enter the process information below
            </p>
          </div>
        </div>
        <div className="grid gap-2 mt-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="process-id">Process ID</Label>
            <Input
              id="process-id"
              type="number"
              placeholder="Enter Process ID"
              className="col-span-2 h-8"
              value={processId}
              onChange={(e) => setProcessId(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="arrival-time">Arrival Time</Label>
            <Input
              id="arrival-time"
              type="number"
              placeholder="Enter Arrival Time"
              className="col-span-2 h-8"
              value={arrivalTime}
              onChange={(e) => {setArrivalTime(parseInt(e.target.value))}}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="burst-time">Burst Time</Label>
            <Input
              id="burst-time"
              type="number"
              placeholder="Enter Burst Time"
              className="col-span-2 h-8"
              value={burstTime}
              onChange={(e) => setBurstTime(parseInt(e.target.value))}
            />
          </div>
          <Button
            variant={"ghost"}
            onClick={() => {
              handleAddProcess();
            }}
          >
            Add Process
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
