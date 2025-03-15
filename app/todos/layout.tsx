'use client'

import AuthComponent from '../MyAuth';

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthComponent>
      {children}
    </AuthComponent>
  );
} 