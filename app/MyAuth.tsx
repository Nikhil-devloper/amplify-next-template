'use client'
import { Authenticator } from "@aws-amplify/ui-react";

const AuthComponent = ({ children }: { children: React.ReactNode }) => (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="authenticated-container">
            {children}
        </div>
      )}
    </Authenticator>
);
export default AuthComponent;