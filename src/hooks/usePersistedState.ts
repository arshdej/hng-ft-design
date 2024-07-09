import lf from "localforage";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

const isBrowser = true;

const storeName = "hng-store";
const localDb = "hng-db";

type InitType<S> = () => S;
interface IProps<S> {
  key: string;
  table?: string;
  initState?: InitType<S>;
  initialState: S;
  persist?: boolean;
}

export enum StoreAction {
  RETURN_LOCAL_STATE = "return_local_state",
  NEW_STATE = "new_state",
  UPDATE_STATE = "update_state",
  HYDRATE_STATE = "hydrate_state",
  LOCAL_STORE = "local_store",
}

interface ReducerAction<P> {
  type: StoreAction;
  payload?: P;
}

export type ReducerType<T, S, A> = (state: S, action: A) => T;

interface IPersistedReducer<S> {
  reducer: ReducerType<S, S, ReducerAction<S>>;
  defaultState: S;
  storageKey: string;
  table?: string;
  init?: InitType<S>;
  provider?: "localForage" | "localStorage";
  persist: boolean;
}

type IPReducer<S extends any> = [
  boolean,
  S,
  FnArgs<S, void>,
  FnArgs<S, void>,
  FnArgs<S, void>
];

interface IPersistedState<S> {
  loading: boolean;
  state: S;
  setState: FnArgs<S, void>;
  updateState: FnArgs<S, void>;
}

const storageProvider = {
  pouchDB: { getItem: async () => {}, setItem: async () => {} },
  localStorage: { getItem: async () => {}, setItem: async () => {} },
  localForage: {
    createdDb: (instance: string) => {
      return lf.createInstance({ name: localDb, storeName: instance });
    },
    async getItem(key: string, instance: string = storeName) {
      try {
        const db = await this.createdDb(instance);
        return await db.getItem(key);
      } catch (err) {
        console.log("Failed to fetch from storage ", err);
      }
    },
    async setItem(key: string, value: any, instance: string = storeName) {
      try {
        const db = await this.createdDb(instance);
        await db.setItem(key, value);
      } catch (err) {
        console.log("Failed to add to storage ", err);
      }
    },
  },
};

const reducer = <S, P>(state: S, action: ReducerAction<P>) => {
  switch (action.type) {
    case StoreAction.HYDRATE_STATE: {
      return state;
    }
    default: {
      throw new Error("Invalid storage reducer action type");
    }
  }
};

// CAUTION: save object, not string or arrays are root elements
export default function usePersistedState<S>(
  props: IProps<S>
): IPersistedState<S> {
  const { key, persist = true, initialState, table, initState } = props;

  const [loading, state, setState, updateState, hydrateState] =
    usePersistedReducer({
      reducer,
      defaultState: initialState,
      storageKey: key,
      table,
      init: initState,
      persist,
    });

  return { loading, state, setState, updateState };
}

export function usePersistedReducer<S>(
  props: IPersistedReducer<S>
): IPReducer<S> {
  const {
    reducer,
    defaultState,
    storageKey,
    // table,
    init,
    provider = "localForage",
  } = props;

  const [loading, setLoading] = useState(true);

  const _provider = useMemo(() => storageProvider[provider], [provider]);

  const reducerWrapper = useCallback((status: S, action: ReducerAction<S>) => {
    let newState = status;
    switch (action.type) {
      case StoreAction.RETURN_LOCAL_STATE: {
        return status;
      }
      case StoreAction.NEW_STATE: {
        if (action.payload) {
          newState = action.payload;
        }
        if (isBrowser) {
          _provider.setItem(storageKey, JSON.stringify(newState));
        }
        return newState;
      }
      case StoreAction.UPDATE_STATE: {
        newState = {
          ...status,
          ...action.payload,
        };
        if (isBrowser) {
          _provider.setItem(storageKey, JSON.stringify(newState));
        }
        return newState;
      }
      default:
        newState = reducer(status, action);
    }
    return newState;
  }, []);

  const [state, dispatch] = useReducer(
    reducerWrapper,
    defaultState,
    (defaultState) => {
      const initialFetch = false;
      return !initialFetch ? defaultState : init ? init() : defaultState;
    }
  );

  const setState = useCallback(
    (payload: S) => dispatch({ type: StoreAction.NEW_STATE, payload }),
    [dispatch]
  );
  const updateState = useCallback(
    (payload: S) => dispatch({ type: StoreAction.UPDATE_STATE, payload }),
    [dispatch]
  );
  const hydrateState = useCallback(
    (payload: S) => dispatch({ type: StoreAction.HYDRATE_STATE, payload }),
    [dispatch]
  );

  const get = useCallback(
    (key: string) => {
      Promise.resolve(_provider.getItem(key))
        .then((res: any) => {
          if (res) {
            setState(JSON.parse(res as string));
          }
        })
        .then(() => setLoading(false));
    },
    [_provider]
  );

  useEffect(() => {
    if (loading) {
      get(storageKey);
    }
  }, [loading, storageKey]);

  return [loading, state, setState, updateState, hydrateState];
}
