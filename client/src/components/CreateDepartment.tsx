import React, { useState } from "react";
import { Deps, Dep, NewDepartment } from "../types/types";
import { trpc } from "../trpc";
import { countReset } from "console";
import {z} from "zod"
import moment from "moment";

const schema = z.object({
  created_at: z.date()
});

interface Props {
  onAdd: (arg: NewDepartment) => void;
}

export default function CreateDepartment(props: Props) {
  const getLength = ()=>{
    const count =  trpc.departmentRouter.getCountOfDepartments.useQuery();
    if (count.data)
      return count.data + 1;
    return 8
  }

  const [id, setId] = useState(getLength());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const createdAtDate = moment(createdAt).toDate();
    console.log(createdAtDate);
    const newDepartment = { id, name, description,created_at:createdAtDate};
    console.log(newDepartment);
    props.onAdd(newDepartment);
    console.log("smth");
    // setId(getLength());
    // setName("");
    // setDescription("");
    // setCreatedAt("");
  };
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department name"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Department description"
        />
        <input
          type="date"
          name="date"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
          placeholder="Department foundation date"
        />
        <button type="submit">Add department</button>
      </form>
    </>
  );
}
