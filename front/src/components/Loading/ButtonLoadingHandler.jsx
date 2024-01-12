import React from "react";

export default function ButtonLoadingHandler({ loading, loadingText, children }) {

  const clonedButton = React.cloneElement(
    children,
    { disabled: true },
    loadingText
  );
  return <>{loading ? clonedButton : children}</>;
}
