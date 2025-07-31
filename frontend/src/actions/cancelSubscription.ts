"use server"

import endpoints from "@/global/endpoints"
import fetchWithError from "@/global/fetchWithError"

export default async function cancelSubscription(userId: string, jwt: string, subscriptionId: string) {
  const [data, error] = await fetchWithError(
    `${endpoints.subscriptions}/${userId}/cancel`,
    {
      next: {
        revalidate: 0,
      },
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify({ subscriptionId })
    }
  )

  if (!error) {
    return {success: true}
  } else {
    return {success: false, message: error.message}
  }
}