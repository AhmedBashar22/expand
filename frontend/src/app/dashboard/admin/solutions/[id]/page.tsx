import fetchWithError from "@/global/fetchWithError";
import SolutionForm from "../Form";
import endpoints from "@/global/endpoints";
import { cookies, headers } from "next/headers";
import ErrorMessage from "@/components/ErrorMessage";

const EditSolutionPage = async ({
  params
}: {
  params: any
}) => {
  const jwt = cookies().get('jwt')
  const [solution, error] = await fetchWithError(`${endpoints.solutions}/${params.id}`, {
    next: {
      revalidate: 0,
    },
    headers: {
      "Authorization": `Bearer ${jwt?.value}`
    }
  })
  return (
    <main className="flex flex-col gap-4 h-full">
      <p className="text-lg font-bold">Edit plan</p>
      {error && <ErrorMessage message={error.message} />}
      {
        !error && solution &&
        <SolutionForm
        jwt={jwt?.value ?? ''}
        solution={solution}
        />
      }
    </main>
  );
}
 
export default EditSolutionPage;