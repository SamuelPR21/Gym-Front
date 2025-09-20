import { AuthProvider } from "./context/authContext";
import RootNavigation from "./src/navigation/rootNavigation";


export default function Index() {
  return (

    <AuthProvider>
      <RootNavigation />
    </AuthProvider>

  );
    
}
