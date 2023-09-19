import FormTasks from "@/components/FormTasks";
import Tasks from "@/components/Tasks";

export default function Home() { 
  return (
    <main>
      <h1>Task Manager</h1>
      <FormTasks />
      <Tasks />
    </main>
  )
}
