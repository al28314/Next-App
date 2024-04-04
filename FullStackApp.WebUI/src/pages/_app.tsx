import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/lara-dark-blue/theme.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
