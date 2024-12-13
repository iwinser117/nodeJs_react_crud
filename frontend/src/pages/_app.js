// src/pages/_app.js
import { AuthProvider } from "../contexts/authContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
