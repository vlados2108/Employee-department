import React, { useState } from "react";
import { Deps, Dep, NewDepartment } from "../types/types";
import { trpc } from "../trpc";

interface Props {
  onAdd: (arg: NewDepartment) => void;
}

export default function CreateDepartment(props: Props) {
  const getLength = () => {
    const count = trpc.departmentRouter.getCountOfDepartments.useQuery().data;
    return count! + 1;
  };

  const [id, setId] = useState(getLength());
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const created_at = new Date(createdAt);
    const newDepartment = { id, name, description,created_at};
    console.log(newDepartment);
    props.onAdd(newDepartment);
    console.log("smth");
    setId(getLength());
    setName("");
    setDescription("");
    setCreatedAt("");
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
