import { useContext } from "react";
import { LoginCardContext } from "../context/LoginCardContext";

export default function useLoginCard() {
  const context = useContext(LoginCardContext);

  if (!context) {
    throw new Error("useLoginCard must be used inside LoginCardProvider");
  }

  return context;
}