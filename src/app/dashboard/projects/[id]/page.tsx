import EditStatus from "@/components/dashboard/edit/EditStatus";
import ProjectEdit from "@/components/dashboard/edit/ProjectEdit";
import { BASE_URL, PROJECTS } from "@/server/Api";

const fetchProjects = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}${PROJECTS}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    const project = await response.json();
    return project.data;
  } catch (error) {
    console.error("Error fetching Project:", error);
    throw error;
  }
};

type Params = Promise<{ id: string }>;
type Props = {
  params: Params;
};

const EditProject = async (props: Props) => {
  const params = await props.params;
  const id = params.id;

  const project = await fetchProjects(id);

  return (
    <div
      style={{ minHeight: "calc(100vh - 250px)" }}
      className="flex-1 rounded-lg bg-white px-4 py-6 shadow-sm sm:px-6 mt-[80px]"
    >
      <div className="h-full w-full container mx-auto px-4 md:px-0">
        <div className="mb-4 text-lg font-semibold">تعديل المزاد</div>
        <div className="flex flex-col md:flex-row gap-4">
          <ProjectEdit project={project} />
          <EditStatus project={project} />
        </div>
      </div>
    </div>
  );
};

export default EditProject;
