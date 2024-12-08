import { goto } from "$app/navigation";
import type { Database } from "$lib/types/database.types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStateProps {
    session: Session | null;
    supabase: SupabaseClient | null;
    user: User | null;
}

export interface Book {
    author: string | null
    cover_image: string | null
    created_at: string
    description: string | null
    finished_reading_on: string | null
    genre: string | null
    id: number
    rating: number | null
    started_reading_on: string | null
    title: string
    user_id: string
}

export class UserState {
    session = $state<Session | null>(null);
    supabase = $state<SupabaseClient<Database> | null>(null);
    user = $state<User | null>(null);
    allBooks = $state<Book[]>([]);
    userName = $state<string | null>(null);

    constructor({ session, supabase, user }: UserStateProps) {
        this.updateState({ session, supabase, user });
    }

    async updateState({ session, supabase, user }: UserStateProps) {
        this.session = session;
        this.supabase = supabase;
        this.user = user;
        this.fetchUserData();
    }

    async fetchUserData() {
        if (!this.user || !this.supabase) return;

        const userId = this.user.id;

        const [booksResponse, userNamesResponse] = await Promise.all([
            this.supabase.from("books").select("*").eq("user_id", userId),
            this.supabase.from("user_names").select("name").eq("user_id", userId).single()
        ]);


        if (booksResponse.error || !booksResponse.data
            || userNamesResponse.error || !userNamesResponse.data) {
            console.error('Error fetching user data');
            return;
        }

        this.allBooks = booksResponse.data;
        this.userName = userNamesResponse.data.name;
    }

    getHighestRatedBooks() {
        return this.allBooks.filter((book) => book.rating)
            .toSorted((a, z) => z.rating! - a.rating!)
            .slice(0, 9);
    }

    getUnreadBooks() {
        return this.allBooks.filter((book) => !book.started_reading_on)
            .toSorted((a, z) => new Date(z.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 9);
    }

    getFavoriteGenre() {
        if (!this.allBooks.length) return null;

        const genreCounts: { [key: string]: number } = {};
        this.allBooks.forEach((book) => {
            const genres = book.genre?.split(",") || [];
            genres.forEach((genre) => {
                const trimmedGenre = genre.trim();
                if(!genreCounts[trimmedGenre]) 
                    genreCounts[trimmedGenre] = 1;
                else
                    genreCounts[trimmedGenre]++;
            });
        });
   
        const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
            genreCounts[a] > genreCounts[b] ? a : b);

        return mostCommonGenre || null
    }

    async logout() {
        await this.supabase?.auth.signOut();
        goto("/login");
    }
}

const USER_STATE_KEY = Symbol("USER_STATE");

export function setUserState(data: UserStateProps) {
    return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
    return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}