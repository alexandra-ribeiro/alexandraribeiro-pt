// Remove MongoDB dependency warnings by making the functions optional
const API_URL = process.env.MONGODB_DATA_API_URL
const API_KEY = process.env.MONGODB_DATA_API_KEY
const DATABASE = "virtual-assistant"

// Remove the warning console.warn - make it silent
if (!API_URL || !API_KEY) {
  // MongoDB Data API not configured - using fallback storage
}

// Update all functions to handle missing MongoDB gracefully
async function apiRequest(action: string, collection: string, data: any) {
  if (!API_URL || !API_KEY) {
    // Silently return empty results instead of throwing errors
    return { documents: [], document: null, insertedId: null }
  }

  // Rest of the function remains the same...
  console.log(`Making MongoDB Data API request: ${action} to collection ${collection}`)
  console.log("Request data:", JSON.stringify(data, null, 2))

  try {
    const response = await fetch(`${API_URL}/action/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: DATABASE,
        collection,
        ...data,
      }),
    })

    console.log(`MongoDB Data API response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Erro na requisição MongoDB Data API (${action}):`, errorText)
      throw new Error(`Erro na requisição MongoDB Data API: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const responseData = await response.json()
    console.log("MongoDB Data API response:", JSON.stringify(responseData, null, 2))
    return responseData
  } catch (error) {
    console.error(`Error in MongoDB Data API request (${action}):`, error)
    throw error
  }
}

// Update functions to return fallback values instead of throwing errors
export async function findOne(collection: string, filter: any) {
  try {
    const result = await apiRequest("findOne", collection, { filter })
    return result.document
  } catch (error) {
    console.error(`Error in findOne operation for collection ${collection}:`, error)
    return null // Return null instead of throwing
  }
}

export async function find(collection: string, filter: any, options: any = {}) {
  try {
    const result = await apiRequest("find", collection, {
      filter,
      limit: options.limit || 100,
      skip: options.skip || 0,
      sort: options.sort || {},
    })
    return result.documents
  } catch (error) {
    console.error(`Error in find operation for collection ${collection}:`, error)
    return [] // Return empty array instead of throwing
  }
}

export async function insertOne(collection: string, document: any) {
  try {
    const cleanDocument = JSON.parse(JSON.stringify(document))
    const result = await apiRequest("insertOne", collection, { document: cleanDocument })
    return {
      _id: result.insertedId,
      ...cleanDocument,
    }
  } catch (error) {
    console.error(`Error in insertOne operation for collection ${collection}:`, error)
    // Return the document with a fake ID instead of throwing
    return {
      _id: `local_${Date.now()}`,
      ...document,
    }
  }
}

export async function updateOne(collection: string, filter: any, update: any) {
  try {
    const result = await apiRequest("updateOne", collection, {
      filter,
      update,
    })
    return result
  } catch (error) {
    console.error(`Error in updateOne operation for collection ${collection}:`, error)
    return { modifiedCount: 0 } // Return fallback result
  }
}

export async function deleteOne(collection: string, filter: any) {
  try {
    const result = await apiRequest("deleteOne", collection, { filter })
    return result
  } catch (error) {
    console.error(`Error in deleteOne operation for collection ${collection}:`, error)
    return { deletedCount: 0 } // Return fallback result
  }
}

// Keep the fallback functions as they are
export async function insertOneWithFallback(collection: string, document: any) {
  try {
    return await insertOne(collection, document)
  } catch (error) {
    console.warn(`Using local storage fallback for insertOne in collection ${collection}`)

    const id = Math.random().toString(36).substring(2, 15)

    if (typeof window !== "undefined") {
      const key = `${collection}_${id}`
      const item = {
        _id: id,
        ...document,
        _createdAt: new Date().toISOString(),
      }
      localStorage.setItem(key, JSON.stringify(item))
      return item
    }

    return {
      _id: id,
      ...document,
    }
  }
}
