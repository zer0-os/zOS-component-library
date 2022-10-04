import React from 'react';

export interface AppLayoutContext {
  hasContextPanel: boolean;
  isContextPanelOpen: boolean;
  // XXX - do we want to just assume these are set by provider,
  // or wrap the context?
  setHasContextPanel?: (hasContextPanel: boolean) => void;
  setIsContextPanelOpen?: (isContextPanelOpen: boolean) => void;
}

export const Context = React.createContext<AppLayoutContext>({
  hasContextPanel: false,
  isContextPanelOpen: false,
});

export function withContext<T>(Component: any) {
  return (props: T) => (
    <Context.Consumer>
      {context => <Component {...props} context={context} /> }
    </Context.Consumer>
  );
};

export const Provider = Context.Provider;
