import { Empls,NewEmployee } from "../types/types";
interface IProps{
    onAdd : (newEmployee:NewEmployee)=>void
}
export default function CreateEmployee(props:IProps) {
  const handleSubmit = () => {};
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          //value={name}
          onChange={(e) => {}}
          placeholder="Name"
        />
        <input
          type="text"
          name="description"
          //value={description}
          onChange={(e) => {}}
          placeholder="Last name"
        />
        <input
          type="text"
          name="position"
          //value={createdAt}
          onChange={(e) => {}}
          placeholder="Position"
        />
        <input
          type="text"
          name="department"
          //value={createdAt}
          onChange={(e) => {}}
          placeholder="Department"
        />
        <input
          type="text"
          name="salary"
          //value={createdAt}
          onChange={(e) => {}}
          placeholder="Salary"
        />
         <input
          type="text"
          name="isLeader"
          //value={createdAt}
          onChange={(e) => {}}
          placeholder="Is leader"
        />
         <input
          type="text"
          name="date"
          //value={createdAt}
          onChange={(e) => {}}
          placeholder="Date of adding"
        />
         <input
          type="date"
          name="company"
          //value={createdAt}
          onChange={(e) => {}}
          placeholder="Company"
        />
        <button type="submit">Add department</button>
      </form>
    </>
  );
}
