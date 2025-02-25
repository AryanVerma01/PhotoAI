"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FileUpload from "@/components/ui/upload"

export default function CardWithForm() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create your Model</CardTitle>
        <CardDescription>Select desired options for your model</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter Name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Type">Type</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Woman">Woman</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="text" placeholder="Enter Age"></Input>
            </div>
            <div>
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select>
                    <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select Ethnicity" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="AsianAmerican">AsianAmerican</SelectItem>
                    <SelectItem value="EastAsian">EastAsian</SelectItem>
                    <SelectItem value="SouthEastAsian">SouthEastAsian</SelectItem>
                    <SelectItem value="SouthAsian">SouthAsian</SelectItem>
                    <SelectItem value="MiddleEastern">MiddleEastern</SelectItem>
                    <SelectItem value="Pacific">Pacific</SelectItem>
                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
            <Label htmlFor="Eyecolor">Eyecolor</Label>
              <Select>
                <SelectTrigger id="Eyecolor">
                  <SelectValue placeholder="Select Eyecolor" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Hazel">Hazel</SelectItem>
                  <SelectItem value="Gray">Gray</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
            <Label htmlFor="Bald">Bald</Label>
              <Select>
                <SelectTrigger id="Bald">
                  <SelectValue placeholder="Select Yes/no" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
                <FileUpload onUploadDone={function (zipUrl: string): void {
                  throw new Error("Function not implemented.")
                } } />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create Model</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
