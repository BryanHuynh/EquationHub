import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { UserContext } from "@/lib/context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import NavBar from "@/components/Navbar/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  const [user] = useAuthState(auth);

  return (
    <UserContext.Provider value={{ user }}>
      <ApolloProvider client={client}>
        <NavBar />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserContext.Provider>
  );
}
