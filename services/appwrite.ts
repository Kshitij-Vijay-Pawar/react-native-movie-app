import { Client, Databases, Query, ID } from "react-native-appwrite";

// track the sercarches made by user and store them in appwrite database

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("serchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        serchTerm: query,
        movieId: movie.id,
        movieTitle: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log("Error updating search count:", error);
    throw error;
  }

  //check if a record of that search has already been stored
  //if a document is found increment the searchCount field by 1
  //if no document is found c
  // create a new document with searchCount field set to 1
};
