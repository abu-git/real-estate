import * as Linking from 'expo-linking'
import { openAuthSessionAsync } from 'expo-web-browser'
import { Account, Avatars, Client, Databases, OAuthProvider, Query } from 'react-native-appwrite'

export const config = {
    platform: 'com.sam.realestate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: 'galleries',
    reviewsCollectionId: 'reviews',
    agentsCollectionId: 'agents',
    propertiesCollectionId: 'properties'
}


export const client = new Client().setEndpoint(config.endpoint!).setProject(config.projectId!)//.setPlatform(config.platform)


export const avatar = new Avatars(client)

export const account = new Account(client)

export const databases = new Databases(client)


export async function login(){
    try{
        const redirectUri = Linking.createURL("/")

        const response = await account.createOAuth2Token({ provider: OAuthProvider.Google, success:redirectUri })
        if (!response) throw new Error("Create OAuth2 token failed")
        
        const browserResult = await openAuthSessionAsync(response.toString(), redirectUri)
        if (browserResult.type !== "success") throw new Error("Create OAuth2 token failed")
        
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString()
        const userId = url.searchParams.get("userId")?.toString()
        if (!secret || !userId) throw new Error("Create OAuth2 token failed")
    
        const session = await account.createSession({userId: userId, secret: secret})
        if (!session) throw new Error("Failed to create session")
        
        return true
    }catch(error){
        console.error(error)
        return false
    }
}

export async function logout(){
    try{
        const result = await account.deleteSession({ sessionId: 'current'})
        return result
    }catch(error){
        console.error(error)
        return false
    }
}

export async function getCurrentUser() {
    try{
        const result = await account.get()
        console.log(result.name)
        if(result.$id){
            let userAvatar = avatar.getInitials({name: result.name})
            console.log('user avatar: ',JSON.stringify(userAvatar, null, 2))
            return { ...result, avatar: userAvatar }
        }
        return null
    }catch(error){
        console.error(error)
        return null
    }
}

export async function getLatestProperties(){
    try {
        const result = await databases.listDocuments({
            databaseId: config.databaseId!,
            collectionId: config.propertiesCollectionId!,
            queries: [Query.orderAsc("$createdAt"), Query.limit(5)]
        })

        return result.documents
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getProperties({ filter, query, limit }: { filter: string; query: string; limit: number }) {
    try {
        const buildQuery = [Query.orderDesc('$createdAt')]

        if(filter && filter !== 'All'){
            buildQuery.push(Query.equal('type', filter))
        }

        if(query){
            buildQuery.push(
                Query.or([Query.search('name', query), Query.search('address', query), Query.search('type', query)])
            )
        }

        if(limit){
            buildQuery.push(Query.limit(limit))
        }

        const result = await databases.listDocuments({
            databaseId: config.databaseId!,
            collectionId: config.propertiesCollectionId!,
            queries: buildQuery
        })

        return result.documents

    } catch (error) {
        console.error(error)
        return []
    }
}