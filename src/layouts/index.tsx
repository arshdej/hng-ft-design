import Nav from "@/components/Nav";
import { useRootContext } from "@/context/root";
import { NextPage } from "next";
import { ReactNode, useMemo } from "react";

interface NavAddedProps extends R {
  hide?: boolean;
  screenName?: string;
}

interface AuthAddedProps extends R {
  hide?: boolean;
}

export function NavLayout({
  children,
  mode,
}: {
  children: ReactNode;
  mode?: "lite" | "full";
}) {
  return (
    <>
      <Nav mode={mode || "full"} />
      {children}
    </>
  );
}

export function withNavLayout<P extends NavAddedProps = NavAddedProps, IP = P>(
  Component: NextPage<P, IP>
) {
  const displayName = Component.displayName || Component.name || "Component";

  function EnhancedComponent(props: P) {
    const mode = useMemo(() => {
      if (props.screenName === "cart") {
        return "lite";
      }
      return "full";
    }, [props?.screenName]);

    return (
      <>
        <Nav mode={mode || "full"} />
        <Component {...props} />
      </>
    );
  }

  EnhancedComponent.displayName = `withNav(${displayName})`;

  return EnhancedComponent;
}

export function withRouteProtection<
  P extends AuthAddedProps = AuthAddedProps,
  IP = P
>(Component: NextPage<P, IP>) {
  const displayName = Component.displayName || Component.name || "Component";

  function EnhancedComponent(props: P) {
    const { loginState, isLoadingLogin } = useRootContext();

    if (isLoadingLogin) {
      return <>loading...</>;
    }

    if (!loginState?.isSignedIn) {
      return <>Please log in</>;
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  }

  EnhancedComponent.displayName = `withAuth(${displayName})`;

  return EnhancedComponent;
}
