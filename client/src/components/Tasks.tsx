import { Task } from "@/types/taskTypes"
import useTasks from "@/hooks/useTasks"

const Tasks = () => {
  const { data, isLoading, error, refetch } = useTasks()
  
  
  return (
      <div className="flex flex-wrap h-28 bg-blue-700 rounded-xl items-center justify-center">
        {!isLoading && data.map((item: Task) => (
          <div key={item._id}>

            <div>
              <h1>{item.title}</h1>
            </div>

            <div>
              <p>{item.description}</p>
            </div>

            <div>
              <p>{item.status}</p>
            </div>

            <div>
              <button
                className="bg-[#0ea5e9] p-2 rounded"
                type="button"
              >
                Editar
              </button>
              <button 
                className="bg-[#f43f5e] p-2 rounded"
                type="button"
              >
                Deletar
              </button>
            </div>

          </div>
        ))}
      </div>
    )
}

export default Tasks