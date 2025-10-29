import { Client, Databases, ID, Query } from "react-native-appwrite";

// track the sercarches made by user and store them in appwrite database

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: any) => {
  try {
    // Log the movie object to verify its structure
    console.log('Movie being sent:', movie);
    
    // Normalize the search query
    const normalizedQuery = query.trim();

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerms", normalizedQuery), // Make sure this matches your database field name
    ]);

    if (result.documents.length > 0) {
      const existingDoc = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingDoc.$id,
        {
          searchTerms: normalizedQuery, // Use consistent field name
          count: existingDoc.count + 1
        }
      );
    } else {
      // Create new document with only the fields defined in your schema
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerms: normalizedQuery,
        movie_id: movie.id, // Make sure this matches your Appwrite schema
        title: movie.title,
        count: 1,
        poster_url: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : ''
      });
    }
  } catch (error) {
    console.error("Error updating search count:", {
      error,
      query,
      movieData: {
        id: movie.id,
        title: movie.title
      }
    });
    throw error;
  }
};

// Helper function to check database connection
export const checkDatabaseConnection = async () => {
  try {
    await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(1)]);
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
};
