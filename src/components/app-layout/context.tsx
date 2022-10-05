import React from 'react';

export interface AppLayoutContext {
  hasContextPanel: boolean;
  isContextPanelOpen: boolean;
  setHasContextPanel: (hasContextPanel: boolean) => void;
  setIsContextPanelOpen: (isContextPanelOpen: boolean) => void;
}

export const Context = React.createContext<AppLayoutContext>({
  hasContextPanel: false,
  isContextPanelOpen: false,
  setHasContextPanel: (_hasContextPanel: boolean) => undefined,
  setIsContextPanelOpen: (_isContextPanelOpen: boolean) => undefined,
});

export function withContext<T>(Component: any) {
  return (props: T) => (
    <Context.Consumer>
      {context => <Component {...props} context={context} /> }
    </Context.Consumer>
  );
};

export const Provider = Context.Provider;
