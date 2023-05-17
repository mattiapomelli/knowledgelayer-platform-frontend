import { atom, useSetAtom } from "jotai";

export const createProfileModalAtom = atom(false);

export const useCreateProfileModal = () => {
  const setShowModal = useSetAtom(createProfileModalAtom);
  return () => setShowModal(true);
};
