
'use client'
import { Authenticator } from "@aws-amplify/ui-react";

const AuthComponent = ({ children }: { children: React.ReactNode }) => (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
            {children}
        </main>
      )}
    </Authenticator>
);
export default AuthComponent;