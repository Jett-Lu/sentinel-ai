/**
 * Simple hook for loading API health state.
 */
import { useEffect, useState } from "react";
import { ApiClient } from "../services/apiClient";

const apiClient = new ApiClient("/api");

export function useHealth() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    let timeoutId: number | undefined;

    const load = () => {
      apiClient
        .getHealth()
        .then((response) => {
          if (active) {
            setStatus(response.status);
          }
        })
        .catch(() => {
          if (active) {
            setStatus("unavailable");
          }
        })
        .finally(() => {
          if (active) {
            timeoutId = window.setTimeout(load, 5000);
          }
        });
    };

    load();

    return () => {
      active = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return {
    status
  };
}
