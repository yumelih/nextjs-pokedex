import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Anton } from "next/font/google";
import { Container } from "react-bootstrap";
import Head from "next/head";

// This font requires weight too.
const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS PokeDex</title>
        <meta name="description" content="NextJS PokeDex app by yumelih" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="img/png" href="/favicon.png" />
      </Head>

      <div className={anton.className}>
        <main>
          <Container className="py-4">
            <Component {...pageProps} />
          </Container>
        </main>
      </div>
    </>
  );
}
