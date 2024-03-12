import { useRef, useCallback } from 'react';

/**
 * Returns a stabilized callback reference which delegates to the most recent unstable callback
 *
 * This is similar to useCallback, but allows unstableCallback to access the most recent values from the closure.
 * This can be useful if the callback is being stored long term, such as in the Transition Hook registry.
 *
 * Example:
 * ```jsx
 * const latestValueFromProps = props.value
 * const transitionHook = useStableCallback(() => console.log(latestValueFromProps));
 * useEffect(() => {
 *   const deregister = transitionService.onBefore({ exiting: 'someState' }, transitionHook);
 *   return () => deregister();
 * }, []);
 * ```
 */
function useStableCallback(unstableCallback) {
    const ref = useRef(unstableCallback);
    ref.current = unstableCallback;
    const callback = useCallback(function () {
        // @ts-ignore
        return ref.current && ref.current.apply(this, arguments);
    }, []);
    return callback;
}

export { useStableCallback };
