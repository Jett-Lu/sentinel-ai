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
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    status
  };
}
